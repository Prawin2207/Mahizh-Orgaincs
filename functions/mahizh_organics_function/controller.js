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

};

///////////// updating the product /////////////

exports.updateProduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const table = datastore.table('Products');
        const updatedRow = await table.updateRow(req.body);
        res.status(200).send(updatedRow);
    } catch (error) {
        // Log error internally and fail securely without leaking error stack trace
        console.error('Error updating product:', error);
        res.status(500).send({ error: 'Failed to update product' });
    }
};

///////// getimage //////////

exports.getImage = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const filestore = app.filestore();
        const folder = filestore.folder(req.params.folderid);
        const fileObject = await folder.downloadFile(req.params.fileid);
        fileObject.pipe(res);
    } catch (error) {
        // Log error internally and fail securely without leaking error stack trace
        console.error('Error getting image:', error);
        res.status(500).send({ error: 'Failed to retrieve image' });
    }
};



