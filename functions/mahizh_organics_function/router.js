const express = require("express");
const router = express.Router();
const controller = require('./controller');

router.get('/getproducts', controller.getproduct);
router.put('/updateProduct', controller.updateProduct);
router.get('/getImage/:folderid/:fileid', controller.getImage);

module.exports = router;