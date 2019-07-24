import Vue from 'vue'
import VueAlertify from 'vue-alertify'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueResource)
//Vue.http.options.root = 'localhost:3000'

Vue.config.productionTip = false

Vue.http.options.root = 'http://localhost:3000/'
// Vue.http.options.root = 'http://10.0.0.111:3000/'
Vue.http.interceptors.push((request, next) => {
    Vue.http.headers.common['Authorization'] = 'Bearer ' + store.state.auth.token

    next(response => {
        if(response.status === 401) {
            store.commit('logout')
            router.push('/auth')
        }
    })
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')