import {Router} from 'express'
import City from '../models/city.js'
import {createCityValidation} from '../validation/city.js'

const router = Router()

// Get all cities
router.get('/', async (req, res) => {
  try {
    const city = await City.find()
    if (!city) return res.status(404).json({message: 'No city found'})
    return res.status(200).json({city: city})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

// Create new city
router.post('/create', async (req, res) => {
  req.body = sanitizeDataRequest(req.body)
  const {error} = createCityValidation.validate(req.body)
  if (error) return res.status(400).json({message: error.details[0].message})

  try {
    const cityName = await City.findOne({city: req.body.name})
    if (cityName) return res.status(409).json({message: 'City already exist'})
    const city = await City.create({
      name: req.body.name,
      country_id: req.body.country_id,
    })
    return res.status(201).json({message: 'City Created', city: city})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

export default router
