const service = require("../tables/tables.service");

async function tableIdExists(req, res, next) {
  const tableId = (req.params.table_id !=null ? req.params.table_id : req.body.data.table_id)
  const tables = await service.read(tableId);

  if (tables) {
    res.locals.tables = tables;
    return next();
  }
  return next({
    status: 400,
    message: "table_id does not exist",
  });
}

module.exports = tableIdExists;
