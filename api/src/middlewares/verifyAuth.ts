import { Request, Response, NextFunction } from 'express'
import jwt = require('jsonwebtoken')
import UserService from '../services/user'
import { DecodedType } from 'types'

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const decoded = jwt.verify(
      token!,
      process.env.JWT_SECRET as string
    ) as DecodedType
    const user = await UserService.findByEmail(decoded.email)
    const expiry = new Date(decoded.exp * 1000)
    if (!user) {
      res.json({ status: 403, message: 'no user with your credentials' })
    } else if (expiry < new Date()) {
      res.json({ status: 403, message: 'session expired' })
    } else if (req.query.retrieve) {
      res.json({ status: 200, data: user })
    } else {
      req.body.userId = user!._id
      next()
    }
  } catch (error) {
    res.json({ status: 403, message: 'invalid session' })
  }
}
