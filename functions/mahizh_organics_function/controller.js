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
        res.json(allProducts);
    } catch (error) {
        console.error("Error in getproduct:", error);
        res.status(500).json({ error: "An error occurred while fetching products" });
    }
};

///////////// updating the product /////////////

exports.updateProduct = async (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Invalid product payload provided" });
        }

        var app = catalyst.initialize(req);
        let datastore = app.datastore();
        let table = datastore.table('Products');
        let row = await table.updateRow(req.body);

        res.json({ success: true, data: row });
    } catch (error) {
        console.error("Error in updateProduct:", error);
        res.status(500).json({ error: "An error occurred while updating product" });
    }
};

///////// getimage //////////

exports.getImage = async (req, res) => {
    try {
        const { folderid, fileid } = req.params;
        if (!folderid || !fileid) {
            return res.status(400).json({ error: "Missing folderid or fileid parameters" });
        }

        var app = catalyst.initialize(req);
        let filestore = app.filestore();
        let folder = filestore.folder(folderid);
        let fileObject = await folder.downloadFile(fileid);

        fileObject.pipe(res);
    } catch (error) {
        console.error("Error in getImage:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: "An error occurred while fetching image" });
        }
    }
};
