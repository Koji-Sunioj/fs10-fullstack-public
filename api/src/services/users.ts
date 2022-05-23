import Users, { UserDocument } from '../models/Users'
//import { NotFoundError } from '../helpers/apiError'

const create = async (object: UserDocument): Promise<UserDocument> => {
  return object.save()
}

const findAll = async (): Promise<UserDocument[]> => {
  return Users.find()
}

export default {
  create,
  findAll,
}
