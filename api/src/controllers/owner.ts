import { Request, Response, NextFunction } from 'express'

import { OwnerType } from 'types'
import Owner from '../models/Owner'
import OwnerService from '../services/owner'
import { BadRequestError } from '../helpers/apiError'
import PropertyService from '../services/property'

/*mongdodb returns an aggregate (array) in order to join data 
from other collections for viewing on the owner page. hence, 
create, update, and find all index the first value in the array returned
from mongodb when focusing on one owner object*/

export const createOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newOwner = req.body
    const newData = new Owner(newOwner)
    const created = await OwnerService.create(newData)
    if (created.properties.length > 0) {
      created.properties.forEach(async (property) => {
        await PropertyService.addOwner(property, newData._id)
      })
    }
    const owner = await OwnerService.findById(created._id)
    res.json({
      status: 200,
      data: owner[0],
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
    console.log(owner)
    res.json({ status: 200, data: owner[0] })
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
    await PropertyService.removeOwner(ownerId)
    if (newData.properties.length > 0) {
      newData.properties.forEach(async (property) => {
        await PropertyService.addOwner(property, ownerId)
      })
    }
    await OwnerService.updateById(ownerId, newData)
    const owner = await OwnerService.findById(ownerId)
    res.json({
      status: 200,
      message: 'owner successfully updated',
      data: owner[0],
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
