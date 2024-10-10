const express = require("express");
const router = express();
const controller = require('./controller');

router.get('/getproducts',controller.getproduct);
router.put('/updateProduct',controller.updateProduct);

router.put('/getImage/:folderid/:fileid')




module.exports = router;