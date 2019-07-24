<template>
    <div>
        <alert :alerts="alerts" :message="message"></alert>
        <section class="card">
            <content-header title="Histórico de vendas">
                <div class="col-auto">
                    <b>Comissão de</b>
                    <select @change="loadBill" class="form-control bill-month" v-model="month">
                        <option value="" disabled>Selecione uma opção</option>
                        <option v-for="month in months" :value="month.value" :key="month.key">{{ month.option
                            }}</option>
                    </select>
                    <b>: R$ {{ bill }}</b>
                </div>
            </content-header>
            <div>
            <app-filter :total="params.total" @loadSearch="index">
                <div class="col-auto">
                    <label class="sr-only" for="month">Mês</label>
                    <select class="form-control mb-2" id="month" v-model="filters.month">
                        <option value="" disabled>Selecione uma opção</option>
                        <option v-for="month in months" :value="month.value" :key="month.key">{{ month.option
                            }}</option>
                    </select>
                </div>
                <div class="col-auto">
                    <label class="sr-only" for="year">Ano</label>
                    <input type="number" min="2019" step="1" class="form-control mb-2" id="year" placeholder="Ano"
                           v-model="filters.year">
                </div>
            </app-filter>
            </div>
            <data-grid :thead="thead" :params="params" @loadData="index">
                <tr v-for="log in logs">
                    <td>{{ log.client }}</td>
                    <td>{{ new Date(log.delivery_date).toLocaleString('pt') }}</td>
                    <td>R$ {{ log.price }}</td>
                    <td>
                        <router-link :to="`/logs/${log.id}`" class="btn btn-info btn-sm"
                                     title="Detalhes">
                            <i class="fa fa-info-circle"></i>
                        </router-link>
                    </td>
                </tr>
            </data-grid>
        </section>
    </div>
</template>

<script>
    import commonIndex from "@/mixins/commonIndex";
    import Dropdown from '@/components/Dropdown'

    export default {
        components: {
            'dropdown': Dropdown
        },
        data() {
            return {
                logs: [],
                month: new Date().getUTCMonth() + 1,
                year: new Date().getFullYear(),
                months: [
                    { key: 0, option: 'Janeiro', value: 1 },
                    { key: 1, option: 'Fevereiro', value: 2 },
                    { key: 2, option: 'Março', value: 3 },
                    { key: 3, option: 'Abril', value: 4 },
                    { key: 4, option: 'Maio', value: 5 },
                    { key: 5, option: 'Junho', value: 6 },
                    { key: 6, option: 'Julho', value: 7 },
                    { key: 7, option: 'Agosto', value: 8 },
                    { key: 8, option: 'Setembro', value: 9 },
                    { key: 9, option: 'Outubro', value: 10 },
                    { key: 10, option: 'Novembro', value: 11 },
                    { key: 11, option: 'Dezembro', value: 12 },
                ],
                total: 0,
                bill: 0,
                thead: [
                    { title: 'Cliente', column: 'client', direction: 'desc', sortable: true },
                    { title: 'Entregue em', column: 'delivery_date', direction: 'desc', sortable: true },
                    { title: 'Preço', column: 'price', direction: 'desc', sortable: true },
                    { title: '', column: '', direction: '', sortable: false, style: 'one-action' }
                ],
                params: {
                    column: 'delivery_date',
                    direction: 'desc'
                },
                filters: {
                    month: '',
                    year: ''
                }
            }
        },
        mixins: [commonIndex],
        methods: {
            index () {
                this.$http.get(this.buildURL()).then(response => {
                    console.log(response)
                    this.logs = response.body.histories
                    this.params = response.body.params
                })

                this.loadBill()
            },

            loadBill() {
                this.$http.get(`histories/bill?month=${this.month}`).then(response => {
                    this.total = response.body.total
                    this.bill = response.body.bill
                })
            },

            buildURL() {
                let current_page = `?page=${this.params.current_page}`
                let per_page = `&per_page=${this.params.per_page}`
                let direction = `&direction=${this.params.direction}`
                let column = `&column=${this.params.column}`
                let year = this.filters.year ? `&year=${this.filters.year}` : ''
                let month = this.filters.month ? `&month=${this.filters.month}` : ''
                return `histories${current_page}${per_page}${column}${direction}${year}${month}`
            }
        }
    }
</script>

<style scoped>
    .bill-month {
        display: inline;
        width: auto;
        margin-left: 7px;
        margin-right: 7px;
        height: 35px;
    }
</style>