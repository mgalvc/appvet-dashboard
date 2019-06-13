import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        auth: {
            logged: false,
            token: '',
            user: ''
        }
    },
    mutations: {
        login(state, info) {
            state.auth = {
                logged: true,
                token: info.token,
                user: info.user
            }
        },
        logout(state) {
            state.auth = {
                logged: false,
                token: '',
                user: ''
            }
        }
    },
    actions: {

    }
})
