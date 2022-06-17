import User from '../models/User'
import { UserDocument, UserType } from 'types'

const create = async (newUser: UserDocument): Promise<UserDocument> => {
  return newUser.save()
}

const findById = async (userId: string): Promise<UserDocument | null> => {
  return User.findById(userId)
}

const findByEmail = async (email: string): Promise<UserDocument | null> => {
  return User.findOne({ email: email })
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find()
}

const deleteById = async (userId: string): Promise<UserDocument | null> => {
  return User.findByIdAndDelete(userId)
}

const updateById = async (
  userId: string,
  userData: Partial<UserType>
): Promise<UserDocument | null> => {
  const user = await User.findById(userId)
  Object.assign(user, userData)
  return user!.save()
}

export default {
  create,
  findById,
  deleteById,
  updateById,
  findAll,
  findByEmail,
}
