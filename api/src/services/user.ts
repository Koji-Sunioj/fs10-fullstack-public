import User from '../models/User'
import { UserDocument, UserData } from 'types'

const create = async (newUser: UserDocument): Promise<UserDocument> => {
  return newUser.save()
}

const findById = async (userId: string): Promise<UserDocument | null> => {
  return User.findById(userId)
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find()
}

const deleteById = async (userId: string): Promise<UserDocument | null> => {
  return User.findByIdAndDelete(userId)
}

const updateById = async (
  userId: string,
  userData: Omit<UserData, 'joinDate'>
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
}