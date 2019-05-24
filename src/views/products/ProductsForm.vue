<template>
    <div>
        <alert :alerts="alerts" :message="message"></alert>
        <section class="card">
            <content-header :title="addTitle">
                <router-link tag="button" class="btn btn-default btn-sm" to="/products" title="Voltar">
                    <i class="fa fa-undo"></i>
                </router-link>
            </content-header>
            <div class="card-body">
                <div class="form-row">
                    <form-error :field="errors.name" class="col-md-6 mb-3">
                        <label for="name">* Nome:</label>
                        <input type="text" class="form-control" id="name" v-model="product.name" autocomplete="off"
                               :class="[errors.name ?
                         'is-invalid' : '']"/>
                    </form-error>
                    <form-error :field="errors.price" class="col-md-3 mb-3">
                        <label for="price">* Preço</label>
                        <decimal id="price" v-model="product.price" :val="product.price"></decimal>
                    </form-error>
                    <form-error :field="errors.quantity" class="col-md-3 mb-3">
                        <label for="quantity">* Quantidade</label>
                        <integer id="quantity" v-model="product.quantity" :val="product.quantity"></integer>
                    </form-error>
                </div>
                <div class="form-row">
                    <form-error :field="errors.description" class="col-md-12 mb-3">
                        <label for="description">* Descrição</label>
                        <textarea class="form-control" id="description" v-model="product.description"
                                  autocomplete="off" :class="[errors.description ? 'is-invalid' : '']"></textarea>
                    </form-error>
                </div>
                <div class="form-row">
                    <form-error :field="errors.category" class="col-md-4 mb-3">
                        <label for="category">* Categoria:</label>
                        <select class="form-control" id="category" v-model="product.category">
                            <option value="" disabled>Selecione uma opção</option>
                            <option v-for="category in categories"
                                    :value="category.option"
                                    :key="category.key">
                                {{ category.option }}
                            </option>
                        </select>
                    </form-error>
                    <form-error :field="errors.subcategory" class="col-md-4 mb-3">
                        <label for="sub_category">* Sub categoria:</label>
                        <select class="form-control" id="sub_category" v-model="product.subcategory">
                            <option value="" disabled>Selecione uma opção</option>
                            <option v-for="sub in subcategories[selectedCategory()]"
                                    :value="sub.option"
                                    :key="sub.key">
                                {{ sub.option }}
                            </option>
                        </select>
                    </form-error>
                    <form-error :field="errors.brand_id" class="col-md-4 mb-3">
                        <label for="brand">Marca:</label>
                        <dropdown v-model="product.brand_id" :itens="brands" id="brand"></dropdown>
                    </form-error>
                </div>
                <div class="form-row">
                    <form-error :field="errors.pictures" class="col-md-12 mb-3">
                        <label for="category">Imagens:</label>
                        <div class="form-row">
                            <div class="col-md-2">
                                <image-upload v-model="product.picture" :files="product.picture"></image-upload>
                            </div>
                        </div>
                    </form-error>
                </div>
                <submit-button :submitted="submitted">
                    <button v-if="product.name && product.description && product.price && product.quantity &&
                    product.category"
                            class="btn btn-success btn-sm" @click="save">
                        <i class="fa fa-check"></i> Salvar</button>
                </submit-button>
            </div>
        </section>
    </div>
</template>

<script>
    import Dropdown from '@/components/Dropdown'
    import Integer from '@/components/Integer'
    import Decimal from '@/components/Decimal'
    import commonForm from "@/mixins/commonForm"
    import Product from "@/domain/product/Product"
    import BrandService from "@/domain/brand/BrandService"
    import ImageUpload from "@/components/ImageUpload"

    export default {
        data () {
            return {
                product: new Product(),
                categories: [
                    { key: 0, option: 'Rações' },
                    { key: 1, option: 'Coleiras' },
                    { key: 2, option: 'Medicações' },
                    { key: 3, option: 'Higiene e Estética' },
                    { key: 4, option: 'Acessórios' },
                ],
                subcategories: {
                    'Coleiras': [
                        { key: 0, option: 'Pequeno porte'},
                        { key: 1, option: 'Médio porte'},
                        { key: 2, option: 'Grande porte'},
                    ],
                    'Higiene e Estética': [
                        { key: 0, option: 'Shampoo'},
                        { key: 1, option: 'Perfume'},
                        { key: 2, option: 'Moda canina'},
                    ]
                },
                brands: []
            }
        },
        created() {
            this.brands = new BrandService(this.$resource)
            this.brands
                .lista()
                .then(brands => this.brands = brands.list)
        },
        mixins: [commonForm],
        components: {
            'dropdown': Dropdown,
            'integer': Integer,
            'decimal': Decimal,
            'image-upload': ImageUpload
        },
        methods: {
            show() {
                this.$http.get(`products/${this.id}`)
                    .then(response => {
                        this.product = response.body
                        if(this.product.picture) {
                            console.log('tem foto nessa porra')
                        }
                    })
            },
            doRequest() {
                if(this.id) {
                    this._save = this.$http.put(`products/${this.id}`, this.product)
                } else {
                    this._save = this.$http.post('products', this.product)
                }

                this._save
                    .then(response => {
                        this.errors = response.body.errors ? response.body.errors: []
                        this.success = response.body.success
                        this.message = response.body.message
                        this.alerts = response.body.alerts

                        if(response.body.success) {
                            this.service.storage(response.body.message, response.body.alerts, '/products')
                        }

                        this.submitted = false;
                    })
            },
            save () {
                this.submitted = true
                let me = this;

                if (this.product.picture) {
                    let reader = new FileReader();
                    reader.readAsDataURL(this.product.picture)
                    reader.onload = function () {
                        me.product.picture = reader.result
                        console.log(me.product.picture)
                        me.doRequest()
                    }
                } else {
                    this.doRequest();
                }
            },
            selectedCategory() {
                if (this.subcategories[this.product.category]) {
                    return this.product.category
                }

                this.product.subcategory = ''
            },
        },
        computed: {
            addTitle () {
                if(this.id) {
                    return 'Alterar produto'
                }

                return 'Incluir produto'
            }
        }
    }
</script>