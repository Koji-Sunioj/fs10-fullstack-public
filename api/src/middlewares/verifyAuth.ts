import { Request, Response, NextFunction } from 'express'
import jwt = require('jsonwebtoken')
import { ForbiddenError } from '../helpers/apiError'
import UserService from '../services/user'

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const decoded: any = jwt.verify(token!, process.env.JWT_SECRET as string)

    const expiry = new Date(decoded.exp * 1000)
    if (expiry < new Date()) {
      res.json({ status: 403, message: 'session expired' })
    }
    const user = await UserService.findByEmail(decoded.email)

    if (!user) {
      res.json({ status: 403, message: 'no user with your credentials' })
    }

    if (req.method === 'GET') {
      res.json({ status: 200, data: user })
    }
    req.body.userId = user!._id
    next()
  } catch (error) {
    res.json({ status: 403, message: 'invalid session' })
  }
}
