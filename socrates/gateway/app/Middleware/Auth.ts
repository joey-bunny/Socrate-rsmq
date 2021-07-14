import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { hermes } from 'App/util/functions'

const decodeJwtRoute = process.env.DECODE_JWT_ROUTE

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
      const call = await hermes('post', decodeJwtRoute, { token })

      const user = call.data// User data

      // Return unautorized mesage if no user object is found
      if ( !user ) return response.status(401).send({
        statusCode: 401,
        message: 'Unauthorized'
      })

      // Return unautorized mesage if no id or email or iat number is found in the user object
      if ( !user.id || !user.email || !user.iat ) return response.status(401).send({
        statusCode: 401,
        message: 'Unauthorized'
      })

      // Set the user in the request object
      request.user = user
    
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
