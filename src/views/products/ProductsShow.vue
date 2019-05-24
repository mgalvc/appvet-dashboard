<template>
    <div>
        <section class="card">
            <content-header title="Detalhes do produto">
                <router-link tag="button" class="btn btn-default btn-sm" to="/products" title="Voltar">
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
    import Product from "@/domain/product/Product"

    export default {
        data () {
            return {
                product: new Product(),
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
            pictureData() {
                return this.product.picture ? this.product.picture : ' - '
            },
            detailType() {
                return this.product.picture ? 'image' : ''
            }
        },
        methods: {
            show() {
                this.$http.get(`products/${this.id}`)
                    .then(response => {
                        this.product = response.body

                        this.$nextTick(function () {
                            this.title = this.product.name

                            this.itens = [
                                { title: 'Nome:', value: this.product.name },
                                { title: 'Preço:', value: 'R$ ' + this.product.price },
                                { title: 'Quantidade:', value: this.product.quantity },
                                { title: 'Descrição:', value: this.product.description },
                                { title: 'Categoria:', value: this.product.category },
                                { title: 'Sub categoria:', value: this.product.subcategory ? this.product.subcategory
                               : ' - ' },
                                { title: 'Marca:', value: this.product.brand ? this.product.brand.description
                               : ' - ' },
                                { title: 'Criado:', value: this.product.created_at },
                                { title: 'Modificado:', value: this.product.updated_at },
                                { title: 'Imagem:', value: this.pictureData, type: this.detailType }
                            ]
                        })
                    })
            }
        }
    }
</script>
