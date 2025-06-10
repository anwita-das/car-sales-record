import express from 'express';
import pool from '../pool.js';

const router = express.Router();

const allowedSortFields = ['price', 'year', 'make', 'model'];
const allowedSortDirections = ['ASC', 'DESC'];

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const offset = (page - 1) * limit;
  const search = req.query.search?.trim() || '';

  const sortQuery = req.query.sort?.trim() || '';
  let orderByClause = '';

  // Sort validation
  if (sortQuery) {
    const [field, direction] = sortQuery.split('-');
    if (
      allowedSortFields.includes(field.toLowerCase()) &&
      allowedSortDirections.includes(direction.toUpperCase())
    ) {
      orderByClause = `ORDER BY ${field} ${direction.toUpperCase()}`;
    }
  }

  try {
    // Data fetch
    const [cars] = await pool.query(
      `
        SELECT * FROM cars
        WHERE make LIKE ? OR model LIKE ?
        ${orderByClause}
        LIMIT ? OFFSET ?
      `,
      [`%${search}%`, `%${search}%`, limit, offset]
    );

    // Total count
    const [countResult] = await pool.query(
      `
        SELECT COUNT(*) AS total FROM cars
        WHERE make LIKE ? OR model LIKE ?
      `,
      [`%${search}%`, `%${search}%`]
    );

    res.json({ cars, total: countResult[0].total });
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
