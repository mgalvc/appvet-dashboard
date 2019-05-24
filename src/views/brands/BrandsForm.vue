<template>
    <div>
        <alert :alerts="alerts" :message="message"></alert>
        <section class="card">
            <content-header :title="addTitle">
                <router-link tag="button" class="btn btn-default btn-sm" to="/brands" title="Voltar">
                    <i class="fa fa-undo"></i>
                </router-link>
            </content-header>
            <div class="card-body">
                <div class="form-row">
                    <form-error :field="errors.description" class="col-md-12 mb-3">
                        <label for="description">* Nome:</label>
                        <input type="text" class="form-control" id="description" v-model="brand.description"
                               :class="[errors.description ? 'is-invalid' : '']" />
                    </form-error>
                </div>
                <submit-button :submitted="submitted">
                    <button v-if="brand.description" class="btn btn-success btn-sm" @click="save">
                        <i class="fa fa-check"></i> Salvar</button>
                </submit-button>
            </div>
        </section>
    </div>
</template>

<script>
    import commonForm from "@/mixins/commonForm"
    import Brand from "@/domain/brand/Brand"

    export default {
        data () {
            return {
                brand: new Brand(),
            }
        },
        mixins: [commonForm],
        components: { },
        methods: {
            show() {
                this.$http.get(`brands/${this.id}`)
                    .then(response => {
                        this.brand = response.body
                    })
            },

            save () {
                this.submitted = true

                if(this.id) {
                    this._save = this.$http.put(`brands/${this.id}`, this.brand)
                } else {
                    this._save = this.$http.post('brands', this.brand)
                }

                this._save
                    .then(response => {
                        this.errors = response.body.errors ? response.body.errors : []
                        this.success = response.body.success
                        this.message = response.body.message
                        this.alerts = response.body.alerts

                        if(response.body.success) {
                            this.service.storage(response.body.message, response.body.alerts, '/brands')
                        }

                        this.submitted = false;
                    })
            },
        },
        computed: {
            addTitle () {
                if(this.id) {
                    return 'Alterar marca'
                }

                return 'Incluir marca'
            }
        }
    }
</script>