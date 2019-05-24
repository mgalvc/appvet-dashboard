<template>
    <div v-if="params.total !== 0">
        <table class="table table-striped table-advance table-hover">
            <thead>
            <tr>
                <th v-for="item in thead" :class="item.style ? item.style : null">
                    <div v-if="item.sortable" @click="sort(item.column)" :class="params.column === item.column ? 'sorting' : 'sortable'">
                        {{ item.title }}
                    </div>
                    <div v-else>
                        {{ item.title }}
                    </div>
                </th>
            </tr>
            </thead>
            <tbody>
            <slot></slot>
            </tbody>
        </table>
        <div class="row-fluid">
            <div class="registros">
                Exibir
                <select class="form-control" v-model="params.per_page" @change="fetchData">
                    <option>15</option>
                    <option>30</option>
                    <option>45</option>
                </select>
                registros
            </div>
            <div class="pagina">
                Página
                <input type="text" v-model="params.current_page" @keyup.enter="fetchData" class="form-control">
                de {{ params.last_page }}
            </div>
            <ul class="pagination justify-content-end">
                <li class="page-item"><a class="page-link" href="#" @click.prevent="prev">«</a></li>
                <li class="page-item"><a class="page-link" href="#" @click.prevent="next">»</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            thead: {
                required: true,
                type: Array
            },
            params: {
                type: Object
            }
        },
        methods: {
            sort(column) {
                if(column === this.params.column) {
                    if(this.params.direction === 'desc') {
                        this.params.direction = 'asc'
                    } else {
                        this.params.direction = 'desc'
                    }
                } else {
                    this.params.column = column
                    this.params.direction = 'asc'
                }

                this.fetchData();
            },

            next() {
                if(this.params.next_page) {
                    this.params.current_page++
                    this.fetchData();
                }
            },

            prev() {
                if(this.params.prev_page) {
                    this.params.current_page--
                    this.fetchData();
                }
            },

            fetchData() {
                if(this.params.current_page > this.params.last_page) {
                    this.params.current_page = this.params.last_page
                }

                this.$emit('loadData');
            }
        }
    }
</script>

<style scoped>
    .btn {
        margin-right: 5px;
    }
    .table-datetime {
        width: 156px;
    }

    .one-action {
        width: 56px;
    }

    .two-actions {
        width: 100px;
    }

    .three-actions {
        width: 142px;
    }

    .sorting, .sortable, .sortable:before, .sorting:before {
        cursor: pointer;
    }

    .sortable:before, .sorting:before {
        font-family: 'Font Awesome 5 Free';
        opacity: 0.2;
        content: "\f102";
        margin-right: 8px;
    }

    .sorting:before {
        opacity: 0.5;
        content: "\f103";
    }

    .row-fluid {
        width: 100%;
        padding: 0 20px 0 10px;
    }

    input, select {
        width: 65px;
        margin: 0 10px;
    }

    .registros, .pagina, .paginacao {
        float: left;
        width: 43%;
        display: inline-flex;
        line-height: 33px;
    }

    .pagina {
        width: 30%;
    }

    .pagination a {
        color: #797979;
    }
</style>