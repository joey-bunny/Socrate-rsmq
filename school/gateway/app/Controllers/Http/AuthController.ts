import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { hermes } from 'App/util/functions'

const authLoginRoute = process.env.lOGIN_ROUTE

export default class AuthController {
  public async login ({request, response}: HttpContextContract) {
    // Request required data
    const { email, password } = request.body()
    const payload = {email: email.toLowerCase(), password}

    try {
      // Make request to auth service to login user
      const call = await hermes('post', authLoginRoute, payload)

      return response.status(call.status).send(call.data)

    } catch (err) {
      // Return error response
      return response.status(err.response.data.statusCode).send({
        statusCode: err.response.data.statusCode,
        message: err.response.data.message,
      })
    }
  }
}
