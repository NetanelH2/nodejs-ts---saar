import {Router} from 'express'
import Country from '../models/country'
import {createCountryValidation} from '../validation/country'
import {sanitizeDataRequest} from '../utils/sanitizeDataRequestUtil'

const router = Router()

// Get all countries
router.get('/', async (req, res) => {
  try {
    const country = await Country.find()
    if (!country) return res.status(404).json({message: 'No country found'})
    return res.status(200).json({country: country})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

// Create new county
router.post('/create', async (req, res) => {
  req.body = sanitizeDataRequest(req.body)
  const {error} = createCountryValidation.validate(req.body)
  if (error) return res.status(400).json({message: error.details[0].message})

  try {
    const countryName = await Country.findOne({country: req.body.name})
    if (countryName)
      return res.status(409).json({message: 'Country already exist'})
    const country = await Country.create({
      name: req.body.name,
    })
    return res.status(201).json({message: 'Country Created', country: country})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

export default router
