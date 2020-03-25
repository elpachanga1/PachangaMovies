//archivo de configuracion de capa de red
const express = require("express");

const Controller = require("./index");
const response = require("../../../Network/response");

const router = express.Router();

const secure = require("../../../Auth/secure");

//Routes
router.get("/", list);
router.get("/movie/:id", getPerMovie);
router.post("/", secure("create"), upsert);
router.put("/", secure("update"), upsert);
router.delete("/:id", secure("create"), remove);

function list(req, res, next) {
  Controller.list()
    .then(lista => response.success(req, res, lista, 200))
    .catch(next);
}

function getPerMovie(req, res, next) {
  Controller.getPerMovie(req.params.id)
    .then(lista => response.success(req, res, lista, 200))
    .catch(next);
}

function upsert(req, res, next) {
  Controller.upsert({ ...req.body, user_id: req.user.id })
    .then(comment => response.success(req, res, comment, 200))
    .catch(next);
}

function remove(req, res, next) {
  Controller.remove(req.params.id)
    .then(comment => response.success(req, res, comment, 200))
    .catch(next);
}

module.exports = router;
