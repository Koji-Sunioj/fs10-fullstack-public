import { Request, Response, NextFunction } from 'express'

import Users from '../models/Users'
import UserService from '../services/users'
import { BadRequestError } from '../helpers/apiError'

// POST /movies
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = req.body
    newUser.joinDate = new Date()
    const newData = new Users(newUser)
    await UserService.create(newData)
    res.json({ status: 200 })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /movies
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await UserService.findAll()
    res.json({ status: 200, data: allUsers })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
