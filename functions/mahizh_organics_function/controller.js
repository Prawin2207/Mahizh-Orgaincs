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
        const app = catalyst.initialize(req);
        if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body) || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Invalid product data provided" });
        }

        const datastore = app.datastore();
        const table = datastore.table('Products');
        const updatedRow = await table.updateRow(req.body);
        return res.status(200).json({ success: true, data: updatedRow });
    } catch (error) {
        console.error("Error updating product:", error.message || error);
        return res.status(500).json({ error: "Failed to update product" });
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



