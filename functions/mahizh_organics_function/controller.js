var catalyst = require('zcatalyst-sdk-node');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

exports.getproduct = async (req, res) => {

    var app = catalyst.initialize(req);
    let zcql = app.zcql();

    let offset = 1;
    let value = 200;
    let allProducts = [];

    let TABLE_NAME = "Products"
    let countquery = 'SELECT COUNT(ROWID) FROM Products'
    //// getting product count ///
    let CountData = await zcql.executeZCQLQuery(countquery);
    const rowCount = CountData[0].Products["COUNT(ROWID)"];

    const loopCount = Math.ceil(rowCount / value);
    
    for (let loopingCount = 1; loopingCount <= loopCount; loopingCount++) {
        const query = `SELECT * FROM ${TABLE_NAME} LIMIT ${offset}, ${value}`;
        const getProducts = await zcql.executeZCQLQuery(query);
        allProducts = allProducts.concat(getProducts);
        offset += value;
    }
    res.send(allProducts);

},

///////////// updating the product /////////////

exports.updateProduct = async (req, res) => {
    try {
        // SECURITY: Initialize Catalyst app per request context to avoid reference errors
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const table = datastore.table('Products');

        const updatedRow = await table.updateRow(req.body);
        return res.status(200).send({ status: 'success', data: updatedRow });
    } catch (error) {
        // SECURITY: Secure error handling prevents leaking internal stack traces / implementation details
        console.error('Error updating product:', error);
        return res.status(500).send({ status: 'error', message: 'Internal server error' });
    }
},

///////// getimage //////////

exports.getImage = (req,res)=>{

         let filestore = app.filestore(); 
        let folder = filestore.folder(req.parms.folderid); 
        let downloadPromise = folder.downloadFile(req.params.fileid); 
        downloadPromise.then((fileObject) => 
        { 
        console.log(fileObject); 
              fileObject.pipe(res);
        });

}



