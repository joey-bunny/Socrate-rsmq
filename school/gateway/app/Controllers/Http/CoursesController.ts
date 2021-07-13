import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { hermes, lower } from 'App/util/functions'

const courseServiceRoute = process.env.COURSE_SERVICE_ROUTE

export default class CoursesController {
  /*
  **CREATE COURSE ROUTE
  */
  public async create({request, response}: HttpContextContract) {
    const  { name, description } = request.body()
    const user = request.user
    const userRole = user['isLecturer']
    const userId = user['id']
    const payload = lower({name, description, userId})

    if (userRole !== 1) return response.status(403).send({
      statusCode: 403,
      message: 'Account type is unauthorized to create course'
    })

    try {
      // Send api request to user service to create user
      const call = await hermes('post', courseServiceRoute, payload)

      // Return response
      return response.status(call.status).send(call.data)

    } catch(err) {
      // Return error response
      return response.status(err.response.data.statusCode).send({
        statusCode: err.response.data.statusCode,
        message: err.response.data.message
      })
    }
  }

  /*
  **FIND A COURSE ROUTE
  */
  public async findCourse({ response, params }: HttpContextContract) {
    // Requet required data
    const name = params.name
    const getCourseRoute = `${courseServiceRoute}/${name}`

    try {
      // Send api request to user service to find user using id
      const call = await hermes('get', getCourseRoute)

      // Return response
      return response.status(call.status).send(call.data)

    } catch(err) {
      // Return error response
      return response.status(err.response.data.statusCode).send({
        statusCode: err.response.data.statusCode,
        message: err.response.data.message
      })
    }
  }

  /*
  **UPDATE A COURSE ROUTE
  */
  public async update({request, response, params}: HttpContextContract) {
    // Return required data
    const name = params.name
    const payload = lower(request.body())
    const getCourseRoute = `${courseServiceRoute}/${name}`

    try {
      // Send api request to user service to find user using id
      const call = await  hermes('put', getCourseRoute, payload)

      // Return response
      return response.status(call.status).send(call.data)

    } catch(err) {
      // Return error response
      return response.status(err.response.data.statusCode).send({
        statusCode: err.response.data.statusCode,
        message: err.response.data.message,
      })
    }
  }

  /*
  **DELETE A COURSE ROUTE
  */
  public async destroy({request, response, params}: HttpContextContract) {
    // Request required data
    const name = params.name
    const user = request.user
    const userId = user['id']
    const getCourseRoute = `${courseServiceRoute}/${name}`

    try {
      // Send api request to user service to find user using id
      const call = await hermes('delete', getCourseRoute, { userId })

      // Return response
      return response.status(call.status).send(call.data)

    } catch(err) {
      // Return error response
      return response.status(err.response.data.statusCode).send({
        statusCode: err.response.data.statusCode,
        message: err.response.data.message,
      })
    }
  }
}
