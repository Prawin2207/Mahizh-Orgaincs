var catalyst = require('zcatalyst-sdk-node');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' }); 

exports.createProduct = async (req,res)=>{

    res.send("working");
//     var app = catalyst.initialize(req); 
    
    
//  let rowData = { name: `George Hamilton`, age: 22, city:'Coimbatore' };
 
//  let datastore = app.datastore(); 
 
//  let table = datastore.table('users'); 
 
//  let insertPromise = await table.insertRow(rowData); 
 
//  console.log(insertPromise); 

 }