<template>
    <div>
        <alert :alerts="alerts" :message="message"></alert>
        <section class="card">
            <content-header title="Marcas">
                <router-link tag="button" class="btn btn-primary btn-sm" to="/brands/new">Incluir</router-link>
            </content-header>
            <app-filter :total="params.total" @loadSearch="index">
                <div class="col-auto">
                    <label class="sr-only" for="nome">Nome</label>
                    <input type="text" class="form-control mb-2" id="nome" placeholder="Nome" v-model="filters.description">
                </div>
            </app-filter>
            <data-grid :thead="thead" :params="params" @loadData="index">
                <tr v-for="brand in brands">
                    <td>{{ brand.description }}</td>
                    <td>
                        <router-link :to="`/brands/${brand.id}/edit`" class="btn btn-success btn-sm"
                                     title="Alterar">
                            <i class="fa fa-pencil-alt"></i>
                        </router-link>
                        <button class="btn btn-danger btn-sm" data-toggle="modal" data-target=".modal-destroy"
                                @click="openModal(brand)" title="Remover">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </data-grid>
            <modal-delete :path="element ? `brands/${element.id}` : ''"
                          @eventRemove="destroy">{{ element ? element.description : null }}</modal-delete>
        </section>
    </div>
</template>

<script>
    import commonIndex from "../../mixins/commonIndex";

    export default {
        data() {
            return {
                brands: [],
                thead: [
                    { title: 'Nome', column: 'description', direction: 'desc', sortable: true },
                    { title: '', column: '', direction: '', sortable: false, style: 'two-actions' }
                ],
                params: {
                    column: 'description'
                },
                filters: {
                    description: ''
                }
            }
        },
        mixins: [commonIndex],
        methods: {
            index () {
                this.$http.get(this.buildURL()).then(response => {
                    console.log(response)
                    this.brands = response.body.brands
                    this.filters = response.body.filters
                    this.params = response.body.params
                })
            },

            buildURL() {
                let current_page = `?page=${this.params.current_page}`
                let per_page = `&per_page=${this.params.per_page}`
                let direction = `&direction=${this.params.direction}`
                let column = `&column=${this.params.column}`
                let description = this.filters.description === '' ? '' : `&description=${this.filters.description}`
                return `brands${current_page}${per_page}${column}${direction}${description}`
            }
        }
    }
</script>