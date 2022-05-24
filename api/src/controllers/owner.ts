import { Request, Response, NextFunction } from 'express'

import Owner from '../models/Owner'
import OwnerService from '../services/owner'
import { BadRequestError } from '../helpers/apiError'

export const createOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newOwner = req.body
    const newData = new Owner(newOwner)
    await OwnerService.create(newData)
    res.json({ status: 200 })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findOwners = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await OwnerService.findAll()
    console.log(allUsers)
    res.json({ status: 200, data: allUsers })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
