import Reservation from '../models/Reservation'
import { ReservationDocument } from 'types'
import { ReservationType } from 'types'

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

export default {
  create,
  findAll,
  findById,
  deleteById,
  updateById,
}
