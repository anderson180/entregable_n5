const { getAll, create, getOne, remove, update } = require('../controllers/actor.controllers');
const express = require('express');

const routerActor = express.Router();

routerActor.route('/')// /api/v1/actors => No Dinamico
    .get(getAll)
    .post(create);

routerActor.route('/:id')// /api/v1/actors/ => Dinamico
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerActor;