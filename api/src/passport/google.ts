// @ts-ignore
import GoogleStrategy from 'passport-google-id-token'
import UserService from '../services/user'
import User from '../models/User'

function isAdmin(domain: string) {
  if (domain.split('@')[1] === 'integrify.io') {
    return true
  } else {
    return false
  }
}

const loginGoogle = () => {
  return new GoogleStrategy(
    { clientId: process.env.GOOGLE_CLIENT_ID },
    async (googleResp: any, googleId: any, done: any) => {
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
    }
  )
}

export default loginGoogle
