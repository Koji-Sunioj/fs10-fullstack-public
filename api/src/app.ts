import express from 'express'
import dotenv from 'dotenv'

import propertyRouter from './routers/property'
import ownerRouter from './routers/owner'
import userRouter from './routers/user'
import reservationRouter from './routers/reservation'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()
const cors = require('cors')
// Express configuration

app.set('port', process.env.PORT || 5000)
app.use(cors())
// Global middleware
app.use(apiContentType)
app.use(express.json())

// Set up routers

app.use('/api/v1/users', userRouter)
app.use('/api/v1/owners', ownerRouter)
app.use('/api/v1/properties', propertyRouter)
app.use('/api/v1/reservations', reservationRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
