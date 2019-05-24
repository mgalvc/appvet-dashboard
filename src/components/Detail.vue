<template>
    <div class="row">
        <div class="col-md-12">
            <section class="card">
                <div class="detail-heading">
                    <strong>{{ title }}</strong>
                </div>
                <div class="card-body">
                    <div class="row p-details">
                        <div v-for="item in itens">
                            <p v-if="item.type === 'image'">
                                <span>{{ item.title }}</span>
                                <img class="img-thumbnail" :src="item.value" alt="">
                            </p>
                            <p v-else>
                                <span>{{ item.title }}</span> {{ item.value }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                required: true,
                type: String
            },
            itens: {
                required: true,
                type: Array
            }
        }
    }
</script>

<style scoped>
    .row {
        margin-top: 20px;
    }

    .p-details > div {
        width: 33.33%;
        float: left;
        margin-bottom: 10px;
        padding: 0 15px;
    }

    .p-details > div p span {
        font-weight: bold;
        display: block;
    }

    .detail-heading {
        background: #FF6C60;
        color: #fff;
        text-align: center;
        font-style: italic;
        padding: 15px 0;
        border-radius: 4px 4px 0 0;
        font-size: 20px;
        font-weight: 300;
    }

    img {
        margin-top: 10px;
    }
</style>