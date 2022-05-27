import Reservation from '../models/Reservation'
import { ReservationDocument } from 'types'
import { ReservationType } from 'types'
import mongoose from 'mongoose'

const create = async (
  object: ReservationDocument
): Promise<ReservationDocument> => {
  return object.save()
}

const findAll = async (): Promise<ReservationDocument[]> => {
  return Reservation.find()
}

const findById = async (
  reservationId: string
): Promise<ReservationDocument | null> => {
  return Reservation.findById(reservationId)
}

const deleteById = async (
  reservationId: string
): Promise<ReservationDocument | null> => {
  return Reservation.findByIdAndDelete(reservationId)
}

const updateById = async (
  reservationId: string,
  reservationData: Partial<ReservationType>
): Promise<ReservationDocument | null> => {
  const reservation = await Reservation.findById(reservationId)
  Object.assign(reservation, reservationData)
  return reservation!.save()
}

const findbyUserID = async (userId: string) => {
  const now = new Date()
  const userReservations = await Reservation.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        localField: 'propertyId',
        from: 'properties',
        foreignField: '_id',
        as: 'properties',
      },
    },
    {
      $sort: { startDate: 1 },
    },
  ])

  return userReservations
}

export default {
  create,
  findAll,
  findById,
  deleteById,
  updateById,
  findbyUserID,
}
