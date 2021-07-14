/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
Route.get('/', async ({ response}: HttpContextContract) => {
  return response.status(200).send({message: 'Welcome'})
})

Route.get('/courses', async ({ response}: HttpContextContract) => {
  return response.status(200).send({message: 'Welcome'})
})//.middleware('auth')

Route.group(() => {
  Route.post('/', 'UsersController.create')// CREATE USER ROUTE
  Route.get('/:id', 'UsersController.findUser').middleware('auth')// FIND A USER ROUTE
  Route.delete('/:id', 'UsersController.destroy').middleware('auth')// FIND A USER ROUTE
}).prefix('users')

Route.group(() => {
  Route.post('/login', 'AuthController.login')// CREATE USER ROUTE
}).prefix('auth')

Route.group(() => {
  Route.post('/', 'CoursesController.create')// CREATE A COURSE ROUTE
  Route.get('/:id', 'CoursesController.findCourse')// FIND A COURSE ROUTE
  Route.put('/:id', 'CoursesController.update')// FIND A COURSE ROUTE
  Route.delete('/:id', 'CoursesController.destroy')// DELETE A COURSE ROUTE
}).prefix('courses').middleware('auth')