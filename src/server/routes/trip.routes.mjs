import express from 'express';
import controller from '../controllers/trip.controller.mjs';

const router = express.Router();

router.get('/getTrips', controller.list);
router.get('/:id', controller.read);
router.param('id', controller.get);

export default router;
