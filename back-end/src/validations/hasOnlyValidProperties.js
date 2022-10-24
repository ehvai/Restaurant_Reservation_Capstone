function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;
    const invalidStatuses = Object.keys(data).filter(
      (field) => !REQUIRED_PROPERTIES.includes(field)
    );
    if (invalidStatuses.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidStatuses.join(", ")}`,
      });
    }
    next();
  }

  module.exports = hasOnlyValidProperties;