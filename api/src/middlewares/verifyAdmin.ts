import { Request, Response, NextFunction } from 'express'
import jwt = require('jsonwebtoken')
import UserService from '../services/user'

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const decoded: any = jwt.verify(token!, process.env.JWT_SECRET as string)
    const user: any = await UserService.findByEmail(decoded.email)
    if (!user.isAdmin) {
      res.json({
        status: 403,
        message: 'insufficient priviledges for this request',
      })
    } else if (user.isAdmin) {
      next()
    }
  } catch (error) {
    res.json({ status: 403, message: 'invalid session' })
  }
}
