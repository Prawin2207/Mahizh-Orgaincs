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
        const rowCount = CountData[0].Products["COUNT(ROWID)"];

        const loopCount = Math.ceil(rowCount / value);

        for (let loopingCount = 1; loopingCount <= loopCount; loopingCount++) {
            const query = `SELECT * FROM ${TABLE_NAME} LIMIT ${offset}, ${value}`;
            const getProducts = await zcql.executeZCQLQuery(query);
            allProducts = allProducts.concat(getProducts);
            offset += value;
        }
        res.status(200).send(allProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        if (!req.body || typeof req.body !== 'object' || !req.body.ROWID) {
            return res.status(400).json({ error: "Invalid product update payload" });
        }
        let datastore = app.datastore();
        let table = datastore.table('Products');
        let updatedRow = await table.updateRow(req.body);
        res.status(200).json(updatedRow);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
};

exports.getImage = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        const { folderid, fileid } = req.params;
        if (!folderid || !fileid) {
            return res.status(400).json({ error: "Missing folderid or fileid" });
        }
        let filestore = app.filestore();
        let folder = filestore.folder(folderid);
        let fileObject = await folder.downloadFile(fileid);
        fileObject.pipe(res);
    } catch (error) {
        console.error("Error downloading file:", error);
        res.status(500).json({ error: "Failed to retrieve image" });
    }
};
