import User from '../models/User'
import { UserDocument } from 'types'

const create = async (object: UserDocument): Promise<UserDocument> => {
  return object.save()
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find()
}

export default {
  create,
  findAll,
}
