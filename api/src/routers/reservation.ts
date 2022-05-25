import express from 'express'

import {
  createReservation,
  findReservations,
  findReservation,
  deleteReservation,
  updateReservation,
} from '../controllers/reservation'

const router = express.Router()

router.get('/', findReservations)
router.post('/', createReservation)
router.get('/:reservationId', findReservation)
router.delete('/:reservationId', deleteReservation)
router.patch('/:reservationId', updateReservation)

export default router
