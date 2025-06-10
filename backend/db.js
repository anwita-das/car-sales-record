import cars from '../src/data/cars.js';
import pool from './pool.js';

async function seedCars() {
  const connection = await pool.getConnection();

  try {
    for (const car of cars) {
      const {
        make, model, year, mileage, price,
        fuel, color, transmission, features,
        condition, accident
      } = car;

      await connection.execute(
        `INSERT INTO cars (make, model, year, mileage, price, fuel, color, transmission, features, car_condition, accident)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [make, model, year, mileage, price, fuel, color, transmission, features, condition, accident]
      );
    }

    console.log('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    connection.release();
  }
}

seedCars().catch(console.error);
