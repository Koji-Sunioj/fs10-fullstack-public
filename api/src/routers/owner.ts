import express from 'express'
import verifyAdmin from '../middlewares/verifyAdmin'
import {
  createOwner,
  findOwners,
  findOwner,
  deleteOwner,
  updateOwner,
} from '../controllers/owner'

import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

router.get('/', findOwners)
router.post('/', verifyAuth, verifyAdmin, createOwner)
router.get('/:ownerId', findOwner)
router.patch('/:ownerId', verifyAuth, verifyAdmin, updateOwner)
router.delete('/:ownerId', verifyAuth, verifyAdmin, deleteOwner)

export default router
