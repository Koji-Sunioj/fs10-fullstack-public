import express from 'express'

import {
  createProperty,
  findProperties,
  deleteProperty,
  findProperty,
  updateProperty,
} from '../controllers/property'

const router = express.Router()

router.get('/', findProperties)
router.post('/', createProperty)
router.get('/:propertyId', findProperty)
router.patch('/:propertyId', updateProperty)
router.delete('/:propertyId', deleteProperty)

export default router
