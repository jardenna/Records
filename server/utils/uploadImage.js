import multer from 'multer';
import path from 'path';

const fileSize = 1 * 1000 * 1000;

//Global error message
export const errorMsg = (error, res) => {
  res.status(500).json({
    error,
  });
};

//Storage
const storage = multer.diskStorage({
  destination: './public/images/uploads',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

const uploadImage = multer({
  storage: storage,
  limits: { fileSize },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|webp|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error('Images Only!'));
  }
}

export default uploadImage;
