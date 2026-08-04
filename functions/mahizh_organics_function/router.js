const express = require("express");
const router = express();
const controller = require('./controller');

router.get('/getproducts', controller.getproduct);
router.put('/updateProduct', controller.updateProduct);

// Support both GET and PUT for downloading/retrieving image files, mapped to the getImage controller
router.get('/getImage/:folderid/:fileid', controller.getImage);
router.put('/getImage/:folderid/:fileid', controller.getImage);

module.exports = router;
