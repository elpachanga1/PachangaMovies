//componente para seguridad en autenticacion
const auth = require(".");

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "update":
        const owner = req.body.user_id;
        auth.check.own(req, owner);
        next();
        break;
      case "create":
        auth.check.logged(req);
        next();
        break;
      default:
        next();
    }
  }

  return middleware;
};
