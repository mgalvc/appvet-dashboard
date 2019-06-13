<template>
    <div>
        <section id="container" v-if="$store.state.auth.logged">
            <topbar></topbar>
            <sidebar></sidebar>

            <section id="main-content">
                <section class="wrapper">
                    <router-view></router-view>
                </section>
            </section>
        </section>
        <div v-if="!$store.state.auth.logged">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Topbar from './components/Topbar'
    import Sidebar from './components/Sidebar'

    export default {
        components: {
            Topbar,
            Sidebar
        }
    }
</script>

<style>
    textarea.form-control {
        height: 100px;
    }
</style>
