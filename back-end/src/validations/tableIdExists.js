const service = require("../tables/tables.service");

async function tableIdExists(req, res, next) {
  const tables = await service.read(req.params.table_id);

  if (reservation) {
    res.locals.tables = tables;
    return next();
  }
  return next({
    status: 400,
    message: "table_id does not exist",
  });
}

module.exports = tableIdExists;
