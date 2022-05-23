import express from 'express'

import {
  createName,
  findAll,
  findById,
  replaceByID,
  deleteByID,
  updateByID,
} from '../controllers/testcontroller'

const router = express.Router()

router.get('/', findAll)
router.post('/', createName)
router.get('/:testId', findById)
router.put('/:testId', replaceByID)
router.delete('/:testId', deleteByID)
router.patch('/:testId', updateByID)

export default router
