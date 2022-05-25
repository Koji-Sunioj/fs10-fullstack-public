import express from 'express'

import {
  createOwner,
  findOwners,
  findOwner,
  deleteOwner,
  updateOwner,
} from '../controllers/owner'

const router = express.Router()

router.get('/', findOwners)
router.post('/', createOwner)
router.get('/:ownerId', findOwner)
router.patch('/:ownerId', updateOwner)
router.delete('/:ownerId', deleteOwner)

export default router
