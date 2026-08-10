const catalyst = require('zcatalyst-sdk-node');

// Get all products from the Catalyst Datastore
exports.getproduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const zcql = app.zcql();

        let offset = 1;
        const value = 200;
        let allProducts = [];

        const TABLE_NAME = "Products";
        const countquery = 'SELECT COUNT(ROWID) FROM Products';

        // Getting product count safely
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
        console.error("Error in getproduct:", error);
        res.status(500).json({ error: "Failed to retrieve products. Please try again later." });
    }
};

// Updating the product securely with validation and try-catch
exports.updateProduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);

        // Input validation: Ensure req.body has a valid ROWID
        if (!req.body || !req.body.ROWID) {
            return res.status(400).json({ error: "Missing required parameter: ROWID is required to update a product." });
        }

        const datastore = app.datastore();
        const table = datastore.table('Products');

        const updatedRow = await table.updateRow(req.body);
        console.log("Updated product row:", updatedRow);
        res.status(200).json({ success: true, data: updatedRow });
    } catch (error) {
        console.error("Error in updateProduct:", error);
        res.status(500).json({ error: "Failed to update product details. Please try again later." });
    }
};

// Get image safely with validation and proper context initialization
exports.getImage = async (req, res) => {
    try {
        const app = catalyst.initialize(req);

        const folderid = req.params.folderid;
        const fileid = req.params.fileid;

        // Param validation
        if (!folderid || !fileid) {
            return res.status(400).json({ error: "Missing folderid or fileid path parameters." });
        }

        // Sanitize parameters to avoid potential injection / path traversal issues
        // Ensure folderid and fileid only contain word characters/digits to be safe
        const pathRegex = /^[a-zA-Z0-9_\-]+$/;
        if (!pathRegex.test(folderid) || !pathRegex.test(fileid)) {
            return res.status(400).json({ error: "Invalid path parameters format." });
        }

        const filestore = app.filestore();
        const folder = filestore.folder(folderid);
        const fileObject = await folder.downloadFile(fileid);

        if (fileObject) {
            fileObject.pipe(res);
        } else {
            res.status(404).json({ error: "Image file not found." });
        }
    } catch (error) {
        console.error("Error in getImage:", error);
        res.status(500).json({ error: "Failed to download image. Please try again later." });
    }
};
