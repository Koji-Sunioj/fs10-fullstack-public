import { Request, Response, NextFunction } from 'express'

import Test from '../models/TestModel'
import TestService from '../services/test'
import { BadRequestError } from '../helpers/apiError'

// POST /movies
export const createName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body
    const newData = new Test({
      name,
    })
    const newUser = await TestService.create(newData)
    res.json({ status: 200, data: newUser })
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
    const allUsers = await TestService.findAll()
    res.json({ status: 200, data: allUsers })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const testId = req.params.testId
    const user = await TestService.findById(testId)
    res.json({ status: 200, data: user })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const replaceByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const testId = req.params.testId
    const { name } = req.body
    await TestService.deleteById(testId)
    const newData = new Test({
      name,
    })

    console.log(newData)
    const newUser = await TestService.create(newData)
    res.json({ status: 200, data: newUser })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const deleteByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const testId = req.params.testId
    await TestService.deleteById(testId)
    res.json({ status: 200 })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const testId = req.params.testId
    const { name } = req.body
    await TestService.updateByID(name, testId)
    res.json({ status: 200 })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
