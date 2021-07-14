import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { hermes } from 'App/util/functions'

const userServiceRoute = process.env.USER_SERVICE_BASE_URL
export default class UsersController {
  /*
  **CREATE USER ROUTE
  */
  public async create({request, response}: HttpContextContract) {
    const { name, email, password, isLecturer } = request.body()
    const payload = {
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password,
      isLecturer
    }

    try {
      // Send api request to user service to create user
      const call = await  hermes('post', userServiceRoute, payload)

      return response.status(call.status).send(call.data)

    } catch(err) {
      console.log(err.errno, err.code )
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
    const getUserRoute = `${userServiceRoute}/${id}`

    try {
      // Send api request to user service to find user using id
      const call = await  hermes('get', getUserRoute)

      return response.status(call.status).send(call.data)
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
  public async destroy({ request, response }: HttpContextContract) {
    const user = request.user
    const userId = user['id']
    const getUserRoute = `${userServiceRoute}/${userId}`

    try {
      // Send api request to user service to find user using id
      const call = await  hermes('delete', getUserRoute)

      // Return response
      return response.status(call.status).send(call.data)
    } catch(err) {
      // Return error response
      return response.status(err?.response?.data?.statusCode || 502 ).send({
        statusCode: err?.response?.data?.statusCode || 502,
        message: err?.response?.data?.message || "Bad gateway",
      })
    }
  }
}
