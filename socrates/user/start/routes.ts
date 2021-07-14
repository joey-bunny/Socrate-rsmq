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

Route.group(() => {
  Route.post('/', 'UsersController.create')// CREATE USER ROUTE
  Route.get('/:id', 'UsersController.findUser')// FIND A USER ROUTE
  Route.post('/verifyuser', 'UsersController.verifyUser')// FIND A USER ROUTE
  Route.delete('/:id', 'UsersController.destroy')// DELETE A USER ROUTE
})
