import mongoose from 'mongoose'
import { UserDocument } from 'types'

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: { type: String, unique: true, required: true },
  joinDate: { type: Date, default: Date.now },
})

export default mongoose.model<UserDocument>('User', UserSchema)
