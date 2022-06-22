import { Request, Response, NextFunction } from 'express'
import { PropertyType, FilterType } from 'types'
import Property from '../models/Property'
import PropertyService from '../services/property'
import { BadRequestError } from '../helpers/apiError'
import ReservationService from '../services/reservation'
import OwnerService from '../services/owner'

export const createProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newProperty: PropertyType = {
      location: req.body.location,
      title: req.body.title,
      description: req.body.description,
      nightlyRate: req.body.nightlyRate,
      rooms: req.body.rooms,
      owners: req.body.owners,
      category: req.body.category,
      buildDate: req.body.buildDate,
    }

    const newData = new Property(newProperty)
    const created = await PropertyService.create(newData)
    if (created.owners.length > 0) {
      created.owners.forEach(async (owner) => {
        await OwnerService.addProperty(newData._id, owner)
      })
    }

    const property = await PropertyService.findProperty(created._id)

    res.json({
      status: 200,
      message: 'property successfully created',
      data: property[0],
    })
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
    if ('searchBy' in req.query) {
      const filter = {
        searchBy: String(req.query.searchBy)!,
        direction: Number(req.query.direction),
        sortBy: String(req.query.sortBy),
        page: Number(req.query.page) * 6 - 6,
      }
      const properties = await PropertyService.findProperties(filter)
      const count = await PropertyService.countProperties(filter)
      res.json({ status: 200, data: properties, count: count })
    } else {
      const properties = await PropertyService.findAllProperties()
      res.json({ status: 200, data: properties })
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const deleteProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { propertyId } = req.params
    const toDelete = await PropertyService.deleteById(propertyId)
    await ReservationService.deleteByPropertyId(propertyId)
    await OwnerService.removeProperty(propertyId)
    res.json({
      status: 200,
      message: `${toDelete!.title} was successfully deleted`,
      data: toDelete,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { propertyId } = req.params
    const property = await PropertyService.findProperty(propertyId)
    res.json({ status: 200, data: property[0] })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { propertyId } = req.params
    const newData: PropertyType = {
      location: req.body.location,
      title: req.body.title,
      description: req.body.description,
      nightlyRate: req.body.nightlyRate,
      rooms: req.body.rooms,
      owners: req.body.owners,
      category: req.body.category,
      buildDate: req.body.buildDate,
    }
    await OwnerService.removeProperty(propertyId)
    if (newData.owners.length > 0) {
      newData.owners.forEach(async (owner) => {
        await OwnerService.addProperty(propertyId, owner)
      })
    }
    await PropertyService.updateById(propertyId, newData)
    const property = await PropertyService.findProperty(propertyId)
    res.json({
      status: 200,
      message: 'property successfully updated',
      data: property[0],
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
