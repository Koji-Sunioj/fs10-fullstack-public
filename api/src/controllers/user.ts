import { Request, Response, NextFunction } from 'express'

import { UserData } from 'types'
import User from '../models/User'
import UserService from '../services/user'
import { BadRequestError } from '../helpers/apiError'

export const viewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const user = await UserService.findById(userId)
    res.json({ status: 200, data: user })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const viewUsers = async (
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

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser: Omit<UserData, 'joinDate'> = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    }
    const newData = new User(newUser)
    const user = await UserService.create(newData)
    res.json({
      status: 200,
      message: `user ${user!.firstName} ${user!.lastName} created`,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const user = await UserService.deleteById(userId)
    res.json({
      status: 200,
      message: `user ${user!.firstName} ${user!.lastName} deleted`,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const newData: Omit<UserData, 'joinDate'> = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    }
    const updated = await UserService.updateById(userId, newData)
    res.json({ status: 200, message: 'user successfully updated' })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
