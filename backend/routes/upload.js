import express from 'express';
import multer from 'multer';

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

export default router;