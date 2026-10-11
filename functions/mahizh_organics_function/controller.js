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
        const rowCount = CountData && CountData[0] && CountData[0].Products ? CountData[0].Products["COUNT(ROWID)"] : 0;

        const loopCount = Math.ceil(rowCount / value);

        for (let loopingCount = 1; loopingCount <= loopCount; loopingCount++) {
            const query = `SELECT * FROM ${TABLE_NAME} LIMIT ${offset}, ${value}`;
            const getProducts = await zcql.executeZCQLQuery(query);
            allProducts = allProducts.concat(getProducts);
            offset += value;
        }
        res.send(allProducts);
    } catch (err) {
        console.error("Error in getproduct:", err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

///////////// updating the product /////////////

exports.updateProduct = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        let datastore = app.datastore();
        let table = datastore.table('Products');

        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ error: "Invalid payload" });
        }

        let updatedRow = await table.updateRow(req.body);
        res.json({ success: true, row: updatedRow });
    } catch (err) {
        console.error("Error in updateProduct:", err);
        res.status(500).json({ error: "Failed to update product" });
    }
};

///////// getimage //////////

exports.getImage = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        let filestore = app.filestore();
        const folderId = req.params.folderid;
        const fileId = req.params.fileid;

        if (!folderId || !fileId) {
            return res.status(400).json({ error: "Missing folderid or fileid" });
        }

        let folder = filestore.folder(folderId);
        let fileObject = await folder.downloadFile(fileId);
        fileObject.pipe(res);
    } catch (err) {
        console.error("Error in getImage:", err);
        res.status(500).json({ error: "Failed to download file" });
    }
};
