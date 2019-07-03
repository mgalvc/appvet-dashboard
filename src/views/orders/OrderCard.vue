<template>
    <section class="card">
        <div class="card-body">
            <div class="task-thumb-details">
                <h1><a href="#">{{ client.name }}</a></h1>
                <p class="client-details">{{ order.delivery_address }}</p>
                <p class="client-details">{{ client.email }}</p>
                <p class="client-details">{{ client.phone }}</p>
                <p v-if="showSentTime"
                   class="client-details"><b>Saiu: {{ new Date(order.sent_at).toLocaleString('pt') }}</b></p>
                <p v-if="showReceivedTime" class="client-details"><b>Entregue: {{ new
                    Date(order.updated_at).toLocaleString('pt')
                    }}</b></p>
            </div>
        </div>
        <table class="table table-hover personal-task">
            <tbody>
                <tr v-for="item in items">
                    <td>{{ item.name }}</td>
                    <td><span class="badge badge-success"> {{ item.quantity }}</span></td>
                </tr>
            </tbody>
        </table>
        <div class="card-footer">
            <div class="row">
                <div class="col price">
                    R$ {{ order.price }}
                </div>
                <div v-if="showOptions" class="col options">
                    <button class="btn btn-danger btn-sm" @click="openCancelModal()" title="Cancelar">
                        <i class="fa fa-trash"></i>
                    </button>
                    <button class="btn btn-success btn-sm" @click="openConfirmModal()" title="Confirmar">
                        <i class="fa fa-check"></i>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import alertify from 'alertifyjs';

    export default {
        props: ['order', 'show-options', 'show-sent-time', 'show-received-time'],
        data() {
            return {
                client: {
                    name: '',
                    email: '',
                    phone: ''
                },
                items: [],
                element: {}
            }
        },
        methods: {
            openConfirmModal() {
                alertify.confirm(
                    'Confirmar envio',
                    'Confirma que este pedido já saiu para entrega?',
                    () => {
                        this.$http.put(`send_order/${this.order.id}`).then(response => {
                            if (response.body.success) {
                                alertify.success('Pedido enviado');
                                this.$emit('deleted');
                            } else {
                                for (let error of response.body.errors) {
                                    alertify.error(error);
                                }
                            }
                        })
                    },
                    () => { }
                );
            },
            openCancelModal() {
                alertify.confirm(
                    'Cancelar pedido',
                    'Deseja realmente cancelar este pedido?',
                    () => {
                        this.$http.delete(`orders/${this.order.id}`).then(response => {
                            if (response.status === 200) {
                                alertify.success('Pedido cancelado');
                                this.$emit('deleted');
                            }
                        })
                    },
                    () => { }
                );
            },
            loadDetails() {
                this.$http.get(`clients/${this.order.client_id}`).then(response => {
                    this.client.name = response.body.name;
                    this.client.email = response.body.email;
                    this.client.phone = response.body.phone;
                });

                this.$http.get(`order_items/${this.order.id}`).then(response => {
                    for (let bulk of response.body) {
                        this.items.push({ name: bulk.product.name, quantity: bulk.quantity });
                    }
                });
            }
        },
        updated() {
            //this.loadDetails();
        },
        mounted() {
            this.loadDetails();
        }
    }
</script>

<style scoped>
    .card {
        box-shadow: 1px 1px 5px darkgrey;
    }

    .card-footer {
        font-size: 1.2em;
    }

    .client-details {
        margin-bottom: -5px;
    }

    .price {
        align-self: center;
    }

    .options {
        text-align: right;
    }

    .options button {
        margin-left: 10px;
    }
</style>