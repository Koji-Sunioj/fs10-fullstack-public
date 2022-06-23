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
    const created = await ReservationService.create(newData)
    res.json({ status: 200, data: created })
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
    const { propertyId, userId } = req.query
    if (propertyId) {
      const propertyReservations = await ReservationService.findBypropertyId(
        String(req.query.propertyId)
      )
      res.json({ status: 200, data: propertyReservations })
    }
    if (userId) {
      const userReservations = await ReservationService.findbyUserID(
        String(req.query.userId)
      )
      res.json({ status: 200, data: userReservations })
    }
    if (!req.query) {
      const reservations = await ReservationService.findAll()
      res.json({ status: 200, data: reservations })
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reservationId } = req.params
    const reservation = await ReservationService.findById(reservationId)
    res.json({ status: 200, data: reservation })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const deleteReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reservationId } = req.params
    const deleted = await ReservationService.deleteById(reservationId)
    res.json({
      status: 200,
      message: 'reservation deleted',
      _id: reservationId,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reservationId } = req.params
    const newData = {
      startDate: req.body.startDate,
      nights: req.body.nights,
    }
    const deleted = await ReservationService.updateById(reservationId, newData)
    res.json({ status: 200, message: 'reservation updated' })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
