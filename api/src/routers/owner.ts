import express from 'express'

import { createOwner, findOwners } from '../controllers/owner'

const router = express.Router()

router.get('/', findOwners)
router.post('/', createOwner)

export default router
