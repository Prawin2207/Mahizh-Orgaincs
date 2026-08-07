const express = require("express");
const router = express.Router(); // Using express.Router() is the standard secure way to define routing
const controller = require('./controller');

router.get('/getproducts', controller.getproduct);
router.put('/updateProduct', controller.updateProduct);

// Correctly bind getImage route to the controller.getImage handler using GET (standard for retrieval)
router.get('/getImage/:folderid/:fileid', controller.getImage);

module.exports = router;
