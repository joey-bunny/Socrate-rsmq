import UsersController from "App/Controllers/Http/UsersController";

const usersController = new UsersController
let user

export async function USER_REGISTER (payload) {
  user = await usersController.createUser(payload)
  return user
}

export async function FIND_USER (payload) {
  user = await usersController.findUser(payload)
  return user
}

export async function VERIFY_USER (payload) {
  user = await usersController.verifyUser(payload)
  return user
}

export async function DELETE_USER (payload) {
  user = await usersController.destroy(payload)
  return user
}