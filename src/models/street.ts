import mongoose from 'mongoose'

const streetSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
  },
})

const Street = mongoose.model('Street', streetSchema)

export default Street
