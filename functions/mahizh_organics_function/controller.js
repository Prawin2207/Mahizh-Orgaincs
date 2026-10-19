const catalyst = require('zcatalyst-sdk-node');

exports.getproduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const zcql = app.zcql();

        let offset = 1;
        const value = 200;
        let allProducts = [];

        const countquery = 'SELECT COUNT(ROWID) FROM Products';
        const CountData = await zcql.executeZCQLQuery(countquery);
        const rowCount = CountData[0].Products["COUNT(ROWID)"];

        const loopCount = Math.ceil(rowCount / value);

        for (let loopingCount = 1; loopingCount <= loopCount; loopingCount++) {
            const query = `SELECT * FROM Products LIMIT ${offset}, ${value}`;
            const getProducts = await zcql.executeZCQLQuery(query);
            allProducts = allProducts.concat(getProducts);
            offset += value;
        }
        return res.status(200).json(allProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const table = datastore.table('Products');
        const updatedRow = await table.updateRow(req.body);
        return res.status(200).json(updatedRow);
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getImage = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const filestore = app.filestore();
        const folder = filestore.folder(req.params.folderid);
        const fileObject = await folder.downloadFile(req.params.fileid);
        fileObject.pipe(res);
    } catch (error) {
        console.error('Error downloading image:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
