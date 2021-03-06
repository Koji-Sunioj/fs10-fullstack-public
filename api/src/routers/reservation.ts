import express from 'express'
import verifyAuth from '../middlewares/verifyAuth'
import {
  createReservation,
  findReservations,
  findReservation,
  deleteReservation,
  updateReservation,
} from '../controllers/reservation'

const router = express.Router()

router.get('/', findReservations)
router.post('/', verifyAuth, createReservation)
router.get('/:reservationId', verifyAuth, findReservation)
router.delete('/:reservationId', verifyAuth, deleteReservation)
router.patch('/:reservationId', verifyAuth, updateReservation)

export default router
