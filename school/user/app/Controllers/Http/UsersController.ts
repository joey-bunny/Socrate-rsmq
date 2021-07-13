import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
  /*
  ** CREATE USER
  */
  public async create({request, response}: HttpContextContract) {
    try {
      // Validate input data
      const validateData = await request.validate(RegisterValidator)
      
      // Store user data
      const createUser = await User.create(validateData)

      // Return error reponse if user creation failed
      if(!createUser) return response.status(400).send({
        statusCode: 400,
        message: 'Unable to create user'
      })

      // Strip response of any sensitive data
      const data = createUser.serialize()

      // Return response
      return response.status(200).send({
        statusCode: 200,
        message: 'User created',
        data: data
      })

    } catch (err) {
      // Return error response
      return response.status(400).send({
        statusCode: 400,
        message: err.messages
      })
    }
  }

  /*
  ** FIND A USER
  */
  public async findUser({response, params }: HttpContextContract) {
    // Request required data
    const userId = params.id

    try {
      // Find user in database
      const findUser = await User.findBy('id', userId)

      // Return error reponse if user is not found
      if(!findUser) return response.status(400).send({
        statusCode: 400,
        message: 'User not found'
      })

      // Strip response of any sensitive data
      const data = findUser.serialize()

      // Return response
      return response.status(200).send({
        statusCode: 200,
        message: 'User found',
        data: data
      })
    } catch (err) {
      // Return error response
      return err
    }
  }

  /*
  ** VERIFY A USER
  */
  public async verifyUser({response, request }: HttpContextContract) {
    // Request required data
    const { email, password } = request.body()
    const pass = password

    try {
      // Find user in database
      const findUser = await User.findBy('email', email)

      // Return error reponse if user is not found
      if(!findUser) return response.status(400).send({statusCode: 400,message: 'Invalid credentials'})

      // Verify password
      const passwordMatch = await Hash.verify(findUser.password, pass)

      // Return error if password does not match
      if(!passwordMatch || passwordMatch != true)  return response.status(400).send({
        statusCode: 400,
        message: 'Invalid credentials'
      })

      const data = findUser.serialize()

      
      // Return response
      return response.status(200).send({
        statusCode: 200,
        message: 'User found and verified',
        data: data
      })
    } catch (err) {
      // Return error response
      return response.status(500).send({
        statusCode: 500,
        message: "Internal server Error",
      });
    }
  }

  /*
  ** DELETE A USER
  */
  public async destroy({response, params }: HttpContextContract) {
    // Request required data
    const userId = params.id

    try {
      // Find user in database
      const findUser = await User.findBy('id', userId)

      console.log(1, userId)
      // Return error reponse if user is not found
      if(!findUser) return response.status(400).send({
        statusCode: 400,
        message: 'User not found'
      })

      if (findUser.id != userId) return response.status(403).send({
        statusCode: 403,
        message: 'Unauthorized to delete this user'
      })

      // Delete user
      await findUser.delete()

      // Return response
      return response.status(200).send({data: 'User deleted'})

    } catch (err) {
      // Return error response
      return response.status(500).send({
        statusCode: 500,
        message: "Internal server Error",
      });
    }
  }
}
