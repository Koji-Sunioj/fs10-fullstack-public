import Property from '../models/Property'
import { PropertyDocument, PropertyType, FilterType } from 'types'
import mongoose from 'mongoose'
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants'

const create = async (propertyData: PropertyDocument) => {
  return propertyData.save()
}

const countProperties = async (filter: FilterType) => {
  const stringFilter = new RegExp(filter.searchBy, 'i')
  return Property.countDocuments({
    $or: [
      { category: stringFilter },
      { location: stringFilter },
      { title: stringFilter },
    ],
  })
}

const addOwner = async (propertyId: string, ownerId: string) => {
  return await Property.updateOne(
    { _id: propertyId },
    { $push: { owners: ownerId } }
  )
}

const removeOwner = async (ownerId: string) => {
  return await Property.updateMany({ $pull: { owners: ownerId } })
}

const findProperties = async (filter: FilterType) => {
  const stringFilter = new RegExp(filter.searchBy, 'i')
  return Property.find(
    {
      $or: [
        { category: stringFilter },
        { location: stringFilter },
        { title: stringFilter },
      ],
    },
    {
      __v: 0,
      owners: 0,
      buildDate: 0,
      description: 0,
    }
  )
    .sort({
      [filter.sortBy]: filter.direction,
    })
    .skip(filter.page)
    .limit(6)
}

const findAllProperties = async () => {
  return Property.find({}, { location: 1, title: 1 })
}

const deleteById = async (propertyId: string) => {
  return Property.findByIdAndDelete(propertyId)
}

const findProperty = async (propertyId: string) => {
  const rightNow = new Date()
  const userReservation = Property.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(propertyId) },
    },
    {
      $lookup: {
        localField: '_id',
        from: 'reservations',
        foreignField: 'propertyId',
        as: 'reservations',
        pipeline: [{ $sort: { startDate: -1 } }],
      },
    },
    {
      $lookup: {
        localField: 'owners',
        from: 'owners',
        foreignField: '_id',
        as: 'owners',
      },
    },
    {
      $addFields: {
        reservations: {
          $map: {
            input: '$reservations',
            in: {
              $mergeObjects: [
                '$$this',
                {
                  checkOut: {
                    $dateAdd: {
                      startDate: '$$this.startDate',
                      unit: 'day',
                      amount: '$$this.nights',
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },

    {
      $project: {
        __v: 0,
        'owners.properties': 0,
        'reservations.__v': 0,
        'owners.__v': 0,
      },
    },
  ])

  return userReservation
}

const updateById = async (propertyId: string, propertyData: PropertyType) => {
  const property = await Property.findById(propertyId)
  Object.assign(property, propertyData)
  return property!.save()
}

export default {
  create,
  findProperties,
  findAllProperties,
  addOwner,
  deleteById,
  findProperty,
  updateById,
  countProperties,
  removeOwner,
}
