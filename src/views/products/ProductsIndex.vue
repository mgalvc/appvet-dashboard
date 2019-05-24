<template>
    <div>
        <alert :alerts="alerts" :message="message"></alert>
        <section class="card">
            <content-header title="Produtos">
                <router-link tag="button" class="btn btn-primary btn-sm" to="/products/new">Incluir</router-link>
            </content-header>
            <app-filter :total="params.total" @loadSearch="index">
                <div class="col-auto">
                    <label class="sr-only" for="name">Nome</label>
                    <input type="text" class="form-control mb-2" id="name" placeholder="Nome" v-model="filters.name">
                </div>
                <div class="col-auto">
                    <label class="sr-only" for="category">Categoria</label>
                    <input type="text" class="form-control mb-2" id="category" placeholder="Categoria"
                           v-model="filters.category">
                </div>
            </app-filter>
            <data-grid :thead="thead" :params="params" @loadData="index">
                <tr v-for="product in products">
                    <td>{{ product.name }}</td>
                    <td>R$ {{ product.price }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>{{ product.category }}</td>
                    <td>
                        <router-link :to="`/products/${product.id}`" class="btn btn-info btn-sm"
                                     title="Detalhes">
                            <i class="fa fa-info-circle"></i>
                        </router-link>
                        <router-link :to="`/products/${product.id}/edit`" class="btn btn-success btn-sm"
                                     title="Alterar">
                            <i class="fa fa-pencil-alt"></i>
                        </router-link>
                        <button class="btn btn-danger btn-sm" data-toggle="modal" data-target=".modal-destroy"
                                @click="openModal(product)" title="Remover">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </data-grid>
            <modal-delete :path="element ? `products/${element.id}` : ''"
                          @eventRemove="destroy">{{ element ? element.name : null }}</modal-delete>
        </section>
    </div>
</template>

<script>
    import commonIndex from "@/mixins/commonIndex";

    export default {
        data() {
            return {
                products: [],
                thead: [
                    { title: 'Nome', column: 'name', direction: 'desc', sortable: true },
                    { title: 'Preço', column: 'price', direction: 'desc', sortable: true },
                    { title: 'Quantidade', column: 'quantity', direction: 'desc', sortable: true },
                    { title: 'Categoria', column: 'category', direction: 'desc', sortable: true },
                    { title: '', column: '', direction: '', sortable: false, style: 'three-actions' }
                ],
                params: {
                    column: 'name'
                },
                filters: {
                    name: '',
                    category: ''
                }
            }
        },
        mixins: [commonIndex],
        methods: {
            index () {
                this.$http.get(this.buildURL()).then(response => {
                    console.log(response)
                    this.products = response.body.products
                    this.filters = response.body.filters
                    this.params = response.body.params
                })
            },

            buildURL() {
                let current_page = `?page=${this.params.current_page}`
                let per_page = `&per_page=${this.params.per_page}`
                let direction = `&direction=${this.params.direction}`
                let column = `&column=${this.params.column}`
                let name = this.filters.name === '' ? '' : `&name=${this.filters.name}`
                let category = this.filters.category === '' ? '' : `&category=${this.filters.category}`
                return `products${current_page}${per_page}${column}${direction}${name}${category}`
            }
        }
    }
</script>