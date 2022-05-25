import Property from '../models/Property'
import { PropertyDocument, PropertyType } from 'types'

const create = async (object: PropertyDocument): Promise<PropertyDocument> => {
  return object.save()
}

const findProperties = async (): Promise<PropertyDocument[]> => {
  return Property.find()
}

const deleteById = async (
  propertyId: string
): Promise<PropertyDocument | null> => {
  return Property.findByIdAndDelete(propertyId)
}

const findProperty = async (
  propertyId: string
): Promise<PropertyDocument | null> => {
  return Property.findById(propertyId)
}

const updateById = async (
  propertyId: string,
  propertyData: PropertyType
): Promise<PropertyDocument | null> => {
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
