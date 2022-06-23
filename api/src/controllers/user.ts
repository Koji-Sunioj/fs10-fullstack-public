import { Request, Response, NextFunction } from 'express'

import { UserType } from 'types'
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
    const newUser: Partial<UserType> = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
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
    const newData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }
    const updated = await UserService.updateById(userId, newData)
    res.json({
      status: 200,
      message: 'user successfully updated',
      data: updated,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
