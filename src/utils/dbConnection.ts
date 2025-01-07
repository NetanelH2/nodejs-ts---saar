import mongoose from 'mongoose'
import {config} from '../config/env'

export const connectToDB = async () => {
  try {
    await mongoose.connect(config.mongoUri)
    console.log('Connected to MongoDB Successfully')
  } catch (error) {
    console.error(`Could not connect to MongoDB with error:\n${error}`)
  }
}
