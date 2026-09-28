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
        const rowCount = CountData[0].Products["COUNT(ROWID)"];

        const loopCount = Math.ceil(rowCount / value);

        for (let loopingCount = 1; loopingCount <= loopCount; loopingCount++) {
            const query = `SELECT * FROM ${TABLE_NAME} LIMIT ${offset}, ${value}`;
            const getProducts = await zcql.executeZCQLQuery(query);
            allProducts = allProducts.concat(getProducts);
            offset += value;
        }
        return res.status(200).send(allProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

///////////// updating the product /////////////

exports.updateProduct = async (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
            return res.status(400).json({ error: 'Invalid request body' });
        }
        var app = catalyst.initialize(req);
        let datastore = app.datastore();
        let table = datastore.table('Products');
        let row = await table.updateRow(req.body);
        return res.status(200).json({ success: true, data: row });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

///////// getimage //////////

exports.getImage = async (req, res) => {
    try {
        const folderid = req.params && req.params.folderid;
        const fileid = req.params && req.params.fileid;
        if (!folderid || !fileid) {
            return res.status(400).json({ error: 'Missing required parameters: folderid and fileid' });
        }
        var app = catalyst.initialize(req);
        let filestore = app.filestore();
        let folder = filestore.folder(folderid);
        let fileObject = await folder.downloadFile(fileid);
        fileObject.pipe(res);
    } catch (error) {
        console.error('Error downloading image:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
