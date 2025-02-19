import uploadImage from '../utils/uploadImage.js';

const handleFileUpload = (req, res, next) => {
  uploadImage.single('cover')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

export default handleFileUpload;
