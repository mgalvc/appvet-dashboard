<template>
    <div>
        <div class="card-body">
            <div class="form-row align-items-center">
                <slot></slot>
                <div class="col-auto">
                    <button class="btn btn-secondary btn-sm mb-2" @click="search">
                        <i class="fa fa-search"></i> Pesquisar</button>
                </div>
            </div>
        </div>
        <div class="card-body total">
            <span v-if="total === 0" class="text-danger"><b>Não há informações registradas no sistema.</b></span>
            <span v-else>Total de registros cadastrados: <b>{{ total }}</b></span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            total: {
                required: true,
                type: Number
            }
        },
        methods: {
            search() {
                this.$emit('loadSearch');
            }
        }
    }
</script>

<style scoped>
    .total {
        border-top: 1px solid rgba(0, 0, 0, 0.125);
    }
</style>