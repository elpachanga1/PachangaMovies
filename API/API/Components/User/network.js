//archivo de configuracion de capa de red
const express = require("express");

const secure = require("../../../Auth/secure");
const Controller = require("./index");
const response = require("../../../Network/response");

const router = express.Router();

//Routes
router.get("/", list);
router.get("/:id", get);
router.post("/follow/:id", secure("create"), follow);
router.get("/:id/following", following);
router.post("/", insert);
router.put("/", secure("update"), update);
router.post("/login", login);

//internal functions
function list(req, res, next) {
  Controller.list()
    .then((lista) => response.success(req, res, lista, 200))
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((user) => response.success(req, res, user, 200))
    .catch(next);
}

function insert(req, res, next) {
  Controller.insert(req.body)
    .then((user) => response.success(req, res, user, 200))
    .catch(next);
}

function update(req, res, next) {
  Controller.update(req.body)
    .then((user) => response.success(req, res, user, 200))
    .catch(next);
}

function follow(req, res, next) {
  Controller.follow(req.user.id, req.params.id)
    .then((data) => response.success(req, res, data, 201))
    .catch(next);
}

function following(req, res, next) {
  Controller.following(req.params.id)
    .then((data) => response.success(req, res, data, 201))
    .catch(next);
}

function login(req, res) {
  Controller.login(req.body.username, req.body.password)
    .then((token) => response.success(req, res, token, 200))
    .catch(() => response.error(req, res, "Informacion invalida", 400));
}

module.exports = router;
