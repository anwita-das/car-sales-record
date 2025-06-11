import express from 'express';
import cors from 'cors';
import carsRouter from './routes/carsapi.js';
import carsPaginatedRouter from './routes/cars-api-paginated.js'; 
import uploadRouter from './routes/upload.js';

import sequelize from './sequelize/sequelize.js';
import './sequelize/models/car.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use('/api', uploadRouter);

app.use('/api/cars', carsRouter);
app.use('/api/cars-paginated', carsPaginatedRouter);

sequelize.sync().then(() => {
  console.log('✅ Sequelize models synced');
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});