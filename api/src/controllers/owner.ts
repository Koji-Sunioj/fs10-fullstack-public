import { Request, Response, NextFunction } from 'express'

import { OwnerType } from 'types'
import Owner from '../models/Owner'
import OwnerService from '../services/owner'
import { BadRequestError } from '../helpers/apiError'
import PropertyService from '../services/property'

export const createOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newOwner = req.body
    const newData = new Owner(newOwner)
    console.log(newData._id)
    const created = await OwnerService.create(newData)
    if (created.properties.length > 0) {
      created.properties.forEach(async (property) => {
        const updateable = await PropertyService.addOwner(property, newData._id)
      })
    }
    res.json({
      status: 200,
      data: created,
      message: 'owner successfully created',
    })
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
    const owners = await OwnerService.findAll()
    res.json({ status: 200, data: owners })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ownerId } = req.params
    const owner = await OwnerService.findById(ownerId)
    res.json({ status: 200, data: owner })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const deleteOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ownerId } = req.params
    await PropertyService.removeOwner(ownerId)
    const owner = await OwnerService.deleteById(ownerId)
    res.json({
      status: 200,
      message: `owner ${owner!.firstName} ${owner!.lastName} deleted`,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ownerId } = req.params
    const newData: OwnerType = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      biography: req.body.biography,
      languages: req.body.languages,
      properties: req.body.properties,
    }

    const updated = await OwnerService.updateById(ownerId, newData)
    res.json({ status: 200, message: 'owner successfully updated' })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
