/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type TestDocument = Document & {
  name: string
}

const TestSchema = new mongoose.Schema({
  name: String,
})

export default mongoose.model<TestDocument>('Test', TestSchema)
