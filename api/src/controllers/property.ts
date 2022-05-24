import { Request, Response, NextFunction } from 'express'

import Property from '../models/Property'
import PropertyService from '../services/property'
import { BadRequestError } from '../helpers/apiError'

export const createProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = req.body
    //console.log(newUser)
    const newData = new Property(newUser)
    //console.log(newData)
    await PropertyService.create(newData)
    res.json({ status: 200 })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await PropertyService.findAll()
    res.json({ status: 200, data: allUsers })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
