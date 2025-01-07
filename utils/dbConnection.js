import mongoose from 'mongoose'

export const connectToDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://netanelh2-user:YfbcS6Vkc3ZtunUM@cluster0.wpyxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    )
    console.log('Connected to MongoDB Successfully')
  } catch (error) {
    console.error(`Could not connect to MongoDB with error:\n${error}`)
  }
}
