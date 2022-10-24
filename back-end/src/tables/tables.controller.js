/**
 * List handler for reservation resources
 */

 const service = require("./tables.service");
 const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
 const hasOnlyValidProperties = require("../validations/hasOnlyValidProperties");
 const hasProperties = require("../validations/hasProperties");
 const tableIdExists = require("../validations/tableIdExists");
 const reservationIdExists = require("../validations/reservationIdExists")

 // validations
 const REQUIRED_PROPERTIES = [
   "table_name",
   "capacity"
 ];

 const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES)
 
 function hasValidValues(req, res, next){
   const { table_name, capacity } = req.body.data;
 
   if(table_name.length < 2){
     return next({
       status: 400,
       message: "table_name must have at least 2 characters"
     })
   }
   if(capacity < 1){
     return next({
       status: 400,
       message: "capacity must be at least 1"
     })
   }
   next()
 }
 
 // functions to list, create, and update
 async function list(req, res) {
   const tables = await service.list(req.query.date);
   res.json({ data: tables });
 }
 
 async function create(req, res) {
   const table = await service.create(req.body.data);
   res.status(201).json({ data: table });
 }

 async function update(req, res){
  const table = await service.create(req.body.data);
  res.status(201).json({ data: table})
 }
 
 module.exports = {
   list: [asyncErrorBoundary(list)],
   create: [hasOnlyValidProperties, hasRequiredProperties, hasValidValues, asyncErrorBoundary(create)],
   update: [tableIdExists, asyncErrorBoundary(reservationIdExists), asyncErrorBoundary(update)]
 };
 