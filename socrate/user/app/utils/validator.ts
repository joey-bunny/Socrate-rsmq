import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'

export default async function registerValidator(payload) {
  const validateData = await validator.validate({
    schema: schema.create({
      name: schema.string({ trim: true}),
		  email: schema.string({ trim: true }, [
			rules.email(),
			rules.unique({ table: 'users', column: 'email'}),
		]),
		password: schema.string({ trim: true }),
		userRole: schema.enum(['admin', 'lecturer', 'student'])
    }),
    data: payload
  })

  return validateData
}