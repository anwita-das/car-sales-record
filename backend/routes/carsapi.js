import express from 'express';
import Car from '../sequelize/models/car.js';
import sequelize from '../sequelize/sequelize.js';
import { Op } from 'sequelize';


const router = express.Router();

// GET all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new car
router.post('/', async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json({id: car.id});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT to update a car by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Car.update(req.body, {
      where: {id:req.params.id},
    });
    res.json({ message: 'Car updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a car by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Car.destroy({ where: { id: req.params.id } });
    res.json({ message: deleted ? 'Car deleted successfully' : 'Car not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/sales/year', async (req,res) => {
  try {
    const rows = await Car.findAll({
      attributes: ['year', [sequelize.fn('COUNT', sequelize.col('year')), 'count']],
      group: ['year'],
      order: [['year', 'ASC']],
    });
    res.json(rows);
  } catch(err) {
    res.status(500).json({error: err.message});
  }
});

router.get('/make-sales', async (req, res) => {
  try {
    const rows = await Car.findAll({
      attributes: ['make', [sequelize.fn('COUNT', sequelize.col('make')), 'count']],
      group: ['make'],
    });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/fuel-sales', async (req, res) => {
  try {
    const rows = await Car.findAll({
      attributes: ['fuel', [sequelize.fn('COUNT', sequelize.col('fuel')), 'count']],
      group: ['fuel'],
    });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/transmission-sales', async (req, res) => {
  try {
    const rows = await Car.findAll({
      attributes: ['transmission', [sequelize.fn('COUNT', sequelize.col('transmission')), 'count']],
      group: ['transmission'],
    });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/summary-stats', async (req, res) => {
  try {
    const totalCars = await Car.count();
    const avgPrice = await Car.findOne({
      attributes: [[sequelize.fn('AVG', sequelize.col('price')), 'avgPrice']],
    });
    const commonMake = await Car.findOne({
      attributes: ['make', [sequelize.fn('COUNT', sequelize.col('make')), 'count']],
      group: ['make'],
      order: [[sequelize.fn('COUNT', sequelize.col('make')), 'DESC']],
      limit: 1,
    });
    const popularYear = await Car.findOne({
      attributes: ['year', [sequelize.fn('COUNT', sequelize.col('year')), 'count']],
      group: ['year'],
      order: [[sequelize.fn('COUNT', sequelize.col('year')), 'DESC']],
      limit: 1,
    });

    res.json({
      totalCars,
      avgPrice: Math.round(parseFloat(avgPrice.dataValues.avgPrice)),
      commonMake: commonMake?.dataValues.make || null,
      popularYear: popularYear?.dataValues.year || null,
    });
  } catch (err) {
    console.error('Error fetching summary stats:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET a car by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
