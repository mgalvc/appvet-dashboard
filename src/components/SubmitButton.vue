<template>
    <div class="row">
        <button v-if="submitted" class="btn btn-warning btn-sm" disabled>
            <i class="fa fa-sync fa-spin"></i> Enviando</button>
        <slot v-else></slot>
    </div>
</template>

<script>
    export default {
        props: {
            submitted: {
                required: true,
                type: Boolean
            }
        }
    }
</script>

<style scoped>
    .row {
        padding-bottom: 20px;
        width: 100%;
    }

    button {
        width: 100px;
        margin: 0 auto;
    }
</style>
