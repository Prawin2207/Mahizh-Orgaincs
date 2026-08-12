const catalyst = require('zcatalyst-sdk-node');

exports.getproduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const zcql = app.zcql();

        let offset = 1;
        const value = 200;
        let allProducts = [];

        const TABLE_NAME = "Products";
        const countquery = 'SELECT COUNT(ROWID) FROM Products';

        // getting product count
        const CountData = await zcql.executeZCQLQuery(countquery);
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
        console.error('Error fetching products:', error);
        // Secure error message to prevent leaking database or internal stack traces
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};

///////////// updating the product /////////////

exports.updateProduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // Whitelist allowed properties to prevent parameter pollution/unauthorized field injection
        const allowedKeys = ['ROWID', 'Name', 'Age', 'Price', 'Strike_Price', 'productName', 'strikePrice'];
        const sanitizedBody = {};
        for (const key of allowedKeys) {
            if (req.body[key] !== undefined) {
                sanitizedBody[key] = req.body[key];
            }
        }

        // Validate that ROWID is present and numeric (Catalyst ROWID standard)
        if (!sanitizedBody.ROWID) {
            return res.status(400).json({ error: 'Missing ROWID for product update' });
        }
        if (!/^\d+$/.test(String(sanitizedBody.ROWID))) {
            return res.status(400).json({ error: 'Invalid ROWID format' });
        }

        // Secure string properties by validating length
        if (sanitizedBody.Name && sanitizedBody.Name.length > 255) {
            return res.status(400).json({ error: 'Name is too long' });
        }
        if (sanitizedBody.productName && sanitizedBody.productName.length > 255) {
            return res.status(400).json({ error: 'productName is too long' });
        }

        const datastore = app.datastore();
        const table = datastore.table('Products');
        const updatedRow = await table.updateRow(sanitizedBody);

        res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedRow });
    } catch (error) {
        console.error('Error updating product:', error);
        // Secure error message to avoid stack trace leakage
        res.status(500).json({ error: 'Failed to update product' });
    }
};

///////// getimage //////////

exports.getImage = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const folderid = req.params.folderid;
        const fileid = req.params.fileid;

        // Input validation to prevent unauthorized or illegal directory / file traversal
        if (!folderid || !/^\d+$/.test(String(folderid))) {
            return res.status(400).json({ error: 'Invalid folder ID' });
        }
        if (!fileid || !/^\d+$/.test(String(fileid))) {
            return res.status(400).json({ error: 'Invalid file ID' });
        }

        const filestore = app.filestore();
        const folder = filestore.folder(folderid);
        const fileObject = await folder.downloadFile(fileid);

        fileObject.on('error', (err) => {
            console.error('Stream error during file pipe:', err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Error streaming file' });
            }
        });

        fileObject.pipe(res);
    } catch (error) {
        console.error('Error fetching image:', error);
        // Secure error message to avoid information disclosure
        res.status(500).json({ error: 'Failed to download file' });
    }
};
