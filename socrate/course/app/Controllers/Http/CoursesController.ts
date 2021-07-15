import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Course from "App/Models/Course";
import CourseValidator from "App/Validators/CourseValidator";

export default class CoursesController {
  /*
   ** CREATE COURSE
   */
  public async create({ request, response }: HttpContextContract) {
    try {
          // Request required data
    const validateData = await request.validate(CourseValidator);

      // Store user data
      const createCourse = await Course.create(validateData);

      // Return error reponse if user creation failed
      if (!createCourse) return response.status(400).send({
          statusCode: 400,
          message: "Unable to create course"
        });

      // Return response if course is created
      return response.status(201).send({
        statusCode: 201,
        message: 'Course created',
        data: createCourse
      });

    } catch (err) {
      // Return error response
      return response.status(400).send({
        statusCode: 400,
        message: err.messages
      })
    }
  }

  /*
   ** FIND A COURSE
   */
  public async findCourse({ response, params }: HttpContextContract) {
    // Request required data
    const id = params.id

    try {
      // Find user in database
      const findCourse = await Course.findBy("id", id);

      // Return error reponse if user is not found
      if (!findCourse) return response.status(400).send({
        statusCode: 400,
        message: "Course not found"
      });

      // Return response if course is found
      return response.status(200).send({
        statusCode: 200,
        message: 'Course found',
        data: findCourse
      });
    } catch (err) {
      // Return error response
      return response.status(500).send({
        statusCode: 500,
        message: "Internal server Error",
      });
    }
  }

  /*
   ** UPDATE A COURSE
   */
  public async update({ request, response, params }: HttpContextContract) {
    // Request required data
    const id = params.id
    const { userId, newName, newDescription, userRole } = request.body();

    try {
      // Find user in database
      const findCourse = await Course.findBy("id", id);

      // Return error reponse if user is not found
      if (!findCourse) return response.status(400).send({
        statusCode: 400,
        message: "Course not found"
      });

      // Return error reponse if user is not the course creator
      if (findCourse.userId != userId && userRole != 'admin')
        return response.status(403).send({
          statusCode: 403,
          message: "Only the course creator and admin are allowed to update course"
        });

      // Validate input
      if (!newName && !newDescription)
        return response.status(400).send({
          statusCode: 400,
          message: "Input new name(newName) or description(newDescription) or both"
        });

      // Update description
      if (!newName && newDescription) {
          findCourse.description = newDescription;

          const savedCourse = await findCourse.save();

          // Return response
          return response.status(200).send({
            statusCode: 200,
            message: "Description updated",
            data: savedCourse
          });
      }

      // Update name
      if (newName && !newDescription) {
          findCourse.name = newName;

          const savedCourse = await findCourse.save();

          // Return response
          return response.status(200).send({
            statusCode: 200,
            message: "Course name updated",
            data: savedCourse
          });
      }

      // Update name and description
      if (newName && newDescription) {
          findCourse.name = newName;
          findCourse.description = newDescription;

          const savedCourse = await findCourse.save();

          // Return response
          return response.status(200).send({
            statusCode: 200,
            message: "Course name and description updated",
            data: savedCourse
          });
      }
    } catch (err) {
      // Return error response
      return response.status(500).send({
        statusCode: 500,
        message: "Internal server Error",
      });
    }
  }

  /*
   ** DELETE A COURSE
   */
  public async destroy({ request, response, params }: HttpContextContract) {
    // Request required data
    const id = params.id
    const { userId, userRole } = request.body();

    try {
      // Find user in database
      const findCourse = await Course.findBy("id", id);

      // Return error reponse if user is not found
      if (!findCourse) return response.status(400).send({ 
        statusCode: 400,
        message  : "Course not found"
      });

      // Return error reponse if user is not the course creator
      if (findCourse.userId !== userId && userRole != 'admin')
        return response.status(403).send({
          statusCode: 403,
          message: "Only coure creator and admin are allowed to delete course"
        });

      await findCourse.delete();

      // Return response
      return response.status(200).send({
        statusCode: 200,
        message: "Course deleted",
      });
    } catch (err) {
      // Return error response
      return response.status(500).send({
        statusCode: 500,
        message: "Internal server Error",
      });
    }
  }
}
