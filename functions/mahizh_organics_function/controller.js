const catalyst = require('zcatalyst-sdk-node');

exports.getproduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
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
        return res.status(200).json(allProducts);
    } catch (error) {
        console.error('Error in getproduct:', error);
        return res.status(500).json({ error: 'Failed to retrieve products' });
    }
};

///////////// updating the product /////////////

exports.updateProduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        let datastore = app.datastore();
        let table = datastore.table('Products');

        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        let updatedRow = await table.updateRow(req.body);
        return res.status(200).json(updatedRow);
    } catch (error) {
        console.error('Error in updateProduct:', error);
        return res.status(500).json({ error: 'Failed to update product' });
    }
};

///////// getimage //////////

exports.getImage = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        let filestore = app.filestore();
        let folder = filestore.folder(req.params.folderid);
        let fileObject = await folder.downloadFile(req.params.fileid);
        fileObject.pipe(res);
    } catch (error) {
        console.error('Error in getImage:', error);
        return res.status(500).json({ error: 'Failed to retrieve image' });
    }
};



