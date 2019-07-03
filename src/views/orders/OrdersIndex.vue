<template>
    <div class="row">
        <div class="col-lg-12">
            <!--widget start-->
            <section class="card">
                <header class="card-header tab-bg-dark-navy-blue p-0">
                    <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="waiting-tab" data-toggle="tab" href="#waiting" role="tab"
                               aria-controls="waiting" aria-selected="true">Aguardando</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="sent-tab" data-toggle="tab" href="#sent" role="tab"
                               aria-controls="sent" aria-selected="false">Enviados</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="received-tab" data-toggle="tab" href="#received" role="tab"
                               aria-controls="received" aria-selected="false">Finalizados</a>
                        </li>
                    </ul>
                </header>
                <div class="card-body">
                    <div class="tab-content tasi-tab" id="myTabContent">
                        <div class="tab-pane fade show active" id="waiting" role="tabpanel"
                             aria-labelledby="waiting-tab">
                            <div class="row">
                                <div v-for="order in orders.waiting" :key="order.id" class="col-lg-4">
                                    <order-card showOptions="true" @deleted="index" :order="order"></order-card>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="sent" role="tabpanel" aria-labelledby="sent-tab">
                            <div class="row">
                                <div v-for="order in orders.sent" :key="order.id" class="col-lg-4">
                                    <order-card showSentTime="true" :order="order"></order-card>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="received" role="tabpanel" aria-labelledby="received-tab">
                            <div class="row">
                                <div v-for="order in received" :key="order.id" class="col-lg-4">
                                    <order-card showSentTime="true" showReceivedTime="true" :order="order"></order-card>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <!--widget end-->
        </div>
    </div>
</template>

<script>
    import commonIndex from "@/mixins/commonIndex";
    import OrderCard from  "./OrderCard"

    export default {
        components: {
            'order-card': OrderCard
        },
        data() {
            return {
                orders: {},
                received: {},
                params: {
                    column: 'created_at'
                },
                filters: {
                    status: 'waiting'
                }
            }
        },
        mixins: [commonIndex],
        methods: {
            reload() {
                this.$http.get('orders_grouped').then(response => {
                    console.log(response)
                    this.orders = response.body.orders
                    this.filters = response.body.filters
                    this.params = response.body.params
                })
                this.loadReceived();
            },
            loadReceived() {
                this.$http.get('orders_grouped?status=received&last=3').then(response => {
                    console.log(response)
                    this.received = response.body.orders.received
                })
            },
            index () {
                this.$http.get(this.buildURL()).then(response => {
                    console.log(response)
                    this.orders = response.body.orders
                    this.filters = response.body.filters
                    this.params = response.body.params
                })
                this.loadReceived();
            },

            buildURL() {
                return `orders_grouped`
            }
        }
    }
</script>