const knex = require("../db/connection")

function list(){
    return knex("tables")
    .select("*")
}

function create(table){
    return knex("tables")
    .insert(table, "*")
    .then(createdTable => createdTable[0])
}

function update(table){
    return knex("tables")
    .update(table, "reservation_id")
    .then(updatedTable => updatedTable[0])
}

module.exports = {
    list,
    create,
    update
}