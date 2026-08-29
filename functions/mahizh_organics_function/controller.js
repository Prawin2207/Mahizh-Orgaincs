const catalyst = require('zcatalyst-sdk-node');

exports.getproduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const zcql = app.zcql();

        let offset = 1;
        const value = 200;
        let allProducts = [];

        const countquery = 'SELECT COUNT(ROWID) FROM Products';
        const countData = await zcql.executeZCQLQuery(countquery);
        const rowCount = countData[0].Products["COUNT(ROWID)"];

        const loopCount = Math.ceil(rowCount / value);

        for (let i = 1; i <= loopCount; i++) {
            const query = `SELECT * FROM Products LIMIT ${offset}, ${value}`;
            const getProducts = await zcql.executeZCQLQuery(query);
            allProducts = allProducts.concat(getProducts);
            offset += value;
        }
        res.send(allProducts);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send({ error: "Failed to fetch products" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const table = datastore.table('Products');
        const row = await table.updateRow(req.body);
        res.send(row);
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).send({ error: "Failed to update product" });
    }
};

exports.getImage = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const filestore = app.filestore();
        const folder = filestore.folder(req.params.folderid);
        const fileObject = await folder.downloadFile(req.params.fileid);
        fileObject.pipe(res);
    } catch (err) {
        console.error("Error getting image:", err);
        res.status(500).send({ error: "Failed to retrieve image" });
    }
};
