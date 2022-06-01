import { Request, Response, NextFunction } from 'express'
import jwt = require('jsonwebtoken')
import { ForbiddenError } from '../helpers/apiError'

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const decoded = jwt.verify(token!, process.env.JWT_SECRET as string)
    next()
  } catch (error) {
    throw new ForbiddenError()
  }
}
