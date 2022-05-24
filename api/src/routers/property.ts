import express from 'express'

import { createProperty, findProperties } from '../controllers/property'

const router = express.Router()

router.get('/', findProperties)
router.post('/', createProperty)

export default router
