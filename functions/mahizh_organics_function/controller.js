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
        const rowCount = CountData[0]?.Products?.["COUNT(ROWID)"] || 0;

        const loopCount = Math.ceil(rowCount / value);

        for (let loopingCount = 1; loopingCount <= loopCount; loopingCount++) {
            const query = `SELECT * FROM ${TABLE_NAME} LIMIT ${offset}, ${value}`;
            const getProducts = await zcql.executeZCQLQuery(query);
            allProducts = allProducts.concat(getProducts);
            offset += value;
        }

        return res.status(200).send(allProducts);
    } catch (error) {
        console.error('Error in getproduct:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const table = datastore.table('Products');

        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const updatedRow = await table.updateRow(req.body);
        return res.status(200).json(updatedRow);
    } catch (error) {
        console.error('Error in updateProduct:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getImage = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const filestore = app.filestore();
        const { folderid, fileid } = req.params;

        if (!folderid || !fileid) {
            return res.status(400).json({ error: 'Missing folderid or fileid parameters' });
        }

        const folder = filestore.folder(folderid);
        const fileObject = await folder.downloadFile(fileid);
        fileObject.pipe(res);
    } catch (error) {
        console.error('Error in getImage:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
