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
router.post('/', verifyAuth, createUser)
router.get('/:userId', viewUser)
router.patch('/:userId', verifyAuth, updateUser)
router.delete('/:userId', verifyAuth, deleteUser)

export default router
