import Joi from 'joi'

export const createStreetValidation = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  city_id: Joi.string().length(24).required(),
})
