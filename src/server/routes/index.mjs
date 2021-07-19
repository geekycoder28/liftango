import express from 'express';
import tripRoute from './trip.routes.mjs';

const router = express.Router();

router.use('/trip', tripRoute);

export default router;
