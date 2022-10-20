/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
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
const dateFormat = /^\d\d\d\d-\d\d-\d\d$/;
const timeFormat = /^\d\d:\d\d$/;

function dateIsValid(dateString){
  return dateString.match(dateFormat)?.[0]
}

function timeIsValid(timeString){
  return timeString.match(timeFormat)?.[0]
}

function hasValidValues(req, res, next){
  const { reservation_date, reservation_time, people } = req.body.data;

  if(!timeIsValid(reservation_time)){
    return next({
      status: 400,
      message: "reservation_time must be in HH:MM:ss format"
    })
  }
  if(!dateIsValid(reservation_date)){
    return next({
      status: 400,
      message: "reservation_date must be in YYYY-MM-DD format"
    })
  }
  if(typeof people !== "number"){
    return next({
      status: 400,
      message: "people must be a number"
    })
  }
  if(people < 1){
    return next({
      status: 400,
      message: "# of people must be greater than 1"
    })
  }
 next();
}

async function list(req, res) {
  const reservation = await service.list(req.query.date);
  res.json({ data: reservation });
}

async function create(req, res) {
  const reservation = await service.create(req.body.data);
  res.status(201).json({ data: reservation });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [hasOnlyValidProperties, hasRequiredProperties, hasValidValues, asyncErrorBoundary(create)],
};
