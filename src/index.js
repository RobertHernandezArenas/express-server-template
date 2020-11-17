"use strict";

//////////////// Modulos a usar /////////////////////////
// Variables de entorno
require("dotenv").config();
const { PORT, APP_ENV, NODE_ENV } = process.env;

// Framework con el que manejaremos node
const express = require("express");

// Router de la app
const router = require("./routes");

// Modulo del middleware con el que convertiremos los datos de las peticiones a json
const bodyParser = require("body-parser");

// Modulo que se encarga de asegurarnos de crear el path correcto en nuestra app
const path = require("path");

// Modulo que nos permitira subir archivos a nuestra api
const fileUpload = require("express-fileupload");

console.log("FROM APP_ENV::::>", APP_ENV, "FROM NODE_ENV:::::>", NODE_ENV);
// Conexión a la base de datos
////////////////////////////////
// Aqui modulo base de datos //
///////////////////////////////

// app de express
const app = express();

// Log de todas las peticiones que se realiza a la API con su respectivo estatus
const morgan = require("morgan");

// Permite todos los verbos de las peticiones a la API sin ningguna restricción
const cors = require("cors");

app.use(morgan("dev"));
app.use(cors());

/////////////////// MIDDLEWARES //////////////////////////
// Body Parser transforma en json la estructura de datos que recibe de la peticion automaticamente
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Carpeta donde se alojaran todos los archivos publicos de la api
const publicFolder = path.join(__dirname, `../public`);
app.use(express.static(publicFolder));

// Modulo que permite subir archivos a la api
app.use(fileUpload());

// Modulo controlador de las rutas de la api
app.use("/", router);

// MIDDLEWARE CONTROLADOR DE ERRORES
//Errores previos a Middleware llegan aqui
app.use((error, request, response, next) => {
  console.log(error);
  response.status(error.httpCode || 500).send({
    message: error.message,
  });
  next();
});

// Middleware not found
app.use((request, response, next) => {
  response.status(404).send({
    message: "❌ Page not found!😢",
  });
  next();
});

//////////////// SERVER //////////////////////
// Configuracion puertos server
app.set("port", PORT || 3002);
const port = app.get("port");
app.listen(port, () => {
  console.log(`✔️ 🚀 >>>> Server working on PORT ${port}  <<<< 🚀 ✔️`);
});
