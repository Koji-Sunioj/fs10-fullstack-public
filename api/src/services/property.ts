import Property from '../models/Property'
import { PropertyDocument } from 'types'

const create = async (object: PropertyDocument): Promise<PropertyDocument> => {
  return object.save()
}

const findAll = async (): Promise<PropertyDocument[]> => {
  return Property.find()
}

export default {
  create,
  findAll,
}
