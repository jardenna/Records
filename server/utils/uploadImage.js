import multer from 'multer';
import path from 'path';

import { t } from './translator.js';

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
const fileSize = 1 * 1000 * 1000;
const uploadImage = multer({
  storage: storage,
  limits: { fileSize },
  fileFilter: (req, file, cb) => {
    checkFileType(req, file, cb);
  },
});

// Check File Type
function checkFileType(req, file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|webp|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  const fileName = file.originalname;
  const splitFileName = fileName.split('.')[1];

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(
      new Error(
        `${fileName} ${t('notBeUploaded', req.lang)}. .${splitFileName} ${t('unsupportedFile', req.lang)}  . ${t('allowedFormats', req.lang)}: JPEG, JPG, PNG, WEBP, GIF.`,
      ),
    );
  }
}

export default uploadImage;
