import Property from '../models/Property'
import { PropertyDocument, PropertyType } from 'types'

const create = async (propertyData: PropertyDocument) => {
  return propertyData.save()
}

const findProperties = async () => {
  return Property.find().sort({ nightlyRate: 1 })
}

const deleteById = async (propertyId: string) => {
  return Property.findByIdAndDelete(propertyId)
}

const findProperty = async (propertyId: string) => {
  return Property.findById(propertyId)
}

const updateById = async (propertyId: string, propertyData: PropertyType) => {
  const property = await Property.findById(propertyId)
  Object.assign(property, propertyData)
  return property!.save()
}

export default {
  create,
  findProperties,
  deleteById,
  findProperty,
  updateById,
}
