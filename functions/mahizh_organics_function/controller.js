const catalyst = require("zcatalyst-sdk-node");

exports.getproduct = async (req, res) => {
  try {
    const app = catalyst.initialize(req);
    const zcql = app.zcql();

    let offset = 1;
    const value = 200;
    let allProducts = [];

    const countquery = "SELECT COUNT(ROWID) FROM Products";
    const CountData = await zcql.executeZCQLQuery(countquery);
    const rowCount = CountData[0]?.Products?.["COUNT(ROWID)"] || 0;

    const loopCount = Math.ceil(rowCount / value);
    for (let loopingCount = 1; loopingCount <= loopCount; loopingCount++) {
      const query = `SELECT * FROM Products LIMIT ${offset}, ${value}`;
      const getProducts = await zcql.executeZCQLQuery(query);
      allProducts = allProducts.concat(getProducts);
      offset += value;
    }
    res.status(200).send(allProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object" || !req.body.ROWID) {
      return res.status(400).json({ error: "Invalid product data or ROWID missing" });
    }
    const app = catalyst.initialize(req);
    const datastore = app.datastore();
    const table = datastore.table("Products");
    const updatedRow = await table.updateRow(req.body);
    res.status(200).json(updatedRow);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

exports.getImage = async (req, res) => {
  try {
    const { folderid, fileid } = req.params;
    if (!folderid || !fileid) {
      return res.status(400).json({ error: "Folder ID and File ID are required" });
    }
    const app = catalyst.initialize(req);
    const filestore = app.filestore();
    const folder = filestore.folder(folderid);
    const fileObject = await folder.downloadFile(fileid);
    fileObject.pipe(res);
  } catch (error) {
    res.status(500).json({ error: "Failed to download image" });
  }
};
