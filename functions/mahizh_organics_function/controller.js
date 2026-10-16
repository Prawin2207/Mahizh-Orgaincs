var catalyst = require('zcatalyst-sdk-node');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.getproduct = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        let zcql = app.zcql();

        let offset = 1;
        let value = 200;
        let allProducts = [];

        let TABLE_NAME = "Products";
        let countquery = 'SELECT COUNT(ROWID) FROM Products';
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
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ error: "Failed to fetch products" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).send({ error: "Invalid request payload" });
        }
        var app = catalyst.initialize(req);
        let datastore = app.datastore();
        let table = datastore.table('Products');
        let row = await table.updateRow(req.body);
        res.send(row);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send({ error: "Failed to update product" });
    }
};

exports.getImage = async (req, res) => {
    try {
        const { folderid, fileid } = req.params || {};
        if (!folderid || !fileid) {
            return res.status(400).send({ error: "Missing folderid or fileid parameters" });
        }
        var app = catalyst.initialize(req);
        let filestore = app.filestore();
        let folder = filestore.folder(folderid);
        let fileObject = await folder.downloadFile(fileid);
        fileObject.pipe(res);
    } catch (error) {
        console.error("Error downloading file:", error);
        if (!res.headersSent) {
            res.status(500).send({ error: "Failed to download image" });
        }
    }
};
