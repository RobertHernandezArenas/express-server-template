'use strict';

const routerx = require('express-promise-router');
const exampleRouter = require('./exampleRouter');
const router = routerx();

// Aqui van las rutas de vuestro proyecto
router.use('/example', exampleRouter);
module.exports = router;