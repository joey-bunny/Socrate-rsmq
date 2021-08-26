import AuthController from "App/Controllers/Http/AuthController"

const authController = new AuthController

export function LOGIN (payload) {
  return authController.login(payload)
}

export function DECODE_TOKEN (payload) {
  return authController.decodeToken(payload)
}