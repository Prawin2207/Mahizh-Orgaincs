<template>
    <div class="addonemain" style="margin-top:2%;width:100%;background-color: #daede0;display: flex;">
        <div class="inneraddon" style="width:50%;">
            <a-image
          :src="require('@/assets/addone.png')"
          style="width:100%;"
        />
        </div>
        <div class="content" style="width:50%;">
            <div class="offer" style="margin-top: 20%;margin-left: 10%;font-size: 10px;"><b>Limited Time Only! 30 % off</b></div>
           <div class="productname" style="margin-top: 5%;margin-left: -20%;font-size: 35px;"> <b>Natural Hair-Oil</b></div>
           <div class="content" style="width:60%; margin-left:20%; font-size: 10px;margin-top:10%;">
            With quality, safety and efficacy as our
                mainfocus, we're proud to offer
                organically grown products with only the best ingredients.
           </div>

           <a-button type="primary" style="margin-left: 0%;margin-top: 10%;border-radius:10px;background: linear-gradient(to right, #9cd156, #5aad2d);
">Shop Now</a-button>
        </div>

        

    </div>
</template>
<script>
// import addone from '../assets/addone.png';
export default {
    setup() {
        
    },
}
</script>
<style scoped>

</style>