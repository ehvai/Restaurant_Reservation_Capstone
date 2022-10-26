const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function create(table) {
  return knex("tables")
    .insert(table, "*")
    .then((createdTable) => createdTable[0]);
}

function update(table) {
  return knex("tables")
    .update(table, "*")
    .then((updatedTable) => updatedTable[0]);
}

function seated(reservation_id, table_id) {
  return knex("tables")
    .where({ table_id })
    .update({ reservation_id })
    .returning("*")
    .then((updated) => updated[0]);
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function finished(table_id) {
  return knex("tables").where({ table_id }).update({reservation_id: null}).returning("*")
}

module.exports = {
  list,
  create,
  update,
  seated,
  read,
};
