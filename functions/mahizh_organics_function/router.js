const express = require("express");
const router = express();
const controller = require('./controller');

router.post('/',controller.createProduct);
// router.get('/getdata',controller.getdata);

module.exports = router;