const catalyst = require('zcatalyst-sdk-node');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Fetch all products from the Catalyst Datastore
exports.getproduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const zcql = app.zcql();

        let offset = 1;
        const value = 200;
        let allProducts = [];

        const TABLE_NAME = "Products";
        const countquery = 'SELECT COUNT(ROWID) FROM Products';

        // Getting product count
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
        // Secure logging: log the error details locally but do not leak implementation/stack details to the client
        console.error("Error in getproduct:", error);
        return res.status(500).send({ error: "An error occurred while fetching products." });
    }
};

// Update a single product's row using ROWID
exports.updateProduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const table = datastore.table('Products');

        // table.updateRow returns a promise
        const row = await table.updateRow(req.body);
        console.log("Product updated successfully:", row);
        return res.status(200).send({ success: true, message: "Product updated successfully." });
    } catch (error) {
        // Secure logging: log locally, do not leak error to client
        console.error("Error in updateProduct:", error);
        return res.status(500).send({ error: "An error occurred while updating the product." });
    }
};

// Download and stream image from Catalyst Filestore
exports.getImage = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const filestore = app.filestore();

        // Corrected req.parms typo to req.params
        const folder = filestore.folder(req.params.folderid);
        const fileObject = await folder.downloadFile(req.params.fileid);

        console.log("Image downloaded successfully");
        fileObject.pipe(res);
    } catch (error) {
        // Secure logging: log locally, do not leak error to client
        console.error("Error in getImage:", error);
        return res.status(500).send({ error: "An error occurred while retrieving the image." });
    }
};
