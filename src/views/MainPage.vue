<template>
    <div>
        <div class="WholeWeb">
            <div class="Mainpage-image-container">
                <HeaderVue />
                <p class="premium-text scroll-fade">PREMIUM HEMP PRODUCTS</p>
                <div class="paradiv">
                    <p class="main-heading scroll-fade">Mahizh ORGANICS</p>
                </div>
                <div class="para">
                    <p class="description-text scroll-fade">
                        Using organic farming methods, premium ingredients,<br> and meticulous care, we're able to
                        produce powerful <br>family-friendly hemp products at a reasonable price.
                    </p>
                </div>
                <!-- Button for SHOP NOW -->
                <a-button type="primary" class="shop-now-btn scroll-fade">
                    SHOP NOW
                </a-button>
            </div>

            <!-- First Page Section -->
            <div class="firstpage scroll-slide-up">
                <famecard />
                <addone />
            </div>

            <!-- Second Page Section -->
            <div class="secoundpage scroll-slide-up">
                <p class="our-products"><b>OUR PRODUCTS</b></p>
                <div class="products">
                    <productcard />
                    <productcard />
                    <productcard />
                    <productcard />
                    <productcard />
                </div>
            </div>

            <!-- Third Page Section -->
            <div class="thirdpage scroll-slide-up">
                <div class="local-delivery-image">
                    <localdelivery />
                </div>
            </div>

            <!-- Footer Section -->
            <div class="footer scroll-slide-up">
                <addbar />
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
const axios = require('axios');

export default {
    components: {
        HeaderVue,
        famecard,
        addone,
        productcard,
        localdelivery,
        addbar,
        addtocart
    },
    mounted() {
        // IntersectionObserver for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        });

        // Target all elements with the scroll animation classes
        document.querySelectorAll('.scroll-fade, .scroll-slide-up').forEach(el => {
            observer.observe(el);
        });
        this.getproducts();
    },
    methods: {

        async getproducts() {

            axios.get('/server/mahizh_organics_function/getproducts')

                .then(response => {
                    console.log("getproduct",response.data); // handle success
                })
                .catch(error => {
                    console.error(error); // handle error
                });

        }
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
    animation: fadeIn 1.5s ease-in-out;
}

/* Scroll Animations */
@keyframes fadeInScroll {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideUpScroll {
    from {
        opacity: 0;
        transform: translateY(50px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Elements that fade in on scroll */
.scroll-fade {
    opacity: 0;
    transition: opacity 1s ease, transform 1s ease;
}

.scroll-slide-up {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s ease, transform 1s ease;
}

.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Existing CSS */
.premium-text {
    margin-top: 9%;
    margin-left: -63%;
    font-size: smaller;
    font-weight: 500;
    color: grey;
    letter-spacing: 1px;
    opacity: 0;
    animation: slideIn 2s ease forwards;
}

.main-heading {
    margin-top: 0px;
    margin-left: -53%;
    font-size: 35px;
    font-weight: 500;
    color: #805855;
    /* Softer, more premium color */
    letter-spacing: 1px;
    opacity: 0;
    animation: slideIn 2s ease forwards 0.5s;
}

.description-text {
    margin-top: 20px;
    margin-left: -51%;
    font-size: 11px;
    font-weight: 500;
    color: #6e6e6e;
    letter-spacing: 1px;
    line-height: 1.5;
    opacity: 0;
    animation: fadeIn 2.5s ease forwards 1s;
}

@keyframes slideIn {
    from {
        transform: translateX(-50px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.shop-now-btn {
    margin-left: -72%;
    margin-top: 4%;
    border-radius: 10px;
    background: linear-gradient(to right, #d3b8b4, #805855);
    transition: background 0.3s ease, transform 0.3s ease;
}

.shop-now-btn:hover {
    background: linear-gradient(to right, #805855, #d3b8b4);
    transform: scale(1.05);
}

/* Page Section Styles */
.firstpage,
.secoundpage {
    width: 75%;
    margin-left: 13%;
    background-color: white;
    margin-top: 2%;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.our-products {
    margin-top: 3%;
    font-size: 28px;
    color: #333;
}

.products {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
}

.productcard {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.productcard:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.thirdpage {
    height: 42vh;
    background-color: white;
    width: 75%;
    margin-left: 13%;
    margin-top: 2%;
    padding: 20px;
}

.footer {
    margin-top: 5%;
    background-color: #f8f8f8;
    padding: 20px;
    text-align: center;
}

html {
    scroll-behavior: smooth;
}
</style>
