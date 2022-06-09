import express from 'express'
import verifyAuth from '../middlewares/verifyAuth'
import verifyAdmin from '../middlewares/verifyAdmin'

import {
  createProperty,
  findProperties,
  deleteProperty,
  findProperty,
  updateProperty,
} from '../controllers/property'

const router = express.Router()

router.get('/', findProperties)
router.post('/', verifyAuth, verifyAdmin, createProperty)
router.get('/:propertyId', findProperty)
router.patch('/:propertyId', updateProperty)
router.delete('/:propertyId', deleteProperty)

export default router
