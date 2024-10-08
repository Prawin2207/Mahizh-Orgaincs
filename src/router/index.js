import { createRouter, createWebHistory } from 'vue-router'
import SignUpVueView from '../views/SignUpVue.vue'
import headervue from '../components/Header.vue'
import MainPage from "../views/MainPage.vue";
import addtocart from "../components/addtocart.vue";
import footer from "../components/addbar.vue";
import AdminProductAdding from '@/components/AdminProductAdding.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MainPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
