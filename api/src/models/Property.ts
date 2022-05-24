import mongoose from 'mongoose'
import { PropertyDocument } from 'types'

const PropertySchema = new mongoose.Schema({
  location: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  buildDate: Date,
  nightlyRate: { type: Number, required: true },
  rooms: { type: Number, required: true },
  owners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner',
    },
  ],
})

export default mongoose.model<PropertyDocument>('Property', PropertySchema)
