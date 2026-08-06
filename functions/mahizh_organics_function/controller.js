var catalyst = require('zcatalyst-sdk-node');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

exports.getproduct = async (req, res) => {

    var app = catalyst.initialize(req);
    let zcql = app.zcql();

    try {
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
            // Strictly sanitize and validate offset and value to prevent SQL/ZCQL Injection or query tampering
            const cleanOffset = parseInt(offset, 10);
            const cleanValue = parseInt(value, 10);
            if (isNaN(cleanOffset) || isNaN(cleanValue) || cleanOffset < 0 || cleanValue <= 0) {
                return res.status(400).send({ error: "Invalid pagination parameters" });
            }

            const query = `SELECT * FROM ${TABLE_NAME} LIMIT ${cleanOffset}, ${cleanValue}`;
            const getProducts = await zcql.executeZCQLQuery(query);
            allProducts = allProducts.concat(getProducts);
            offset += value;
        }
        res.send(allProducts);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send({ error: "Failed to fetch products" });
    }

},

///////////// updating the product /////////////

exports.updateProduct = async(req,res)=>{

    try {
        var app = catalyst.initialize(req);
        let datastore = app.datastore();
        let table = datastore.table('Products');
        let rowPromise = table.updateRow(req.body);

        rowPromise
            .then((row) => {
                console.log("Product updated successfully:", row);
                res.status(200).send({ message: "Product updated successfully", data: row });
            })
            .catch((err) => {
                console.error("Error updating product:", err);
                res.status(500).send({ error: "Failed to update product" });
            });
    } catch (err) {
        console.error("Exception in updateProduct:", err);
        res.status(500).send({ error: "An unexpected error occurred" });
    }

},

///////// getimage //////////

exports.getImage = (req,res)=>{

    try {
        var app = catalyst.initialize(req);
        let filestore = app.filestore();

        // Ensure request parameters are valid to avoid path injection / parameter issues
        const folderId = req.params.folderid;
        const fileId = req.params.fileid;
        if (!folderId || !fileId) {
            return res.status(400).send({ error: "Missing required parameters" });
        }

        let folder = filestore.folder(folderId);
        let downloadPromise = folder.downloadFile(fileId);
        downloadPromise
            .then((fileObject) => {
                console.log("File downloaded successfully");
                fileObject.pipe(res);
            })
            .catch((err) => {
                console.error("Error downloading file:", err);
                res.status(404).send({ error: "File not found" });
            });
    } catch (err) {
        console.error("Exception in getImage:", err);
        res.status(500).send({ error: "An unexpected error occurred" });
    }

}



