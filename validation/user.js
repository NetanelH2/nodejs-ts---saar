import Joi from 'joi'

const createValidationSchema = ({isRequired = true}) => {
  const validationType = isRequired ? 'required' : 'optional'

  const schema = Joi.object({
    firstName: Joi.string().min(2).max(20)[validationType](),
    lastName: Joi.string().min(2).max(20)[validationType](),
    email: Joi.string().email()[validationType](),
    age: Joi.number().min(0).max(120)[validationType](),

    address: Joi.object({
      country_id: Joi.string().length(24)[validationType](),
      city_id: Joi.string().length(24)[validationType](),
      street_id: Joi.string().length(24)[validationType](),
    })[validationType](),

    techStack: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().min(1).max(20)[validationType](),
          experience: Joi.number().min(0).max(60)[validationType](),
        }),
      )
      [validationType](),
  })

  return schema
}

export const createUserValidation = createValidationSchema({isRequired: true})
export const updateUserValidation = createValidationSchema({isRequired: false})
export const checkUserByIdValidation = Joi.object({
  id: Joi.string().length(24).required(),
})
