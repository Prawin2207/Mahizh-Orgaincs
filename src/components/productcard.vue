<template>
    <div class="productmain">
        <div class="product" style="width:40%;margin-left:19%;margin-top:5%;">
            <a-image style="height: 0%" :src="require('@/assets/p1.png')" />

        </div>
        <div class="productname" style="margin-left:-22%;margin-top:5%;font-size:11px;justify-content: center;text-align: center;">natural Hair</div>
        <div class="price" style="width:50%;margin-left:13%;color:green;margin-top:4%;font-size:12px;"> $ 4550 <span
                style="margin-left:5%;color: red;"><del>500000</del></span></div>
        <div class="addcart" style="width:15%;margin-left:18%;margin-top:1.9%;">
            <a-space>
                <!-- <a-button style="color:brown;font-size: 11px;" type="text">Add to Cart</a-button> -->
                   <addkartbutton />
            </a-space>
        </div>


    </div>

</template>

<script>
import addkartbutton from "../components/addtocart.vue";
export default {
    components:{
        addkartbutton
    }

}
</script>
<a-space>
    <a-button type="text">Text</a-button>
    <a-button type="text" disabled>Text(disabled)</a-button>
  </a-space>
<style scoped></style>