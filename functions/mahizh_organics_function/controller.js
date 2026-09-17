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
        // Validate request body and mandatory ROWID to prevent invalid updates / crashes
        if (!req.body || !req.body.ROWID) {
            return res.status(400).send({ error: "Invalid request: ROWID is required" });
        }

        var app = catalyst.initialize(req);
        let datastore = app.datastore();
        let table = datastore.table('Products');
        let updatedRow = await table.updateRow(req.body);
        return res.status(200).send(updatedRow);
    } catch (error) {
        console.error("Failed to update product:", error);
        return res.status(500).send({ error: "Failed to update product" });
    }
},

///////// getimage //////////

exports.getImage = async (req, res) => {
    try {
        const { folderid, fileid } = req.params || {};
        if (!folderid || !fileid) {
            return res.status(400).send({ error: "Folder ID and File ID are required" });
        }

        var app = catalyst.initialize(req);
        let filestore = app.filestore();
        let folder = filestore.folder(folderid);
        let fileObject = await folder.downloadFile(fileid);
        fileObject.pipe(res);
    } catch (error) {
        console.error("Failed to download image:", error);
        return res.status(500).send({ error: "Failed to retrieve image" });
    }
}



