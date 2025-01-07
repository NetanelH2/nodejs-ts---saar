import mongoose from 'mongoose'

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  country_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
  },
})

const City = mongoose.model('City', citySchema)

export default City
