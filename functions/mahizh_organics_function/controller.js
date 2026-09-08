var catalyst = require('zcatalyst-sdk-node');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

exports.getproduct = async (req, res) => {

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

},

///////////// updating the product /////////////

exports.updateProduct = async(req,res)=>{


    // let updatedRowData = { Name: ``, Age: 31, ROWID: 1510000000109474 }; 
    //Use Table Meta Object to update a single row using ROWID which returns a promise 

    let datastore = app.datastore(); 
    let table = datastore.table('Products'); 
    let rowPromise = table.updateRow(req.body);

    rowPromise.then((row) => { console.log(row); });


},

///////// getimage //////////

exports.getImage = async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        let filestore = app.filestore();
        let folder = filestore.folder(req.params.folderid);
        let fileObject = await folder.downloadFile(req.params.fileid);
        fileObject.pipe(res);
    } catch (error) {
        console.error("Error downloading file from filestore:", error.message || error);
        // Secure generic error response to prevent internal information leakage and process crashes
        if (!res.headersSent) {
            res.status(500).send({ error: "Failed to download image." });
        }
    }
}



