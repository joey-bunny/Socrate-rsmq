import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import { hermes } from 'App/util/functions'

const privateKey = fs.readFileSync('./jwtRS256.key')
const publicKey = fs.readFileSync('./jwtRS256.key.pub')

export default class AuthController {
  public async login({ request, response}: HttpContextContract) {
    // Request required data
    const verifyUserRoute = process.env.USER_VERIFICATION
    const { email, password } = request.body()
    const payload = {email, password}

    // Validate input
    if(!email || email === null) return response.send({message: 'Email required'})
    if(!password || password === null) return response.send({message: 'Password required'})

    try {
      // Send request to user service to confirm user data
      const call = await hermes('post', verifyUserRoute, payload)

      const user = call.data.data

      // Create and sign token
      const token = jwt.sign(user, privateKey, { algorithm: 'RS256'});

      // Return response
      return response.status(call.status).send({
        statusCode: 200,
        message: 'Login succesful',
        data: token,
      })

    } catch (err) {
      // Return error response
      return response.status(err.response.data.statusCode).send({
        statusCode: err.response.data.statusCode,
        message: err.response.data.message,
      })
    }
  }

  public async decodeToken ({ request, response }: HttpContextContract) {
    try {
      // Request required data
      const { token } = request.body()

      // Decode token
      const decode = jwt.verify(token, publicKey)

      // Return error response if token is invalid
      if(!decode) return response.status(401).send({
        statusCode: 401,
        send: 'Invalid token'
      })

      return decode
    } catch (err) {
      console.log(err.message)
      return err
    }
  }
}
