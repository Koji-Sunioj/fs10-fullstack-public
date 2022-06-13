import Reservation from '../models/Reservation'
import { ReservationDocument } from 'types'
import { ReservationType } from 'types'
import mongoose from 'mongoose'

const reservationView = [
  {
    $lookup: {
      localField: 'propertyId',
      from: 'properties',
      foreignField: '_id',
      as: 'property',
    },
  },
  { $unwind: '$property' },
  {
    $addFields: {
      bill: { $multiply: ['$nights', '$property.nightlyRate'] },
      checkOut: {
        $dateAdd: { startDate: '$startDate', unit: 'day', amount: '$nights' },
      },
    },
  },
  {
    $lookup: {
      localField: 'property.owners',
      from: 'owners',
      foreignField: '_id',
      as: 'property.hosts',
    },
  },
  {
    $project: {
      __v: 0,
      'property.__v': 0,
      propertyId: 0,
      userId: 0,
      'property.owners': 0,
      'property.hosts.properties': 0,
      'property.hosts.__v': 0,
    },
  },
]

const create = async (reservationData: ReservationDocument) => {
  return reservationData.save()
}

const findAll = async () => {
  return Reservation.find({}, { __v: 0 }).sort({ startDate: 1 })
}

const findBypropertyId = async (propertyId: string) => {
  return Reservation.find({ propertyId: propertyId }, { __v: 0 }).sort({
    startDate: -1,
  })
}

const findById = async (reservationId: string) => {
  const userReservation = Reservation.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(reservationId) },
    },
    ...reservationView,
  ])
  return userReservation
}

const deleteById = async (reservationId: string) => {
  return Reservation.findByIdAndDelete(reservationId)
}

const deleteByPropertyId = async (propertyId: string) => {
  return Reservation.deleteMany({ propertyId: propertyId })
}

const updateById = async (
  reservationId: string,
  reservationData: Partial<ReservationType>
) => {
  const reservation = await Reservation.findById(reservationId)
  Object.assign(reservation, reservationData)
  return reservation!.save()
}

const findbyUserID = async (userId: string) => {
  const now = new Date()
  const userReservations = Reservation.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(userId) },
    },
    ...reservationView,
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
  findBypropertyId,
  deleteByPropertyId,
}
