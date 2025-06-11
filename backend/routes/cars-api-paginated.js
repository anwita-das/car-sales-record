import express from 'express';
import Car from '../sequelize/models/car.js';
import { Op } from 'sequelize';

const router = express.Router();

// GET paginated, sorted, and filtered cars
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'id';
    const order = req.query.order === 'desc' ? 'DESC' : 'ASC';

    const filters = {};
    if (req.query.make) filters.make = req.query.make;
    if (req.query.fuel) filters.fuel = req.query.fuel;
    if (req.query.transmission) filters.transmission = req.query.transmission;

    const { count, rows } = await Car.findAndCountAll({
      where: filters,
      order: [[sortBy, order]],
      limit,
      offset,
    });

    res.json({
      data: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
