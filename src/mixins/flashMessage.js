export default {
    created () {
        this.flashMessage()
    },
    methods: {
        flashMessage () {
            this.message = localStorage ? localStorage.getItem('message') : null
            this.alerts = localStorage ? JSON.parse(localStorage.getItem('alerts')) : null
            localStorage.removeItem('message')
            localStorage.removeItem('alerts')
        }
    }
}