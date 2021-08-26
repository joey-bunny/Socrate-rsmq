import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rpcRequest } from 'rabbitmq-micro-service-framework'


export default class Auth {
  public async handle ({ request, response }: HttpContextContract, next: () => Promise<void>) {
    // Request required data
    const token = request.headers().authorization?.replace('Bearer ', '')

    try {
      // Return response if no token is found
      if ( !token || token === null ) return response.status(401).send({
        statusCode: 401,
        message: 'Unauthorized'
      })

      // Make request to auth service to decode token
      // SEND REQUEST TO QUEUE
      const call: any = await rpcRequest('AUTH_SERVICE', 'decodeToken', token)

      // Return unautorized mesage if no user object is found
      if ( !call.data ) return response.status(401).send({
        statusCode: 401,
        message: 'Unauthorized'
      })

      // Set the user in the request object
      request.user = call.data
    
      // Pass to controller
      await next()

    } catch (err) {
      console.log(err.response.data.message)
      return response.status(401).send({
        statusCode: 401,
        message: err.response.data.message
      })
    }
  }
}
