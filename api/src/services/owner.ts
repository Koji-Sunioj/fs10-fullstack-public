import Owner from '../models/Owner'
import { OwnerDocument } from 'types'

const create = async (object: OwnerDocument): Promise<OwnerDocument> => {
  return object.save()
}

const findAll = async (): Promise<OwnerDocument[]> => {
  return Owner.find()
}

export default {
  create,
  findAll,
}
