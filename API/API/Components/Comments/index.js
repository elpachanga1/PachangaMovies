const store = require("../../../Store/postgres");
const ctrl = require("./controller");

module.exports = ctrl(store);
