<template>
    <div v-if="message" class="alert" :class="`alert-${alerts.status}`">
        <h5>{{ alerts.title }}</h5>
        <p>{{ message }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            alerts: {
                type: Object
            },
            message: {
                type: String
            }
        }
    }
</script>

<style scoped>
    h5, p {
        margin-bottom: 2px;
    }

    .alert {
        padding: 10px 15px;
    }
</style>