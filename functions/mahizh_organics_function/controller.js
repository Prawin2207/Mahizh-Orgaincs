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

        if (!CountData || !CountData[0] || !CountData[0].Products) {
            return res.status(200).json([]);
        }

        const rowCount = CountData[0].Products["COUNT(ROWID)"];
        const loopCount = Math.ceil(rowCount / value);

        for (let loopingCount = 1; loopingCount <= loopCount; loopingCount++) {
            const query = `SELECT * FROM ${TABLE_NAME} LIMIT ${offset}, ${value}`;
            const getProducts = await zcql.executeZCQLQuery(query);
            allProducts = allProducts.concat(getProducts);
            offset += value;
        }
        res.status(200).json(allProducts);
    } catch (err) {
        console.error("Error in getproduct:", err);
        res.status(500).json({ error: "Failed to retrieve products" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ error: "Invalid request payload" });
        }

        let datastore = app.datastore();
        let table = datastore.table('Products');
        let row = await table.updateRow(req.body);
        res.status(200).json({ status: "success", data: row });
    } catch (err) {
        console.error("Error in updateProduct:", err);
        res.status(500).json({ error: "Failed to update product" });
    }
};

exports.getImage = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        const { folderid, fileid } = req.params;

        if (!folderid || !fileid) {
            return res.status(400).json({ error: "Missing folderid or fileid parameter" });
        }

        let filestore = app.filestore();
        let folder = filestore.folder(folderid);
        let fileObject = await folder.downloadFile(fileid);

        fileObject.pipe(res);
    } catch (err) {
        console.error("Error in getImage:", err);
        res.status(500).json({ error: "Failed to download file" });
    }
};
