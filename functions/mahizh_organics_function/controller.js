const catalyst = require('zcatalyst-sdk-node');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.getproduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const zcql = app.zcql();

        let offset = 1;
        const value = 200;
        let allProducts = [];

        const TABLE_NAME = "Products";
        const countquery = 'SELECT COUNT(ROWID) FROM Products';

        //// getting product count ///
        const CountData = await zcql.executeZCQLQuery(countquery);
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
        res.status(500).send({ error: "An error occurred while fetching products." });
    }
};

///////////// updating the product /////////////

exports.updateProduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);

        if (!req.body || !req.body.ROWID) {
            return res.status(400).send({ error: "Missing ROWID in request body." });
        }

        const datastore = app.datastore();
        const table = datastore.table('Products');
        const row = await table.updateRow(req.body);

        console.log("Product updated:", row);
        res.send({ success: true, message: "Product updated successfully.", data: row });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send({ error: "An error occurred while updating the product." });
    }
};

///////// getimage //////////

exports.getImage = async (req, res) => {
    try {
        const app = catalyst.initialize(req);

        const folderId = req.params.folderid;
        const fileId = req.params.fileid;

        if (!folderId || !fileId) {
            return res.status(400).send({ error: "Missing folderid or fileid." });
        }

        const filestore = app.filestore();
        const folder = filestore.folder(folderId);
        const fileObject = await folder.downloadFile(fileId);

        console.log("File downloaded:", fileId);
        fileObject.pipe(res);
    } catch (error) {
        console.error("Error downloading image:", error);
        res.status(500).send({ error: "An error occurred while retrieving the image." });
    }
};
