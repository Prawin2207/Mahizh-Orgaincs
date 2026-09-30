var catalyst = require("zcatalyst-sdk-node");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

exports.getproduct = async (req, res) => {
  try {
    var app = catalyst.initialize(req);
    let zcql = app.zcql();

    let offset = 1;
    let value = 200;
    let allProducts = [];

    let TABLE_NAME = "Products";
    let countquery = "SELECT COUNT(ROWID) FROM Products";
    let CountData = await zcql.executeZCQLQuery(countquery);
    const rowCount = CountData[0].Products["COUNT(ROWID)"];

    const loopCount = Math.ceil(rowCount / value);

    for (let loopingCount = 1; loopingCount <= loopCount; loopingCount++) {
      const query = `SELECT * FROM ${TABLE_NAME} LIMIT ${offset}, ${value}`;
      const getProducts = await zcql.executeZCQLQuery(query);
      allProducts = allProducts.concat(getProducts);
      offset += value;
    }
    res.status(200).send(allProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ status: "failure", message: "Failed to fetch products" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    var app = catalyst.initialize(req);
    let datastore = app.datastore();
    let table = datastore.table("Products");
    let row = await table.updateRow(req.body);
    res.status(200).json({ status: "success", data: row });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ status: "failure", message: "Failed to update product" });
  }
};

exports.getImage = (req, res) => {
  try {
    var app = catalyst.initialize(req);
    let filestore = app.filestore();
    let folder = filestore.folder(req.params.folderid);
    let downloadPromise = folder.downloadFile(req.params.fileid);
    downloadPromise
      .then((fileObject) => {
        fileObject.pipe(res);
      })
      .catch((err) => {
        console.error("Error downloading file:", err);
        res.status(500).json({ status: "failure", message: "Failed to download image" });
      });
  } catch (err) {
    console.error("Error in getImage handler:", err);
    res.status(500).json({ status: "failure", message: "Failed to process image request" });
  }
};
