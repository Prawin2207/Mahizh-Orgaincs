<template>
    <div>
        <div class="WholeWeb">
            <div class="Mainpage-image-container">
                <HeaderVue />
                <p
                    style="margin-top:9%;margin-left: -63%;font-size: smaller;font-weight: 500;color:grey; letter-spacing:1px;">
                    PREMIUM HEMP PRODUCTS
                </p>
                <div class="paradiv">
                    <p
                    style="margin-top: 0px; margin-left: -53%;font-size:35px;font-weight: 500;color:black; letter-spacing:1px;">
                        Mahizh ORGANICS
                    </p>
                </div>
                <div class="para">
                    <p
                        style="margin-top: 20px;margin-left: -51%;font-size:11px;font-weight: 500;color:grey; letter-spacing:1px;">
                        Using organic farming methods, premium ingredients,<br> and meticulous care, we're able to
                        produce powerful <br>family-friendly hemp products at a reasonable price.
                    </p>
                </div>
                <!-- Button for SHOP NOW -->
                <a-button type="primary" style="margin-left: -72%;margin-top: 4%;border-radius:10px;background: linear-gradient(to right, #d3b8b4, #805855);">
                    SHOP NOW
                </a-button>
            </div>

            <!-- First Page Section -->
            <div class="firstpage" style="height: 120vh;background-color: white;margin-top: 2%;width:75% ;margin-left:13%;">
                <famecard />
                <addone />
            </div>

            <!-- Second Page Section -->
            <div class="secoundpage" style="height: 99vh;background-color: white;margin-top: 2%;width:75% ;margin-left:13%;">
                <p style="margin-top:3%;font-size: 28px;"><b>OUR PRODUCTS</b></p>
                <div class="products" style="background-color: white;display: grid; grid-template-columns: repeat(4, 1fr);  gap:2px;">
                    <productcard />
                    <productcard />
                    <productcard />
                    <productcard />
                    <productcard />
                </div>
            </div>

            <!-- Third Page Section -->
            <div class="thirdpage" style="height:42vh;background-color:white;width:75%;margin-left: 13%;">
                <div class="local-delivery-image">
                    <localdelivery />
                </div>
            </div>
            <!-- Footer Section -->
            <div class="footer" style="margin-top: 5%">
               <addbar/>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderVue from "../components/Header.vue";
import famecard from "@/components/famecard.vue";
import addone from "@/components/Addone.vue";
import productcard from "../components/productcard.vue";
import localdelivery from "@/components/addon2.vue";
import addtocart from "../components/addtocart.vue";
import addbar from "@/components/addbar.vue";

export default {
    components: {
        HeaderVue,
        famecard,
        addone,
        productcard,
        localdelivery,
        addbar,
        addtocart
    }
}
</script>

<style scoped>
.Mainpage-image-container {
    height: 99vh;
    background-image: url('../assets/mainImage.jpg');
    background-size: cover;
    background-position: right;
    background-repeat: no-repeat;
}
</style>
