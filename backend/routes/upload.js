import express from 'express';
import multer from 'multer';
import fs from 'fs';
import xlsx from 'xlsx';
import Car from '../sequelize/models/car.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({storage});

router.post('/upload', upload.single('receipt'), (req,res) => {
    if(!req.file) return res.status(400).json({ error: 'No file uploaded' });

    res.json({
        filePath: `/uploads/${req.file.filename}`,
        fileName: req.file.filename
    });
});

// Excel upload route
router.post('/upload-excel', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = xlsx.utils.sheet_to_json(sheet);

    // Normalize keys to lowercase
    const data = rawData.map((row) => {
      const normalized = {};
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          normalized[key.toLowerCase()] = row[key];
        }
      }
      return normalized;
    });

    for (const row of data) {
      await Car.create({
        make: row.make,
        model: row.model,
        year: row.year,
        mileage: row.mileage,
        price: row.price,
        fuel: row.fuel,
        color: row.color,
        transmission: row.transmission,
        features: row.features,
        car_condition: row.car_condition,
        accident: row.accident,
        receipt_image: row.receipt_image,
      });
    }

    fs.unlinkSync(req.file.path); // delete uploaded Excel file after processing

    res.status(200).json({ message: 'Excel uploaded and data inserted successfully.' });
  } catch (err) {
    console.error('Excel upload error:', err);
    res.status(500).json({ error: 'Failed to process Excel file.' });
  }
});

export default router;
