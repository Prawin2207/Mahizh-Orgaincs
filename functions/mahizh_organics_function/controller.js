var catalyst = require('zcatalyst-sdk-node');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

exports.getproduct = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        let zcql = app.zcql();

        let offset = 1;
        let value = 200;
        let allProducts = [];

        let TABLE_NAME = "Products"
        let countquery = 'SELECT COUNT(ROWID) FROM Products'

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
        res.send(allProducts);
    } catch (error) {
        console.error("Error in getproduct:", error);
        res.status(500).send({ error: "An error occurred while fetching products." });
    }
};

///////////// updating the product /////////////

exports.updateProduct = async(req,res)=>{
    try {
        var app = catalyst.initialize(req);

        // Input validation & sanitization to prevent Mass Assignment
        if (!req.body || typeof req.body !== "object") {
            return res.status(400).send({ error: "Invalid request payload." });
        }

        // Must specify ROWID for update, and it must be a valid numeric string/number
        if (!req.body.ROWID || isNaN(Number(req.body.ROWID))) {
            return res.status(400).send({ error: "A valid ROWID is required for update." });
        }

        // Restrict allowed fields to prevent arbitrary database updates (Mass Assignment / Parameter Pollution)
        const allowedFields = ["ROWID", "productName", "price", "strikePrice", "Name", "Age"];
        const sanitizedBody = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                sanitizedBody[field] = req.body[field];
            }
        }

        let datastore = app.datastore();
        let table = datastore.table('Products');
        let rowPromise = table.updateRow(sanitizedBody);

        rowPromise
            .then((row) => {
                console.log("Product updated successfully:", row);
                res.status(200).send({ success: true, message: "Product updated successfully." });
            })
            .catch((err) => {
                console.error("Database update error:", err);
                res.status(500).send({ error: "Failed to update product." });
            });
    } catch (error) {
        console.error("Error in updateProduct:", error);
        res.status(500).send({ error: "An unexpected error occurred." });
    }
};

///////// getimage //////////

exports.getImage = (req,res)=>{
    try {
        var app = catalyst.initialize(req);

        const folderid = req.params.folderid;
        const fileid = req.params.fileid;

        // Input validation: ensure folderid and fileid are numeric IDs to prevent malformed queries/traversal
        if (!folderid || isNaN(Number(folderid)) || !fileid || isNaN(Number(fileid))) {
            return res.status(400).send({ error: "Invalid folder ID or file ID." });
        }

        let filestore = app.filestore();
        let folder = filestore.folder(folderid);
        let downloadPromise = folder.downloadFile(fileid);

        downloadPromise
            .then((fileObject) => {
                console.log("File downloaded successfully");
                fileObject.pipe(res);
            })
            .catch((err) => {
                console.error("Error downloading file from filestore:", err);
                res.status(500).send({ error: "Could not retrieve the requested image." });
            });
    } catch (error) {
        console.error("Error in getImage:", error);
        res.status(500).send({ error: "An unexpected error occurred." });
    }
};
