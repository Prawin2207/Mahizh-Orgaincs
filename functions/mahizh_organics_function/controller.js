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
        const rowCount = CountData && CountData[0] && CountData[0].Products ? CountData[0].Products["COUNT(ROWID)"] : 0;

        const loopCount = Math.ceil(rowCount / value);

        for (let loopingCount = 1; loopingCount <= loopCount; loopingCount++) {
            const query = `SELECT * FROM ${TABLE_NAME} LIMIT ${offset}, ${value}`;
            const getProducts = await zcql.executeZCQLQuery(query);
            allProducts = allProducts.concat(getProducts);
            offset += value;
        }
        res.status(200).send(allProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ error: "Failed to fetch products" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object' || !req.body.ROWID) {
            return res.status(400).send({ error: "Invalid request payload. ROWID is required." });
        }
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const table = datastore.table('Products');
        const updatedRow = await table.updateRow(req.body);
        res.status(200).send(updatedRow);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send({ error: "Failed to update product" });
    }
};

exports.getImage = async (req, res) => {
    try {
        const folderid = req.params && req.params.folderid;
        const fileid = req.params && req.params.fileid;

        if (!folderid || !fileid) {
            return res.status(400).send({ error: "folderid and fileid parameters are required." });
        }

        const app = catalyst.initialize(req);
        const filestore = app.filestore();
        const folder = filestore.folder(folderid);
        const fileObject = await folder.downloadFile(fileid);
        fileObject.pipe(res);
    } catch (error) {
        console.error("Error retrieving image:", error);
        res.status(500).send({ error: "Failed to retrieve image" });
    }
};
