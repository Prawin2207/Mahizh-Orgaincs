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
        res.status(200).json(allProducts);
    } catch (error) {
        console.error("Error in getproduct:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

///////////// updating the product /////////////

exports.updateProduct = async (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ error: "Invalid product data" });
        }
        var app = catalyst.initialize(req);
        let datastore = app.datastore();
        let table = datastore.table('Products');
        let row = await table.updateRow(req.body);
        res.status(200).json(row);
    } catch (error) {
        console.error("Error in updateProduct:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
};

///////// getimage //////////

exports.getImage = async (req, res) => {
    try {
        const { folderid, fileid } = req.params;
        if (!folderid || !fileid) {
            return res.status(400).json({ error: "Missing folderid or fileid parameter" });
        }
        var app = catalyst.initialize(req);
        let filestore = app.filestore();
        let folder = filestore.folder(folderid);
        let fileObject = await folder.downloadFile(fileid);
        fileObject.pipe(res);
    } catch (error) {
        console.error("Error in getImage:", error);
        res.status(500).json({ error: "Failed to download image" });
    }
};
