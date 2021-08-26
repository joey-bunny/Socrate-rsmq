import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rpcRequest } from 'rabbitmq-micro-service-framework'

export default class UsersController {
  /*
  **CREATE USER ROUTE
  */
  public async create({request, response}: HttpContextContract) {
    request.setTimeout = setTimeout(()=> {}, 5000)
    
    const { name, email, password, userRole } = request.body()
    const payload = {
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password,
      userRole
    }

    try {
      // SEND REQUEST TO QUEUE
      const call: any = await rpcRequest('USER_SERVICE', 'register', payload)

      // RETURN RESPONSE
      return response.status(call.statusCode).send(call)
    } catch(err) {
      // Return error response
      return response.status(err?.response?.data?.statusCode || 502 ).send({
        statusCode: err?.response?.data?.statusCode || 502,
        message: err?.response?.data?.message || "Bad gateway",
      })
    }
  }

  /*
  **FIND A USER ROUTE
  */
  public async findUser({ response, params}: HttpContextContract) {
    const id = params.id

    try {
      // SEND REQUEST TO QUEUE
      const call: any = await rpcRequest('USER_SERVICE', 'findUser', id)

      // RETURN RESPONSE
      return response.status(call.statusCode).send(call)
    } catch(err) {
      // Return error response
      return response.status(err?.response?.data?.statusCode || 502 ).send({
        statusCode: err?.response?.data?.statusCode || 502,
        message: err?.response?.data?.message || "Bad gateway",
      })
    }
  }

  /*
  **DELETE A USER ROUTE
  */
  public async destroy({ response, params }: HttpContextContract) {
    const id = params.id

    try {
      // SEND REQUEST TO QUEUE
      const call: any = await rpcRequest('USER_SERVICE', 'deleteUser', id)

      // RETURN RESPONSE
      return response.status(call.statusCode).send(call)
    } catch(err) {
      // Return error response
      return response.status(err?.response?.data?.statusCode || 502 ).send({
        statusCode: err?.response?.data?.statusCode || 502,
        message: err?.response?.data?.message || "Bad gateway",
      })
    }
  }
}
