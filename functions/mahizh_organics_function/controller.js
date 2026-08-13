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
        console.error('Error in getproduct:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

///////////// updating the product /////////////

exports.updateProduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const table = datastore.table('Products');

        // Parameter sanitization and strict input validation
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).send({ error: 'Invalid payload type' });
        }

        const { ROWID, Name, Price, Quantity, Description } = req.body;

        if (!ROWID) {
            return res.status(400).send({ error: 'ROWID is required' });
        }

        // Sanitize update fields to prevent mass assignment / parameter pollution
        const sanitizedData = { ROWID };
        if (Name !== undefined) sanitizedData.Name = String(Name);
        if (Price !== undefined) sanitizedData.Price = Number(Price);
        if (Quantity !== undefined) sanitizedData.Quantity = Number(Quantity);
        if (Description !== undefined) sanitizedData.Description = String(Description);

        const updatedRow = await table.updateRow(sanitizedData);
        res.send(updatedRow);
    } catch (error) {
        console.error('Error in updateProduct:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

///////// getimage //////////

exports.getImage = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const filestore = app.filestore();

        const folderid = req.params.folderid;
        const fileid = req.params.fileid;

        if (!folderid || !fileid) {
            return res.status(400).send({ error: 'Folder ID and File ID are required' });
        }

        // Check if params are safe alphanumeric strings to prevent path traversal/pollution
        const idRegex = /^[0-9]+$/;
        if (!idRegex.test(folderid) || !idRegex.test(fileid)) {
            return res.status(400).send({ error: 'Invalid ID format' });
        }

        const folder = filestore.folder(folderid);
        const fileObject = await folder.downloadFile(fileid);
        fileObject.pipe(res);
    } catch (error) {
        console.error('Error in getImage:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
