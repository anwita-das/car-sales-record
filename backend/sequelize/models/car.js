import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Car = sequelize.define('Car', {
  make: DataTypes.STRING,
  model: DataTypes.STRING,
  year: DataTypes.INTEGER,
  mileage: DataTypes.INTEGER,
  price: DataTypes.DECIMAL(10, 3),
  fuel: DataTypes.STRING,
  color: DataTypes.STRING,
  transmission: DataTypes.STRING,
  features: DataTypes.TEXT,
  car_condition: DataTypes.STRING,
  accident: DataTypes.STRING,
  receipt_image: DataTypes.STRING,
}, {
  tableName: 'cars',
  timestamps: false,
});

export default Car;
