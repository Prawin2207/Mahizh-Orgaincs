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
        res.json(allProducts);
    } catch (error) {
        console.error("Error in getproduct:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const table = datastore.table('Products');
        const updatedRow = await table.updateRow(req.body);
        res.json({ status: "success", data: updatedRow });
    } catch (error) {
        console.error("Error in updateProduct:", error);
        res.status(500).json({ error: "Internal server error" });
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
        console.error("Error in getImage:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



