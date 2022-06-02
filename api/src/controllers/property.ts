import { Request, Response, NextFunction } from 'express'
import { PropertyType, FilterType } from 'types'
import Property from '../models/Property'
import PropertyService from '../services/property'
import { BadRequestError } from '../helpers/apiError'

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
    await PropertyService.create(newData)
    res.json({ status: 200, message: 'property successfully created' })
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
    const filter = {
      searchBy: String(req.query.searchBy)!,
      direction: Number(req.query.direction),
      sortBy: String(req.query.sortBy),
      page: Number(req.query.page) * 6 - 6,
    }
    const properties = await PropertyService.findProperties(filter)
    const count = await PropertyService.countProperties(filter)
    res.json({ status: 200, data: properties, count: count })
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
    res.json({
      status: 200,
      message: `${toDelete!.title} was successfully deleted`,
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
    res.json({ status: 200, data: property })
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
    const updated = await PropertyService.updateById(propertyId, newData)
    res.json({ status: 200, message: 'property successfully updated' })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
