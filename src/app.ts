import express from 'express'
import {connectToDB} from './utils/dbConnection'

import userRouter from './routes/users'
import postRouter from './routes/posts'
import countryRouter from './routes/country'
import cityRouter from './routes/city'
import streetRouter from './routes/street'

await connectToDB()

const app = express()
const port = 3003

app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/country', countryRouter)
app.use('/api/city', cityRouter)
app.use('/api/street', streetRouter)

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
)
