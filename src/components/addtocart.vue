<template>
  <div>
    <!-- Add to Cart Button -->
    <a-button style="color:brown;font-size: 11px;" @click="addToCart(product)">
      Add to Cart
    </a-button>

    <!-- Cart Drawer -->
    <a-drawer
      title="Your Cart"
      :visible="drawerVisible"
      placement="right"
      @close="drawerVisible = false"
    >
      <!-- Cart Items -->
      <div v-for="(item, index) in cart" :key="index" class="cart-item">
        <p>{{ item.name }} - ${{ item.price }}</p>
        <a-input-number
          v-model="item.quantity"
          @change="updateQuantity(index, $event)"
          :min="1"
        />
        <p>Total: ${{ item.quantity * item.price }}</p>
      </div>

      <!-- Cart Total -->
      <div v-if="cart.length" class="cart-total">
        <p><b>Cart Total: ${{ cartTotal }}</b></p>
      </div>
      <div v-else>
        <p>Your cart is empty.</p>
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
  computed: {
    cartTotal() {
      return this.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    }
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
.cart-total {
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
</style>
