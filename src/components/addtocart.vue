<template>
    <div>
      <a-button style="color:brown;font-size: 11px;" @click="addToCart(product)">Add to Cart</a-button>
  
      <a-drawer
        title="Your Cart"
        :visible="drawerVisible"
        placement="right"
        @close="drawerVisible = false"
      >
        <div v-for="(item, index) in cart" :key="index" class="cart-item">
          <p>{{ item.name }} - ${{ item.price }}</p>
          <a-input-number v-model="item.quantity" @change="updateQuantity(index, $event)" :min="1" />
          <p>Total: ${{ item.quantity * item.price }}</p>
        </div>
      </a-drawer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawerVisible: false,
        product: {
          name: "Sample Product",
          price: 100,
          quantity: 1
        },
        cart: []
      };
    },
    methods: {
      addToCart(product) {
        const found = this.cart.find(item => item.name === product.name);
        if (found) {
          found.quantity++;
        } else {
          this.cart.push({ ...product });
        }
        this.drawerVisible = true;
      },
      updateQuantity(index, quantity) {
        if (quantity <= 0) {
          this.cart.splice(index, 1); // Remove item if quantity is less than 1
        } else {
          this.cart[index].quantity = quantity;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .cart-item {
    margin-bottom: 20px;
  }
  </style>
  