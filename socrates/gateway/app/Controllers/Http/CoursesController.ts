import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { hermes, lower } from 'App/util/functions'

const courseServiceRoute = process.env.COURSE_SERVICE_ROUTE

export default class CoursesController {
  /*
  **CREATE COURSE ROUTE
  */
  public async create({request, response}: HttpContextContract) {
    const  { name, description } = request.body()
    const user = request.user
    const userRole = user['user_role']
    const userId = user['id']
    const payload = lower({name, description, userId})
    console.log('admin',userRole)

    if (userRole == 'student') return response.status(403).send({
      statusCode: 403,
      message: 'Only admins and lecturers are authorized to create course'
    })

    try {
      // Send api request to user service to create user
      const call = await hermes('post', courseServiceRoute, payload)

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

  /*
  **FETCH A COURSE ROUTE
  */
  public async findCourse({ response, params }: HttpContextContract) {
    // Requet required data
    const id = params.id
    const getCourseRoute = `${courseServiceRoute}/${id}`

    try {
      // Send api request to user service to find user using id
      const call = await hermes('get', getCourseRoute)

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

  /*
  **UPDATE A COURSE ROUTE
  */
  public async update({request, response, params}: HttpContextContract) {
    // Return required data
    const user = request.user
    const userId = user['id']
    const userRole = user['user_role']
    const id = params.id
    const { newName, newDescription } = request.body()
    const payload = lower({newName, newDescription, userId, userRole})
    const getCourseRoute = `${courseServiceRoute}/${id}`

    if (userRole == 'student') return response.status(403).send({
      statusCode: 403,
      message: 'Only admins and lecturers are authorized to edit course'
    })

    try {
      // Send api request to user service to find user using id
      const call = await  hermes('put', getCourseRoute, payload)

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

  /*
  **DELETE A COURSE ROUTE
  */
  public async destroy({request, response, params}: HttpContextContract) {
    // Request required data
    const id = params.id
    const user = request.user
    const userId = user['id']
    const userRole = user['user_role']
    const getCourseRoute = `${courseServiceRoute}/${id}`
    const payload = { userId, userRole }
    
    if (userRole == 'student') return response.status(403).send({
      statusCode: 403,
      message: 'Only admins and lecturers are authorized to delete course'
    })

    try {
      // Send api request to user service to find user using id
      const call = await hermes('delete', getCourseRoute, payload)

      // Return response
      return response.status(call.status).send(call.data)

    } catch(err) {
      // Return error response
      return response.status(err.response.data.statusCode).send({
        statusCode: err.response.data.statusCode,
        message: err.response.data.message,
      })
    }
  }
}
