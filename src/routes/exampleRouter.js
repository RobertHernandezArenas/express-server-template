"use strict";

const {exampleControllerCreate} = require("../controllers");
const routerx = require("express-promise-router");
const router = routerx();

router.post("/create", exampleControllerCreate);

module.exports = router;
