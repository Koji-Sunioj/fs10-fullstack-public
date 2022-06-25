import { Request, Response, NextFunction } from 'express'
import jwt = require('jsonwebtoken')

import { UserType } from 'types'

export const signToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  {
    const user = req.user! as UserType
    const token = jwt.sign(
      { email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as string,
      { expiresIn: '3h' }
    )
    res.json({ token: token, user: user })
  }
}
