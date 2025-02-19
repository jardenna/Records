import upload from '../utils/uploadImages.js';

const handleFileUpload = (req, res, next) => {
  upload.single('cover')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

export default handleFileUpload;
