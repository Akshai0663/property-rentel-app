const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // ❌ VULNERABLE: Keeps original name (e.g. xss.html)
  }
});

const upload = multer({ storage });

// ✅ ROUTE IS '/' NOT '/upload'
// ✅ FIELD NAME IS 'file'
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json({
    message: 'Upload successful',
    file: `/uploads/${req.file.filename}`
  });
});

module.exports = router;
