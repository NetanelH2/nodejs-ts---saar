import Joi from 'joi'

export const createCountryValidation = Joi.object({
  name: Joi.string().min(2).max(40).required(),
})
