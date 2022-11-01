const service = require("../reservations/reservations.service");

async function reservationIdExists(req, res, next) {
  const resId = req.body.data.reservation_id
  const reservation = await service.read(resId);

  if (reservation) {
    res.locals.reservation =  reservation;
    return next();
  }
  return next({
    status: 404,
    message: `${req.body.data.reservation_id} not found`,
  });
}

module.exports = reservationIdExists;
