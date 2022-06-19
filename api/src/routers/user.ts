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

router.get('/', verifyAuth, viewUsers)
router.post('/', verifyAuth, createUser)
router.get('/:userId', verifyAuth, viewUser)
router.patch('/:userId', verifyAuth, updateUser)
router.delete('/:userId', verifyAuth, deleteUser)

export default router
