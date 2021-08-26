import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rpcRequest } from 'rabbitmq-micro-service-framework'


export default class AuthController {
  public async login ({request, response}: HttpContextContract) {
    // Request required data
    const { email, password } = request.body()
    const payload = {email: email.toLowerCase(), password}

    try {
      // SEND REQUEST TO QUEUE
      const call: any = await rpcRequest('AUTH_SERVICE', 'login', payload)

      // RETURN RESPONSE
      return response.status(call.statusCode).send(call)
    } catch (err) {
      // Return error response
      return response.status(err?.response?.data?.statusCode || 502 ).send({
        statusCode: err?.response?.data?.statusCode || 502,
        message: err?.response?.data?.message || "Bad gateway",
      })
    }
  }
}
