import express from 'express'
import cors from 'cors'
import routes from './routes'
import { errorHandler } from './shared/middleware/error.middleware'
import { setupSwagger } from './swagger'

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
setupSwagger(app)

app.use('/health', (req, res) => res.send('OK'))
app.use('/api', routes)

app.use(errorHandler)

export default app
