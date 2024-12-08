const paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    const sortField = req.query.sortField || 'date';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const filters = {};
    if (req.query.artist) {
      filters.artist = { $regex: req.query.artist, $options: 'i' }; // Case-insensitive match
    }
    if (req.query.title) {
      filters.title = { $regex: req.query.title, $options: 'i' };
    }

    const results = {};

    try {
      // Count documents matching the filters
      const totalRecords = await model.countDocuments(filters).exec();

      results.recordsCount = totalRecords;
      results.results = await model
        .find(filters)
        .sort([[sortField, sortOrder]])
        .limit(limit)
        .skip(startIndex)
        .exec();

      // Update pagination based on the filtered totalRecords
      if (startIndex + limit < totalRecords) {
        results.next = { page: page + 1, limit };
      }
      if (startIndex > 0) {
        results.previous = { page: page - 1, limit };
      }

      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

export default paginatedResults;
