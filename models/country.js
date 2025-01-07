import mongoose from 'mongoose'

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
})

const Country = mongoose.model('Country', countrySchema)

export default Country
