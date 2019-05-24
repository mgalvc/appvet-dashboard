<template>
    <section id="container">
        <topbar></topbar>
        <sidebar></sidebar>

        <section id="main-content">
            <section class="wrapper">
                <router-view></router-view>
            </section>
        </section>
    </section>
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
