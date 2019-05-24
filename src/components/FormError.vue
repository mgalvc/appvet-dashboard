<template>
    <div class="form-group">
        <slot></slot>
        <div v-if="field" class="invalid-feedback">{{ field[0] }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            field: {
                type: Array
            }
        }
    }
</script>
