import {Router} from 'express'
import Street from '../models/street.js'
import {sanitizeDataRequest} from '../utils/sanitizeDataRequestUtil.js'
import {createStreetValidation} from '../validation/street.js'

const router = Router()

// Get all streets
router.get('/', async (req, res) => {
  try {
    const street = await Street.find()
    if (!street) return res.status(404).json({message: 'No street found'})
    return res.status(200).json({street: street})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

// Create new street
router.post('/create', async (req, res) => {
  req.body = sanitizeDataRequest(req.body)
  const {error} = createStreetValidation.validate(req.body)
  if (error) return res.status(400).json({message: error.details[0].message})

  try {
    const streetName = await Street.findOne({street: req.body.name})
    if (streetName)
      return res.status(409).json({message: 'Street already exist'})
    const street = await Street.create({
      name: req.body.name,
      city_id: req.body.city_id,
    })
    return res.status(201).json({message: 'Street Created', street: street})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

export default router
