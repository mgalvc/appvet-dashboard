<template>
    <div>
        <div class="row state-overview">
            <div class="col-lg-3 col-sm-6">
                <section class="card">
                    <div class="symbol yellow">
                        <i class="fa fa-shopping-cart"></i>
                    </div>
                    <div class="value">
                        <h1 class="count">
                            {{ overview.open_orders_count }}
                        </h1>
                        <p>pedidos em aberto</p>
                    </div>
                </section>
            </div>

            <div class="col-lg-3 col-sm-6">
                <section class="card">
                    <div class="symbol blue">
                        <i class="fa fa-location-arrow"></i>
                    </div>
                    <div class="value">
                        <h1 class="count">
                            {{ overview.sent_orders_count }}
                        </h1>
                        <p>pedidos enviados</p>
                    </div>
                </section>
            </div>

            <div class="col-lg-3 col-sm-6">
                <section class="card">
                    <div class="symbol green">
                        <i class="fa fa-check"></i>
                    </div>
                    <div class="value">
                        <h1 class="count">
                            {{ overview.received_orders_count }}
                        </h1>
                        <p>pedidos entregues</p>
                    </div>
                </section>
            </div>
        </div>

        <div class="row state-overview">
            <div class="col-lg-3 col-sm-6">
                <section class="card">
                    <div class="symbol red">
                        <i class="fa fa-tags"></i>
                    </div>
                    <div class="value">
                        <h1 class="count">
                            {{ overview.products }}
                        </h1>
                        <p>produtos cadastrados</p>
                    </div>
                </section>
            </div>

            <div class="col-lg-6 col-sm-6">
                <section class="card">
                    <div class="symbol terques">
                        <i class="fa fa-cash-register"></i>
                    </div>
                    <div class="value">
                        <h1 class="count">
                            R$ {{ overview.sells }}
                        </h1>
                        <p>em vendas realizadas</p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import commonIndex from "@/mixins/commonIndex";

    export default {
        mixins: [commonIndex],
        data() {
            return {
                overview: {}
            }
        },
        methods: {
            index() {
                this.$http.get(this.buildURL()).then(response => {
                    this.overview = response.body;
                    this.overview.sells = this.overview.sells.toString().replace('.', ',')
                })
            },
            buildURL() {
                return 'admin/overview';
            }
        }
    }
</script>
