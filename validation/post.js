import Joi from 'joi'

export const createPostValidation = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(300).required(),
})

export const updatePostValidation = Joi.object({
  title: Joi.string().min(3).max(30).optional(),
  description: Joi.string().min(3).max(300).optional(),
})

export const checkPostTitleValidation = Joi.object({
  title: Joi.string().min(3).max(30).required(),
})

export const checkPostByIdValidation = Joi.object({
  id: Joi.string().length(24).required(),
})
