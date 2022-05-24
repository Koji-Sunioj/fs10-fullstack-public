import express from 'express'

import { createUser, findAll } from '../controllers/user'

const router = express.Router()

router.get('/', findAll)
router.post('/', createUser)

export default router
