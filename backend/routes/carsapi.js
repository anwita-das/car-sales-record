import express from 'express';
import pool from '../pool.js';

const router = express.Router();

// GET all cars
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cars');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new car
router.post('/', async (req, res) => {
  const {
    make, model, year, mileage, price,
    fuel, color, transmission, features,
    condition, accident, receiptImage
  } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO cars (make, model, year, mileage, price, fuel, color, transmission, features, car_condition, accident, receipt_image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [make, model, year, mileage, price, fuel, color, transmission, features, condition, accident, receiptImage]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT to update a car by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    make, model, year, mileage, price,
    fuel, color, transmission, features,
    condition, accident
  } = req.body;

  try {
    await pool.query(
      `UPDATE cars SET make = ?, model = ?, year = ?, mileage = ?, price = ?, fuel = ?, color = ?, transmission = ?, features = ?, car_condition = ?, accident = ? WHERE id = ?`,
      [make, model, year, mileage, price, fuel, color, transmission, features, condition, accident, id]
    );

    res.json({ message: 'Car updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a car by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM cars WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/sales/year', async (req,res) => {
  try {
    const [rows] = await pool.query(
      'SELECT year, COUNT(*) as count FROM cars GROUP BY year ORDER BY year ASC'
    );
    res.json(rows);
  } catch(err) {
    res.status(500).json({error: err.message});
  }
});

router.get('/make-sales', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT make, COUNT(*) as count FROM cars GROUP BY make'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/fuel-sales', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT fuel, COUNT(*) as count FROM cars GROUP BY fuel'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/transmission-sales', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT transmission, COUNT(*) as count FROM cars GROUP BY transmission'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/summary-stats', async (req, res) => {
  try {
    const [totalCars] = await pool.query('SELECT COUNT(*) AS total FROM cars');
    const [avgPrice] = await pool.query('SELECT AVG(price) AS avgPrice FROM cars');
    const [commonMake] = await pool.query(`
      SELECT make, COUNT(*) as count 
      FROM cars 
      GROUP BY make 
      ORDER BY count DESC 
      LIMIT 1
    `);
    const [popularYear] = await pool.query(`
      SELECT year, COUNT(*) as count 
      FROM cars 
      GROUP BY year 
      ORDER BY count DESC 
      LIMIT 1
    `);

    res.json({
      totalCars: totalCars[0].total,
      avgPrice: Math.round(avgPrice[0].avgPrice),
      commonMake: commonMake[0]?.make || null,
      popularYear: popularYear[0]?.year || null,
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
    const [rows] = await pool.query('SELECT * FROM cars WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
