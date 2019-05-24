<template>
    <div class="modal fade modal-destroy" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-gray-custom">
                    <h5 class="modal-title">Exclusão de registro</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <p>Você tem certeza que deseja excluir o registro?</p>
                    <span class="record-delete">
                        <slot></slot>
                    </span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal"><i class="fa fa-times"></i> Não</button>
                    <button type="button" class="btn btn-success btn-sm" data-dismiss="modal" @click="confirm"><i class="fa fa-check"></i> Sim</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            path: {
                required: true,
                type: String
            }
        },
        methods: {
            confirm () {
                this.$emit('eventRemove', this.path);
            }
        }
    }
</script>

<style scoped>
    .record-delete {
        font-weight: bold;
        color: #db2828;
    }

    .bg-gray-custom {
        background-color: #f4f4f4;
    }
</style>