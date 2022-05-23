import Test, { TestDocument } from '../models/TestModel'
import { NotFoundError } from '../helpers/apiError'

const create = async (object: TestDocument): Promise<TestDocument> => {
  return object.save()
}

const findAll = async (): Promise<TestDocument[]> => {
  return Test.find()
}

const findById = async (id: string): Promise<TestDocument | null> => {
  const data = await Test.findById(id)
  return data
}

const updateByID = async (
  name: string,
  id: string
): Promise<TestDocument | null> => {
  const data = await Test.findById(id)
  data!.name = name
  return data!.save()
}

const deleteById = async (id: string): Promise<TestDocument | null> => {
  return Test.findByIdAndDelete(id)
}

export default {
  create,
  findAll,
  findById,
  deleteById,
  updateByID,
}
