import { Address, Ride, Stop, User } from '../models/index.mjs';

export default {
  list: async (req, res) => {
    const trips = await Ride.findAll({
      include: [
        User,
        {
          model: Stop,
          include: [Address],
        },
      ],
    });

    res.json({ trips });
  },
  read: async (req, res) => {
    res.json({ trip: req.trip });
  },
  get: async (req, res, next, tripId) => {
    await Ride.findByPk(tripId, {
      include: [
        User,
        {
          model: Stop,
          include: [Address],
        },
      ],
    })
      .then((trip) => {
        if (!trip) {
          res.status(404).json({
            message: 'Not Found',
          });
        }
        req.trip = trip;
        next();
      })
      .catch((err) => next(err));
  },
};
