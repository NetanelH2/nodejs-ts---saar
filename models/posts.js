import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 200,
    },
  },
  {timestamps: true},
)

const Post = mongoose.model('Post', postSchema)

export default Post
