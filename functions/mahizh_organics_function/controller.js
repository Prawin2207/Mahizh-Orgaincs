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

        // Getting product count safely
        const CountData = await zcql.executeZCQLQuery(countquery);
        if (!CountData || CountData.length === 0 || !CountData[0].Products) {
            return res.status(500).json({ error: "Failed to retrieve product count" });
        }

        const rowCount = parseInt(CountData[0].Products["COUNT(ROWID)"], 10) || 0;
        const loopCount = Math.ceil(rowCount / value);

        for (let loopingCount = 1; loopingCount <= loopCount; loopingCount++) {
            const query = `SELECT * FROM ${TABLE_NAME} LIMIT ${offset}, ${value}`;
            const getProducts = await zcql.executeZCQLQuery(query);
            allProducts = allProducts.concat(getProducts);
            offset += value;
        }
        res.status(200).json(allProducts);
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ error: "An error occurred while fetching products" });
    }
};

///////////// updating the product with strict validation and error handling /////////////

exports.updateProduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);

        // Ensure request body is present and is an object
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ error: "Invalid request payload" });
        }

        const { ROWID } = req.body;

        // Strict validation of ROWID (must be a positive numeric string/integer matching Catalyst ID format)
        if (!ROWID || !/^\d{15,20}$/.test(String(ROWID))) {
            return res.status(400).json({ error: "Invalid or missing ROWID" });
        }

        // Define a strict allowlist of fields that are safe to update to prevent parameter pollution / mass assignment
        const allowedFields = [
            'ROWID',
            'Name',
            'productName',
            'price',
            'strikePrice',
            'Age',
            'folderid',
            'fileid',
            'FolderID',
            'FileID'
        ];

        const updatedRowData = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                const val = req.body[field];

                // Input validation/sanitization per field
                if (field === 'ROWID') {
                    updatedRowData[field] = String(val);
                } else if (field === 'Name' || field === 'productName') {
                    if (typeof val !== 'string' || val.length > 255) {
                        return res.status(400).json({ error: "Invalid value for product name" });
                    }
                    updatedRowData[field] = val.trim();
                } else if (field === 'price' || field === 'strikePrice') {
                    const strVal = String(val);
                    if (strVal.length > 50 || !/^\d+(\.\d{1,4})?$/.test(strVal)) {
                        return res.status(400).json({ error: `Invalid format for field ${field}` });
                    }
                    updatedRowData[field] = typeof val === 'number' ? val : parseFloat(val);
                } else if (field === 'Age') {
                    const intVal = parseInt(val, 10);
                    if (isNaN(intVal) || intVal < 0 || intVal > 1000) {
                        return res.status(400).json({ error: "Invalid age format" });
                    }
                    updatedRowData[field] = intVal;
                } else if (['folderid', 'fileid', 'FolderID', 'FileID'].includes(field)) {
                    const strId = String(val);
                    if (!/^\d{1,25}$/.test(strId)) {
                        return res.status(400).json({ error: `Invalid ID format for field ${field}` });
                    }
                    updatedRowData[field] = strId;
                }
            }
        }

        const datastore = app.datastore();
        const table = datastore.table('Products');
        const row = await table.updateRow(updatedRowData);

        return res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            data: row
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ error: "An error occurred while updating the product" });
    }
};

///////// getimage safely with path-traversal prevention //////////

exports.getImage = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const folderId = req.params.folderid;
        const fileId = req.params.fileid;

        // Strict input validation to prevent path traversal and malformed ID crashes
        if (!folderId || !fileId || !/^\d{1,25}$/.test(folderId) || !/^\d{1,25}$/.test(fileId)) {
            return res.status(400).json({ error: "Invalid folder or file identifier format" });
        }

        const filestore = app.filestore();
        const folder = filestore.folder(folderId);
        const fileObject = await folder.downloadFile(fileId);

        if (!fileObject) {
            return res.status(404).json({ error: "File not found" });
        }

        fileObject.pipe(res);
    } catch (error) {
        console.error("Error downloading file:", error);
        return res.status(500).json({ error: "An error occurred while retrieving the image" });
    }
};
