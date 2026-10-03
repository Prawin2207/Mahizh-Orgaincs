const catalyst = require("zcatalyst-sdk-node");

exports.getproduct = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const zcql = app.zcql();

        let offset = 1;
        const value = 200;
        let allProducts = [];

        const TABLE_NAME = "Products";
        const countquery = "SELECT COUNT(ROWID) FROM Products";

        const countData = await zcql.executeZCQLQuery(countquery);
        const rowCount = countData[0].Products["COUNT(ROWID)"];

        const loopCount = Math.ceil(rowCount / value);

        for (let loopingCount = 1; loopingCount <= loopCount; loopingCount++) {
            const query = `SELECT * FROM ${TABLE_NAME} LIMIT ${offset}, ${value}`;
            const getProducts = await zcql.executeZCQLQuery(query);
            allProducts = allProducts.concat(getProducts);
            offset += value;
        }
        return res.status(200).send(allProducts);
    } catch (error) {
        return res.status(500).send({ error: "Failed to retrieve products" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        if (!req.body || typeof req.body !== "object" || !req.body.ROWID) {
            return res.status(400).send({ error: "Invalid request payload or missing ROWID" });
        }

        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const table = datastore.table("Products");
        const rowData = await table.updateRow(req.body);

        return res.status(200).send({ message: "Product updated successfully", data: rowData });
    } catch (error) {
        return res.status(500).send({ error: "Failed to update product" });
    }
};

exports.getImage = async (req, res) => {
    try {
        const folderid = req.params?.folderid;
        const fileid = req.params?.fileid;

        if (!folderid || !fileid) {
            return res.status(400).send({ error: "Folder ID and File ID are required" });
        }

        const app = catalyst.initialize(req);
        const filestore = app.filestore();
        const folder = filestore.folder(folderid);
        const fileObject = await folder.downloadFile(fileid);

        fileObject.pipe(res);
    } catch (error) {
        return res.status(500).send({ error: "Failed to download file" });
    }
};
