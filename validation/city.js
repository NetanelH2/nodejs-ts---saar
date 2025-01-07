import Joi from 'joi'

export const createCityValidation = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  country_id: Joi.string().length(24).required(),
})
