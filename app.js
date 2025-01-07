import express from 'express'
import {connectToDB} from './utils/dbConnection.js'

import userRouter from './routes/users.js'
import postRouter from './routes/posts.js'
import countryRouter from './routes/country.js'
import cityRouter from './routes/city.js'
import streetRouter from './routes/street.js'

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
