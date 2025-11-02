import multer from 'multer';
import path from 'path';

// 1. Configure Storage
const storage = multer.diskStorage({
  // Set the destination folder for uploads
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Create a unique filename for each file
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// 2. Configure File Filter
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check the extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check the mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true); // Allow file
  } else {
    cb(new Error('Error: Images Only! (jpeg, jpg, png, gif)'), false); // Reject file
  }
}

// 3. Initialize Multer with configurations
export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: { fileSize: 5 * 1024 * 1024 } // Optional: Limit file size to 5MB
});