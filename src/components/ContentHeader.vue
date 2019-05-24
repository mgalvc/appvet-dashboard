<template>
    <header class="card-header">
        {{ title }}
        <span class="float-right">
            <slot></slot>
        </span>
    </header>
</template>

<script>
    export default {
        props: {
            title: {
                required: true,
                type: String
            }
        }
    }
</script>

<style scoped>
    .card-header {
        font-size: 16px;
        background-color: #fff;
        font-weight: 300;
    }
</style>