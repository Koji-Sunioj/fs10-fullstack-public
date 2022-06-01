// @ts-ignore
import GoogleStrategy from 'passport-google-id-token'
import UserService from '../services/user'
import User from '../models/User'

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
    async (googleResp: any, googleId: any, done: any) => {
      try {
        let user: any = await UserService.findByEmail(googleResp.payload.email)
        if (!user) {
          user = {
            firstName: googleResp.payload.given_name,
            lastName: googleResp.payload.family_name,
            email: googleResp.payload.email,
            isAdmin: isAdmin(googleResp.payload.email),
          }
          const newUser = new User(user)
          await UserService.create(newUser)
        }
        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
}

export default loginGoogle
