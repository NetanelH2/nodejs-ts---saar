import {Router} from 'express'
import {
  checkPostByIdValidation,
  checkPostTitleValidation,
  createPostValidation,
  updatePostValidation,
} from '../validation/post'
import Post from '../models/posts'
import {sanitizeDataRequest} from '../utils/sanitizeDataRequestUtil'

const router = Router()

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
    if (!posts)
      return res.status(404).json({
        message: 'No posts found',
      })
    return res.status(200).json({posts: posts})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

// Get post by title - query
router.get('/title', async (req, res) => {
  req.query.title = sanitizeDataRequest(req.query.title)
  // Check for XSS attacks
  // Validate the request query
  const {error} = checkPostTitleValidation.validate(req.query)
  if (error) return res.status(400).json({message: error.details[0].message})

  // Check if the post exists
  try {
    const post = await Post.findOne({title: req.query.title})
    // Check if the post by title is existing in the database
    if (!post) return res.status(404).json({message: 'Post not found'})
    return res.status(200).json({message: post})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

// get post by id
router.get('/:id', async (req, res) => {
  // purify xss attacks if existed
  req.params.id = sanitizeDataRequest(req.params.id)
  // validate the request param
  const {error} = checkPostByIdValidation.validate(req.params)
  if (error) return res.status(400).json({message: error.details[0].message})

  const post = await Post.findById(req.params.id)
  if (!post) return res.status(404).json({message: 'Post not found'})
  try {
    return res.status(200).json({post: post})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

// Update post by id
router.put('/update/:id', async (req, res) => {
  req.params.id = sanitizeDataRequest(req.params.id)
  req.body = sanitizeDataRequest(req.body)

  const {error: errorBody} = updatePostValidation.validate(req.body)
  if (errorBody)
    return res.status(400).json({message: errorBody.details[0].message})

  const {error: errorParam} = checkPostByIdValidation.validate(req.params)
  if (errorParam)
    return res.status(400).json({message: errorParam.details[0].message})

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
      },
      {new: true},
    )
    if (!post)
      return res.status(404).json({
        message: 'No users found',
      })
    return res.status(200).json({message: 'Post has been updated'})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

// Delete post by id
router.delete('/delete/:id', async (req, res) => {
  req.params.id = sanitizeDataRequest(req.params.id)
  const {error} = checkPostByIdValidation.validate(req.params)
  if (error) return res.status(400).json({message: error.details[0].message})
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) return res.json({message: 'Post not found'})
    return res.status(200).json({message: 'Post deleted', isDeleted: true})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

// Create new post
router.post('/create', async (req, res) => {
  // Check for XSS attacks
  req.body = sanitizeDataRequest(req.body)
  // Validate the request body
  const {error} = createPostValidation.validate(req.body)
  if (error) return res.status(400).json({message: error.details[0].message})
  // Check if the post already exists
  try {
    const post = await Post.create(req.body)
    return res.status(201).json({message: 'Post created', post: post})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

export default router
