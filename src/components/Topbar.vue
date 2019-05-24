<template>
    <header class="header white-bg">
        <div class="sidebar-toggle-box">
            <i class="fas fa-bars"></i>
        </div>

        <a href="#" class="logo">AppVet<span>Admin</span></a>
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
        }
    }
</script>