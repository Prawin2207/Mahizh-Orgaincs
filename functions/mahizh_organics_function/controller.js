var catalyst = require('zcatalyst-sdk-node');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

// Helper function to safely validate numeric IDs (prevents injection/path traversal/unexpected types)
const isValidId = (id) => /^\d+$/.test(id);

exports.getproduct = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        let zcql = app.zcql();

        let offset = 1;
        let value = 200;
        let allProducts = [];

        let TABLE_NAME = "Products"
        let countquery = 'SELECT COUNT(ROWID) FROM Products'
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
        console.error("Error in getproduct:", error);
        res.status(500).json({ error: "Internal server error" }); // Safe error message, no leaks
    }
};

///////////// updating the product /////////////

exports.updateProduct = async(req,res)=>{
    try {
        var app = catalyst.initialize(req);
        let datastore = app.datastore();
        let table = datastore.table('Products');

        // Input validation: ROWID must be a valid numeric ID to prevent database manipulation/unexpected errors
        if (!req.body || !isValidId(req.body.ROWID)) {
            return res.status(400).json({ error: "Invalid product ROWID" });
        }

        let rowPromise = table.updateRow(req.body);
        rowPromise.then((row) => {
            console.log(row);
            res.json({ success: true, data: row }); // Send a response so request doesn't hang
        }).catch((err) => {
            console.error("Database update error:", err);
            res.status(500).json({ error: "Failed to update product" });
        });
    } catch (error) {
        console.error("Error in updateProduct:", error);
        res.status(500).json({ error: "Internal server error" }); // Safe error message, no leaks
    }
};

///////// getimage //////////

exports.getImage = (req,res)=>{
    try {
        var app = catalyst.initialize(req);
        let filestore = app.filestore();

        // Input validation: folderid and fileid must be valid numeric IDs to prevent path traversal/injection
        if (!isValidId(req.params.folderid) || !isValidId(req.params.fileid)) {
            return res.status(400).json({ error: "Invalid folder or file ID" });
        }

        let folder = filestore.folder(req.params.folderid); // Fixed typo req.parms
        let downloadPromise = folder.downloadFile(req.params.fileid); 
        downloadPromise.then((fileObject) => 
        { 
            console.log(fileObject);
            fileObject.pipe(res);
        }).catch((err) => {
            console.error("Filestore download error:", err);
            res.status(500).json({ error: "Failed to download image" });
        });
    } catch (error) {
        console.error("Error in getImage:", error);
        res.status(500).json({ error: "Internal server error" }); // Safe error message, no leaks
    }
};
