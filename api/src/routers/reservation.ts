import express from 'express'

import { createReservation, findReservations } from '../controllers/reservation'

const router = express.Router()

router.get('/', findReservations)
router.post('/', createReservation)

export default router
