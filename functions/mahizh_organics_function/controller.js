var catalyst = require('zcatalyst-sdk-node');

exports.getproduct = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        let zcql = app.zcql();

        let offset = 1;
        let value = 200;
        let allProducts = [];

        let TABLE_NAME = "Products";
        let countquery = 'SELECT COUNT(ROWID) FROM Products';
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
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        if (!req.body || typeof req.body !== 'object' || !req.body.ROWID) {
            return res.status(400).json({ error: 'Invalid input: ROWID is required' });
        }

        const { ROWID, Name, Price, Description, Category, Quantity } = req.body;
        const updateData = { ROWID };
        if (Name !== undefined) updateData.Name = String(Name);
        if (Price !== undefined) updateData.Price = Price;
        if (Description !== undefined) updateData.Description = String(Description);
        if (Category !== undefined) updateData.Category = String(Category);
        if (Quantity !== undefined) updateData.Quantity = Quantity;

        let datastore = app.datastore();
        let table = datastore.table('Products');
        let row = await table.updateRow(updateData);
        res.status(200).json({ message: 'Product updated successfully', row });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

exports.getImage = async (req, res) => {
    try {
        var app = catalyst.initialize(req);
        const { folderid, fileid } = req.params || {};
        if (!folderid || !fileid) {
            return res.status(400).json({ error: 'Folder ID and File ID are required' });
        }

        let filestore = app.filestore();
        let folder = filestore.folder(folderid);
        let fileObject = await folder.downloadFile(fileid);
        fileObject.pipe(res);
    } catch (error) {
        console.error('Error getting image:', error);
        res.status(500).json({ error: 'Failed to retrieve image' });
    }
};
