import express from 'express'

import verifyAuth from '../middlewares/verifyAuth'

import {
  createUser,
  viewUser,
  deleteUser,
  updateUser,
  viewUsers,
} from '../controllers/user'

const router = express.Router()

router.get('/', viewUsers)
router.post('/', createUser)
router.get('/:userId', viewUser)
router.patch('/:userId', verifyAuth, updateUser)
router.delete('/:userId', deleteUser)

export default router
