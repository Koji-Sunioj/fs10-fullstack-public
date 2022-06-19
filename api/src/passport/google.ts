// @ts-ignore
import GoogleStrategy from 'passport-google-id-token'
import UserService from '../services/user'
import User from '../models/User'
import { GoogleRespType } from 'types'

function isAdmin(email: string) {
  if (email === 'koji.gabriel218@gmail.com') {
    return true
  } else {
    return false
  }
}

const loginGoogle = () => {
  return new GoogleStrategy(
    { clientId: process.env.GOOGLE_CLIENT_ID },
    async (googleResp: GoogleRespType, googleId: string, done: Function) => {
      try {
        let user = await UserService.findByEmail(googleResp.payload.email)!
        if (!user) {
          const newUser = {
            firstName: googleResp.payload.given_name,
            lastName: googleResp.payload.family_name,
            email: googleResp.payload.email,
            isAdmin: isAdmin(googleResp.payload.email),
          }
          user = new User(newUser)
          await UserService.create(user)
        }
        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
}

export default loginGoogle
