import { Request, Response, NextFunction } from 'express'

import Reservation from '../models/Reservation'
import ReservationService from '../services/reservation'
import { BadRequestError } from '../helpers/apiError'

export const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = req.body

    const newData = new Reservation(newUser)
    await ReservationService.create(newData)
    res.json({ status: 200 })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await ReservationService.findAll()
    res.json({ status: 200, data: allUsers })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
