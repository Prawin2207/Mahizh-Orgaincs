<template>
    <div class="form-container">
        <h2 class="form-title">Product Details</h2>
        <form @submit.prevent="handleImageUpload" class="product-form">
            <!-- Image Upload -->
            <div class="form-group">
                <label for="image">Upload Product Image</label>
                <input type="file" id="image" @change="createProductTxt" class="form-control" />
            </div>

            <!-- Product Name -->
            <div class="form-group">
                <label for="productName">Product Name</label>
                <input type="text" id="productName" v-model="formData.productName" placeholder="Enter product name"
                    class="form-control" />
            </div>

            <!-- Price -->
            <div class="form-group">
                <label for="price">Price</label>
                <input type="text" id="price" v-model="formData.price" placeholder="Enter price" class="form-control" />
            </div>

            <!-- Strike Price -->
            <div class="form-group">
                <label for="strikePrice">Strike Price</label>
                <input type="text" id="strikePrice" v-model="formData.strikePrice" placeholder="Enter strike price"
                    class="form-control" />
            </div>

            <!-- Submit Button -->
            <button type="submit" class="submit-btn">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                productName: '',
                price: '',
                strikePrice: '',
            },
            image:[]
        };
    },
    methods: {
        //   submitForm() {

        //     // Add form submission logic here
        //   },
        handleImageUpload(event) {
                 
            // const file = event.target.files[0];
                   
            // console.log('Selected image:', file);
            // //    this.image.push(file);
            // // console.log('Form Data:', this.formData);
            // // Handle image file upload here

            // var filestore = catalyst.file;
            // var folder = filestore.folderId(9735000000009566); //Specify the Folder ID
            // var uploadPromise = folder.uploadFile(file).start(); //Pass the file object and upload the file
            // uploadPromise
            //     .then((response) => {
            //         console.log(response.content);
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        },
        createProductTxt(){

            var datastore = catalyst.table; 
            var table = datastore.tableId('9735000000007122'); 
            var row = table.rowId(9735000000010007); 
            var rowPromise = row.get();
            rowPromise.then((response) => { console.log(response.content); }) .catch((err) => { console.log(err); });
        }

        

    }
};
</script>

<style scoped>
/* Light Green Theme */
.form-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f0fff0;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
    text-align: center;
    font-size: 24px;
    color: #2c662d;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-size: 14px;
    color: #2c662d;
    margin-bottom: 5px;
}

.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.submit-btn {
    width: 100%;
    padding: 10px;
    background-color: #76c96b;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submit-btn:hover {
    background-color: #5fa956;
}
</style>