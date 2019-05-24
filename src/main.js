import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueResource)
//Vue.http.options.root = 'localhost:3000'

Vue.config.productionTip = false

Vue.http.options.root = 'http://localhost:3000/'
Vue.http.interceptors.push((request, next) => {
    Vue.http.headers.common['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJpc19hZG1pbiI6dHJ1ZSwiZXhwIjoxNTU4NzE0MDQ3fQ.kuoNHgELbj4GIk7RiCsxl18njr2stDR_4ix-jPr-de0'
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
