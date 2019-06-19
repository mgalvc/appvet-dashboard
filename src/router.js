import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import BrandsIndex from './views/brands/BrandsIndex'
import BrandsForm from './views/brands/BrandsForm'
import ProductsIndex from './views/products/ProductsIndex'
import ProductsForm from './views/products/ProductsForm'
import ProductsShow from './views/products/ProductsShow'
import Login from './views/login/Login'
import OrdersIndex from './views/orders/OrdersIndex'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/brands',
            name: 'brands',
            component: BrandsIndex
        },
        {
            path: '/brands/new',
            name: 'brands-new',
            component: BrandsForm
        },
        {
            path: '/brands/:id/edit',
            name: 'brands-edit',
            component: BrandsForm
        },
        {
            path: '/products',
            name: 'products',
            component: ProductsIndex
        },
        {
            path: '/products/new',
            name: 'products-new',
            component: ProductsForm
        },
        {
            path: '/products/:id/edit',
            name: 'products-edit',
            component: ProductsForm
        },
        {
            path: '/products/:id',
            name: 'products-show',
            component: ProductsShow
        },
        {
            path: '/auth',
            name: 'auth',
            component: Login
        },
        {
            path: '/orders',
            name: 'orders-index',
            component: OrdersIndex
        }
    ]
})
