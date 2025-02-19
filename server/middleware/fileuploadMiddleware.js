import uploadImage from '../utils/uploadImage.js';

const handleFileUpload = (req, res, next) => {
  uploadImage.single('cover')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res
          .status(400)
          .json({ message: 'File size exceeds 1MB limit.' });
      }
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

export default handleFileUpload;
