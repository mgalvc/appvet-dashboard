<template>
    <header class="header white-bg">
        <div class="sidebar-toggle-box">
            <i class="fas fa-bars"></i>
        </div>

        <a href="#" class="logo">AppVet<span>Admin</span></a>

        <div class="top-nav">
            <ul class="nav float-right top-menu">
                <li class="dropdown">
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                        <span class="username">Olá, {{ $store.state.auth.user }} </span>
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu extended logout dropdown-menu-right">
                        <div class="log-arrow-up"></div>
                        <!--<li><a href="#"><i class=" fa fa-suitcase"></i>Meu perfil</a></li>-->
                        <!--<li><a href="#"><i class="fa fa-cog"></i> Configurações</a></li>-->
                        <!--<li><a href="#"><i class="fa fa-bell"></i> Notificações</a></li>-->
                        <li><a href="#" @click.prevent="logout"><i class="fa fa-key"></i> Desconectar</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
    export default {
        mounted() {
            $('.sidebar-toggle-box').on('click', function () {
                $(document.body).toggleClass('is-sidebar-nav-open');

                var owl = $("#owl-demo").data("owlCarousel");
                owl.reinit();
            });
        },
        methods: {
            logout() {
                this.$store.commit('logout')
                this.$router.push('/auth')
            }
        }
    }
</script>