const service = require("../reservations/reservations.service");

async function reservationIdExists(req, res, next) {
  const reservation = await service.read(req.params.reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({
    status: 400,
    message: "reservation_id does not exist",
  });
}

module.exports = reservationIdExists;
