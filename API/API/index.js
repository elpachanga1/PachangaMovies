//archivo principal de la aplicacion
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");

const config = require("../config.js");
const swaggerDoc = require("./documentation.json");
const user = require("./Components/User/network");
const comment = require("./Components/Comments/network");
const errors = require("../Network/errors");

const app = express();

app.use(bodyParser.json());

app.use("/api/user", user);
app.use("/api/comment", comment);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc)); //linea para importar la documentacion de swagger
app.use(errors); //siempre debe ser el ultimo

app.listen(config.api.port, () => {
  console.log("API escuchando en el puerto " + config.api.port);
});
