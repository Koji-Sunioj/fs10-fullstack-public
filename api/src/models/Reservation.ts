import mongoose from 'mongoose'
import { ReservationDocument } from 'types'

const ReservationSchema = new mongoose.Schema({
  createDate: { type: Date, default: Date.now },
  startDate: Date,
  nights: { type: Number, required: true },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

export default mongoose.model<ReservationDocument>(
  'Reservation',
  ReservationSchema
)
