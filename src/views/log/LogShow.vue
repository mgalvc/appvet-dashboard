<template>
    <div>
        <section class="card">
            <content-header title="Detalhes do registro">
                <router-link tag="button" class="btn btn-default btn-sm" to="/logs" title="Voltar">
                    <i class="fa fa-undo"></i>
                </router-link>
            </content-header>
        </section>
        <detail :itens="itens" :title="title"></detail>
    </div>
</template>

<script>
    import ContentHeader from '@/components/ContentHeader'
    import Detail from '@/components/Detail'
    import Log from "@/domain/log/Log"

    export default {
        data () {
            return {
                log: new Log(),
                id: this.$route.params.id,
                title: '',
                itens: []
            }
        },
        components: {
            'content-header': ContentHeader,
            'detail': Detail
        },
        created () {
            this.show()
        },
        computed: {

        },
        methods: {
            show() {
                this.$http.get(`histories/${this.id}`)
                    .then(response => {
                        this.log = response.body

                        this.$nextTick(function () {
                            this.title = 'Pedido de ' + this.log.client

                            this.itens = [
                                { title: 'Cliente:', value: this.log.client },
                                { title: 'Data do pedido:', value:
                                        new Date(this.log.order_date).toLocaleString('pt') },
                                { title: 'Data da entrega:', value:
                                        new Date(this.log.delivery_date).toLocaleString('pt') },
                                { title: 'Endereço da entrega:', value: this.log.delivery_address },
                                { title: 'Produtos:', value: this.log.products },
                                { title: 'Preço:', value: 'R$ ' + this.log.price },
                            ]
                        })
                    })
            }
        }
    }
</script>
