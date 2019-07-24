<template>
    <aside>
        <div id="sidebar"  class="nav-collapse">
            <ul class="sidebar-menu" id="nav-accordion">
                <li>
                    <router-link to="/" class="active">
                        <i class="fas fa-home"></i>
                        <span>Home</span>
                    </router-link>
                </li>

                <li class="sub-menu">
                    <a href="javascript:;" >
                        <i class="fas fa-store"></i>
                        <span>Vendas</span>
                    </a>
                    <ul class="sub">
                        <li><router-link to="/products">Produtos</router-link></li>
                        <li><router-link to="/brands">Marcas</router-link></li>
                    </ul>
                </li>

                <li>
                    <router-link to="/orders">
                        <i class="fas fa-cart-arrow-down"></i>
                        <span>Pedidos</span>
                    </router-link>
                </li>

                <li>
                    <router-link to="/logs">
                        <i class="fas fa-history"></i>
                        <span>Histórico</span>
                    </router-link>
                </li>
            </ul>
            <!-- sidebar menu end-->
        </div>
    </aside>

</template>

<script>
    export default {
        mounted() {
            let sidebar = $("#sidebar");

            $('#nav-accordion').dcAccordion({
                eventType: 'click',
                autoClose: true,
                saveState: true,
                disableLink: true,
                speed: 'slow',
                showCount: false,
                autoExpand: true,
//        cookie: 'dcjq-accordion-1',
                classExpand: 'dcjq-current-parent'
            });

            sidebar.niceScroll({
                styler:"fb",
                cursorcolor:"#e8403f",
                cursorwidth: '3',
                cursorborderradius: '10px',
                background: '#404040',
                spacebarenabled:false,
                cursorborder: '',
                scrollspeed: 60
            });
        }
    }
</script>