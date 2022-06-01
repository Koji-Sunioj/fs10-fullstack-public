import express from 'express'
import {
  createOwner,
  findOwners,
  findOwner,
  deleteOwner,
  updateOwner,
} from '../controllers/owner'

import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

router.get('/', verifyAuth, findOwners)
router.post('/', createOwner)
router.get('/:ownerId', findOwner)
router.patch('/:ownerId', updateOwner)
router.delete('/:ownerId', deleteOwner)

export default router
