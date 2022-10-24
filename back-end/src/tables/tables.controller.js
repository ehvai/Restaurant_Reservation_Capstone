/**
 * List handler for reservation resources
 */

 const service = require("./tables.service");
 const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
 
 const REQUIRED_PROPERTIES = [
   "table_name",
   "capacity"
 ];
 
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
 
 function hasProperties(properties) {
   return function (req, res, next) {
     const { data = {} } = req.body;
 
     try {
       properties.forEach((property) => {
         if (!data[property]) {
           const error = new Error(`A '${property}' property is required.`);
           error.status = 400;
           throw error;
         }
       });
       next();
     } catch (error) {
       next(error);
     }
   };
 }
 
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
 }
 
 async function list(req, res) {
   const tables = await service.list(req.query.date);
   res.json({ data: tables });
 }
 
 async function create(req, res) {
   const table = await service.create(req.body.data);
   res.status(201).json({ data: table });
 }
 
 module.exports = {
   list: [asyncErrorBoundary(list)],
   create: [hasOnlyValidProperties, hasRequiredProperties, hasValidValues, asyncErrorBoundary(create)],
 };
 