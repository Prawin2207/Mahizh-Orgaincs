var catalyst = require('zcatalyst-sdk-node');

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
        const rowCount = CountData[0]?.Products?.["COUNT(ROWID)"] || 0;

        const loopCount = Math.ceil(rowCount / value);

        for (let loopingCount = 1; loopingCount <= loopCount; loopingCount++) {
            const query = `SELECT * FROM ${TABLE_NAME} LIMIT ${offset}, ${value}`;
            const getProducts = await zcql.executeZCQLQuery(query);
            allProducts = allProducts.concat(getProducts);
            offset += value;
        }
        res.status(200).send(allProducts);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch products" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: "Invalid product data payload" });
        }
        let datastore = app.datastore();
        let table = datastore.table('Products');
        let updatedRow = await table.updateRow(req.body);
        res.status(200).send(updatedRow);
    } catch (error) {
        res.status(500).send({ error: "Failed to update product" });
    }
};

exports.getImage = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        const { folderid, fileid } = req.params;
        if (!folderid || !fileid) {
            return res.status(400).send({ error: "Missing required folderid or fileid parameters" });
        }
        let filestore = app.filestore();
        let folder = filestore.folder(folderid);
        let fileObject = await folder.downloadFile(fileid);
        fileObject.pipe(res);
    } catch (error) {
        res.status(500).send({ error: "Failed to download image" });
    }
};
