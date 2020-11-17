"use strict";
// Modulos requeridos

const exampleControllerCreate = async (request, response, next) => {
  try {
    response.send("Controller create example");
  } catch (error) {
    next(error);
  }
};
module.exports = exampleControllerCreate;
