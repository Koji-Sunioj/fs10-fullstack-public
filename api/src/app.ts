import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport'
import propertyRouter from './routers/property'
import ownerRouter from './routers/owner'
import userRouter from './routers/user'
import reservationRouter from './routers/reservation'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import verifyAuth from './middlewares/verifyAuth'
import jwt = require('jsonwebtoken')
import cors = require('cors')
import loginGoogle from './passport/google'
dotenv.config({ path: '.env' })
const app = express()

//c//onst cors = require('cors')
// Express configuration

app.set('port', process.env.PORT || 5000)
app.use(cors())
// Global middleware
app.use(apiContentType)
app.use(express.json())

app.use(passport.initialize())
passport.use(loginGoogle())

// Set up routers
app.post(
  '/google-login',
  passport.authenticate('google-id-token', { session: false }),
  (req, resp) => {
    const user: any = req.user
    const token = jwt.sign(
      { email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as string,
      { expiresIn: '3h' }
    )
    resp.json({ token: token, user: user })
  }
)
app.get('/api/v1/verifytoken', verifyAuth)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/owners', ownerRouter)
app.use('/api/v1/properties', propertyRouter)
app.use('/api/v1/reservations', reservationRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
