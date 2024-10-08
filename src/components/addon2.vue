<template>
    <div class="addonemain" style="margin-top:5%;width:100%;background-color:#e4ede4;display: flex;">
        <div class="inneraddon" style="width:30%;height: 100%;">
            <a-image :src="require('@/assets/addone.png')" />
        </div>
        <div class="content" style="width:50%;">
            <div class="header" style="margin-top:2%;margin-left: -30%;font-size: 35px;"><b>Local Delivery</b></div>
            <div class="lines" style="margin-top: 4%;margin-left: -34%;font-size: 10px;"> Local delivery 150$ + is
                available with in <b>INDIA</b></div>
            <div class="img-container" style="display: flex;height:100px;margin-top:3%;margin-left:10%;gap:50px;">

                <img src="../assets/cart1.png" alt="">
                <img src="../assets/cart2.png" alt="">
                <img src="../assets/cart3.png" alt="">

            </div>
        </div>



    </div>
</template>
<script>
export default {

}
</script>

<style scoped></style>