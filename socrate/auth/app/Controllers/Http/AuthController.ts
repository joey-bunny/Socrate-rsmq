import jwt from 'jsonwebtoken'
import { rpcRequest } from 'rabbitmq-micro-service-framework'

const privateKey = process.env.PRIVATE_KEY

export default class AuthController {
  public async login(payload) {
    // Request required data
    const { email, password } = payload

    // Validate input
    if(!email || email === null) return {message: 'Email required'}
    if(!password || password === null) return {message: 'Password required'}

    try {
      // SEND REQUEST TO QUEUE
      const call: any = await rpcRequest('USER_SERVICE', 'verifyUser', payload)

      if (!call.data || call.statusCode == 400) return call
      // RETURN RESPONSE
      const user = call.data

      // Create and sign token
      const token = jwt.sign(user, privateKey, {
        expiresIn: '1d'
      });

      // Return response
      return {
        statusCode: 200,
        message: 'Login succesful',
        data: token,
      }

    } catch (err) {
      // Return error response
      return {
        statusCode: err.response.data.statusCode,
        message: err.response.data.message,
      }
    }
  }

  public async decodeToken (payload) {
    try {
      // Request required data
      const token = payload

      // Decode token
      const decode = jwt.verify(token, privateKey)

      // Return error response if token is invalid
      if(!decode) return {
        statusCode: 401,
        send: 'Invalid token'
      }

      return {
        statusCode: 400,
        message: 'Token decoded successfully',
        data: decode
      }
    } catch (err) {
      console.log(err.message)
      return err
    }
  }
}
