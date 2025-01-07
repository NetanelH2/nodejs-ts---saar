import mongoose from 'mongoose'

const techStackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 20,
    },
    experience: {
      type: Number,
      required: true,
      minlength: 1,
      maxlength: 2,
    },
  },
  {_id: false},
)

const addressSchema = new mongoose.Schema(
  {
    country_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
    },
    city_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
    },
    street_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Street',
    },
  },
  {_id: false},
)

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
      minlength: 2,
      maxlength: 30,
    },
    address: addressSchema,
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 120,
    },
    techStack: [techStackSchema],
  },
  {timestamps: true},
)

const User = mongoose.model('User', userSchema)

export default User
