import {Router} from 'express'
import User from '../models/users.js'
import {
  checkUserByIdValidation,
  createUserValidation,
  updateUserValidation,
} from '../validation/user.js'
import {sanitizeDataRequest} from '../utils/sanitizeDataRequestUtil.js'

const router = Router()

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = [
      await User.find().populate([
        'address.country_id',
        'address.city_id',
        'address.street_id',
      ]),
    ]
    if (!users) return res.status(404).json({message: 'No users found'})
    return res.status(200).json({users: users})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

// Get user by id
router.get('/:id', async (req, res) => {
  req.params.id = sanitizeDataRequest(req.params.id)
  const {error} = checkUserByIdValidation.validate(req.params)
  if (error) return res.status(400).json({message: error.details[0].message})

  try {
    const user = await User.findById(req.params.id).populate([
      'address.country_id',
      'address.city_id',
      'address.street_id',
    ])
    if (!user) return res.status(404).json({message: 'No users found'})

    return res.status(200).json({user: user})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

// Update user by id
router.put('/update/:id', async (req, res) => {
  req.params.id = sanitizeDataRequest(req.params.id)
  req.body = sanitizeDataRequest(req.body)

  const {error: errorParams} = checkUserByIdValidation.validate(req.params)
  if (errorParams)
    return res.status(400).json({message: errorParams.details[0].message})

  const {error: errorBody} = updateUserValidation.validate(req.body)
  if (errorBody)
    return res.status(400).json({message: errorBody.details[0].message})

  try {
    const email = await User.findOne({email: req.body.email})
    if (email) return res.status(409).json({message: 'Email already in use'})

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!user) return res.status(404).json({message: 'No users found'})
    return res.status(200).json({message: 'User has been updated'})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

// Delete user by id
router.delete('/delete/:id', async (req, res) => {
  req.params.id = sanitizeDataRequest(req.params.id)
  const {error} = checkUserByIdValidation.validate(req.params)
  if (error) return res.status(400).json({message: error.details[0].message})
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user)
      return res.status(404).json({message: 'User not found in the database'})
    return res.status(200).json({message: 'User deleted', isDeleted: true})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

// Create new user
router.post('/create', async (req, res) => {
  req.body = sanitizeDataRequest(req.body)
  const {error} = createUserValidation.validate(req.body)
  if (error) return res.status(400).json({message: error.details[0].message})
  try {
    const email = await User.findOne({email: req.body.email})
    if (email) return res.status(409).json({message: 'Email already in use'})
    const user = await User.create(req.body)
    return res.status(201).json({message: 'User created', user: user})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

export default router
