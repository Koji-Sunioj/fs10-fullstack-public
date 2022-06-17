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
    console.log(decoded)
    const user = await UserService.findByEmail(decoded.email)
    if (!user!.isAdmin) {
      res.json({
        status: 403,
        message: 'insufficient priviledges for this request',
      })
    } else if (user!.isAdmin) {
      next()
    }
  } catch (error) {
    res.json({ status: 403, message: 'invalid session' })
  }
}
