import express from 'express';
import cors from 'cors';
import carsRouter from './routes/carsapi.js';
import carsPaginatedRouter from './routes/cars-api-paginated.js'; 
import uploadRouter from './routes/upload.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads')); // To serve uploaded files
app.use('/api', uploadRouter); // Route for handling uploads

app.use('/api/cars', carsRouter);
app.use('/api/cars-paginated', carsPaginatedRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
