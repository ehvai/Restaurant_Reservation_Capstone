const knex = require("../db/connection")

function list(date){
    return knex("reservations")
    .select("*")
    .where("reservation_date", date)
    .orderBy("reservation_time")
}

function create(reservation){
    return knex("reservations")
    .insert(reservation, "*")
    .then(createdReservation => createdReservation[0])
}

function read(reservation_id){
    return knex("reservations")
    .select("*")
    .where({reservation_id})
    .first();
}

function setStatus(reservation_id, status){
    return knex("reservations")
    .where({reservation_id})
    .update("status", status)
    .returning("*")
    .then(updatedStatus => updatedStatus[0])
}

module.exports = {
    list,
    create,
    read,
    setStatus,
}