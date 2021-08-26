import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import validateData from 'App/utils/validator'
export default class UsersController {

  /*
  ** CREATE USER
  */
  public async createUser(payload) {
    try {
      // Validate input data
      const validate = await validateData(payload)

      // Store user data
      const createUser = await User.create(validate)

      // Return error reponse if user creation failed
      if(!createUser) return {
        "statusCode": 400,
        "message": "Unable to create user"
      }

      // Strip response of any sensitive data
      const data = createUser.serialize()

      // Return response
      return {
        statusCode: 201,
        message: 'User created',
        data: data
      }

    } catch (err) {
      // Return error response
      return {
        statusCode: 400,
        message: err.messages
      }
    }
  }

  /*
  ** FIND A USER
  */
  public async findUser(payload) {
    // Request required data
    const userId = payload

    try {
      // Find user in database
      const findUser = await User.findBy('id', userId)

      // Return error reponse if user is not found
      if(!findUser) return {
        statusCode: 400,
        message: 'User not found'
      }

      // Strip response of any sensitive data
      const data = findUser.serialize()

      // Return response
      return {
        statusCode: 200,
        message: 'User found',
        data: data
      }
    } catch (err) {
      // Return error response
      return err
    }
  }

  /*
  ** VERIFY A USER
  */
  public async verifyUser(payload) {
    // Request required data
    const { email, password } = payload
    const pass = password

    try {
      // Find user in database
      const findUser = await User.findBy('email', email)

      // Return error reponse if user is not found
      if(!findUser) return {statusCode: 400,message: 'Invalid credentials'}

      // Verify password
      const passwordMatch = await Hash.verify(findUser.password, pass)

      // Return error if password does not match
      if(!passwordMatch || passwordMatch != true)  return {
        statusCode: 400,
        message: 'Invalid credentials'
      }

      const data = findUser.serialize()

      // Return response
      return {
        statusCode: 200,
        message: 'User found and verified',
        data: data
      }
    } catch (err) {
      // Return error response
      return {
        statusCode: 500,
        message: "Internal server Error",
      }
    }
  }

  /*
  ** DELETE A USER
  */
  public async destroy(payload) {
    // Request required data
    const id = payload

    try {
      // Find user in database
      const findUser = await User.findBy('id', id)

      // Return error reponse if user is not found
      if(!findUser) return {
        statusCode: 400,
        message: 'User not found'
      }

      const userRole = findUser.userRole

      if (userRole != 'admin') return {
        statusCode: 403,
        message: 'Only admins are authorized to delete user'
      }

      // Delete user
      await findUser.delete()

      // Return response
      return {
        statusCode: 200,
        message: 'User deleted'
      }

    } catch (err) {
      // Return error response
      return {
        statusCode: 500,
        message: "Internal server Error",
      }
    }
  }
}
