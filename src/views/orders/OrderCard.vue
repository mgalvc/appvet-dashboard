<template>
    <section class="card">
        <div class="card-body">
            <div class="task-thumb-details">
                <h1><a href="#">{{ client.name }}</a></h1>
                <p class="client-details">{{ order.delivery_address }}</p>
                <p class="client-details">{{ client.email }}</p>
                <p class="client-details">{{ client.phone }}</p>
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
        <div class="card-footer">R$ {{ order.price }}</div>
    </section>
</template>

<script>
    export default {
        props: ['order'],
        data() {
            return {
                client: {
                    name: '',
                    email: '',
                    phone: ''
                },
                items: []
            }
        },
        mounted() {
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
</style>