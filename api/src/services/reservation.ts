import Reservation from '../models/Reservation'
import { ReservationDocument } from 'types'

const create = async (
  object: ReservationDocument
): Promise<ReservationDocument> => {
  return object.save()
}

const findAll = async (): Promise<ReservationDocument[]> => {
  return Reservation.find()
}

export default {
  create,
  findAll,
}
