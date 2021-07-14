import test from 'japa'
import supertest from 'supertest'
import { generateCourse, generateName } from './utils/functions'

const BASE_URL = `${process.env.BASE_URL}`
const baseUserRoute = process.env.BASE_USERS_URL
const baseAuthRoute = process.env.BASE_AUTH_URL
const baseCourseRoute = process.env.BASE_COURES_URL

let token
let email
let password
let courseName
let courseDescription

test.group('Welcome', () => {
  test('ensure home page works', async (assert) => {
    /**
     * Make request
     */
    const text = await supertest(BASE_URL).get('/').expect(200)

    assert.exists(text)
    assert.equal(text.body.message, 'Welcome')
  })

  test('ensure register user works', async (assert) => {
    /**
     * Make request
     */
    const payload = generateName()
    email = payload.email
    password = payload.password
    const text = await supertest(baseUserRoute).post('/').send(payload).expect(201)

    assert.exists(text)
    assert.equal(text.body.message, 'User created')
  })

  test('Ensure user login works', async (assert) => {
    /**
     * Make request
     */
    const text = await supertest(baseAuthRoute).post('/login').send({
      email,
      password,
  }).expect(200)

    assert.exists(text)
    token = text.body.data
    assert.equal(text.body.message, 'Login succesful')
    assert.exists(text.body.data)
  })

  test('Ensure find user works', async (assert) => {
    /**
     * Make request
     */
    const text = await supertest(baseUserRoute).get('/1').set('authorization', `Bearer ${token}`).expect(200)

    assert.exists(text)
    assert.equal(text.body.message, 'User found')
    assert.exists(text.body.data)
  })

  test('Ensure create course works', async (assert) => {
    /**
     * Make request
     */
    const payload = generateCourse();
    const text = await supertest(baseCourseRoute).post('/').set('authorization', `Bearer ${token}`).send(payload).expect(201)

    courseName = text.body.data.name
    courseDescription = text.body.data.description
    

    assert.exists(text)
    assert.equal(text.body.message, 'Course created')
    assert.exists(text.body.data)
  })

  test('Ensure find course works', async (assert) => {
    /**
     * Make request
     */
    const text = await supertest(baseCourseRoute).get(`/${courseName}`).set('authorization', `Bearer ${token}`).expect(200)

    assert.exists(text)
    assert.equal(text.body.message, 'Course found')
    assert.exists(text.body.data)
  })

  test('Ensure update course works', async (assert) => {
    /**
     * Make request
     */
    const text = await supertest(baseCourseRoute).put(`/${courseName}`).send({
      'newDescription': courseDescription
    }).set('authorization', `Bearer ${token}`).expect(200)

    assert.exists(text)
    assert.equal(text.body.message, 'Description updated')
    assert.exists(text.body.data)
  })

  test('Ensure course delete works', async (assert) => {
    /**
     * Make request
     */
    const text = await supertest(baseCourseRoute).delete(`/${courseName}`).set('authorization', `Bearer ${token}`).expect(200)

    assert.exists(text)
    assert.equal(text.body.message, 'Course deleted')
  })

  test('Ensure user delete works', async (assert) => {
    /**
     * Make request
     */
    const text = await supertest(baseUserRoute).delete(`/`).set('authorization', `Bearer ${token}`).expect(200)

    assert.exists(text)
    assert.equal(text.body.message, 'User deleted')
  })
})
