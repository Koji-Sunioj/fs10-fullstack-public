import mongoose from 'mongoose'
import { OwnerDocument } from 'types'

const OwnerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  biography: String,
  languages: [],
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
  ],
})

export default mongoose.model<OwnerDocument>('Owner', OwnerSchema)
