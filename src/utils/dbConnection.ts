import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
    console.log('Connected to MongoDB Successfully')
  } catch (error) {
    console.error(`Could not connect to MongoDB with error:\n${error}`)
  }
}
