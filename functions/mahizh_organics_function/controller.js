var catalyst = require('zcatalyst-sdk-node');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.getproduct = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        let zcql = app.zcql();

        let offset = 1;
        let value = 200;
        let allProducts = [];

        let TABLE_NAME = "Products";
        let countquery = 'SELECT COUNT(ROWID) FROM Products';
        //// getting product count ///
        let CountData = await zcql.executeZCQLQuery(countquery);
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
        // Secure error handling - do not expose stack trace details
        console.error("Error in getproduct:", error);
        res.status(500).send({ error: "An internal server error occurred." });
    }
};

///////////// updating the product /////////////

exports.updateProduct = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        let datastore = app.datastore();
        let table = datastore.table('Products');
        let updatedRow = await table.updateRow(req.body);
        res.send(updatedRow);
    } catch (error) {
        // Secure error handling - do not expose stack trace details
        console.error("Error in updateProduct:", error);
        res.status(500).send({ error: "An internal server error occurred." });
    }
};

///////// getimage //////////

exports.getImage = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        let filestore = app.filestore();
        let folder = filestore.folder(req.params.folderid);
        let fileObject = await folder.downloadFile(req.params.fileid);
        fileObject.pipe(res);
    } catch (error) {
        // Secure error handling - do not expose stack trace details
        console.error("Error in getImage:", error);
        res.status(500).send({ error: "An internal server error occurred." });
    }
};



