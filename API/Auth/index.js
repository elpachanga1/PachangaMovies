const jwt = require("jsonwebtoken");
const config = require("../config");
const moment = require("moment");
const error = require("../Utils/error");

const secret = config.jwt.secret;

function signature(data) {
  return jwt.sign(data, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);

    if (decoded.id !== owner) {
      throw error("No se puede editar registro", 401);
    } else if (moment().isAfter(decoded.expirationDateTime)) {
      throw error("Token Vencido", 401);
    }
  },
  logged: function (req) {
    const decoded = decodeHeader(req);

    if (moment().isAfter(decoded.expirationDateTime)) {
      throw error("Token Vencido", 401);
    }

    console.log(decoded);
  },
};

function getToken(auth) {
  if (!auth) {
    throw error("no llego token", 401);
  }

  if (auth.indexOf("Bearer ") === -1) {
    throw error("formato no valido", 401);
  }

  let token = auth.replace("Bearer ", "");
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;
  return decoded;
}

module.exports = {
  signature,
  check,
};
