import { Document } from 'mongoose'

export const reqString = {
  type: String,
  required: true,
}

export type UserData = {
  firstName: string
  lastName: string
  email: string
  joinDate: Date
}

export type ReservationType = {
  createDate: Date
  startDate: Date
  nights: number
  propertyId: string
  userId: string
}

export type OwnerType = {
  firstName: string
  lastName: string
  biography: string
  languages: string[]
  properties: string[]
}

export type PropertyType = {
  location: string
  title: string
  description: string
  buildDate: Date
  nightlyRate: number
  rooms: number
  owners: string[]
  category: 'cottage' | 'apartment' | 'house' | 'hut'
}

export type UserDocument = Document & UserData

export type ReservationDocument = Document & ReservationType

export type PropertyDocument = Document & PropertyType

export type OwnerDocument = Document & OwnerType
