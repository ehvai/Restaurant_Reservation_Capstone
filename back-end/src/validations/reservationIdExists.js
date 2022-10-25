const service = require("../reservations/reservations.service");

async function reservationIdExists(req, res, next) {
  const resId = (req.params.reservation_id !=null ? req.params.reservation_id : req.body.data.reservation_id)
  const reservation = await service.read(resId);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({
    status: 404,
    message: "999",
  });
}

module.exports = reservationIdExists;
