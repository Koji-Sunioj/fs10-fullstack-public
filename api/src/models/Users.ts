import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  joinDate: Date
}

const stringType = {
  type: String,
  required: true,
  maxlength: 200,
  minlength: 3,
}

const UserSchema = new mongoose.Schema({
  firstName: stringType,
  lastName: stringType,
  email: { type: String, unique: true },
  joinDate: Date,
})

export default mongoose.model<UserDocument>('Users', UserSchema)
