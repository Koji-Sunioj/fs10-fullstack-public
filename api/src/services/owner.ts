import Owner from '../models/Owner'
import { OwnerDocument, OwnerType } from 'types'
import mongoose from 'mongoose'

const create = async (object: OwnerDocument): Promise<OwnerDocument> => {
  return object.save()
}

const findAll = async (): Promise<OwnerDocument[]> => {
  return Owner.find()
}

const findById = async (ownerId: string): Promise<any> => {
  return Owner.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(ownerId) },
    },
    {
      $lookup: {
        localField: 'properties',
        from: 'properties',
        foreignField: '_id',
        as: 'properties',
      },
    },
    {
      $project: {
        'properties.owners': 0,
        'properties.nightlyRate': 0,
        'properties.description': 0,
        'properties.rooms': 0,
        'properties.category': 0,
        'properties.buildDate': 0,
        'properties.__v': 0,
        __v: 0,
      },
    },
  ])
  //return Owner.findById(ownerId)
}

const deleteById = async (ownerId: string): Promise<OwnerDocument | null> => {
  return Owner.findByIdAndDelete(ownerId)
}

const updateById = async (
  ownerId: string,
  ownerData: OwnerType
): Promise<OwnerDocument | null> => {
  const owner = await Owner.findById(ownerId)
  Object.assign(owner, ownerData)
  return owner!.save()
}

export default {
  create,
  findAll,
  findById,
  deleteById,
  updateById,
}

/*[
    {
      $match: { _id: new mongoose.Types.ObjectId(ownerId) },
    },
    {
      $lookup: {
        localField: 'properties',
        from: 'properties',
        foreignField: '_id',
        as: 'properties',
      },
    }
  ]*/
