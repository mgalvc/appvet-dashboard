<template>
    <div class="login-body">
        <div class="container">
            <alert :alerts="alerts" :message="message"></alert>
            <div class="form-signin">
                <h2 class="form-signin-heading">Login</h2>
                <div class="login-wrap">
                    <div class="iconic-input">
                        <i class="fas fa-user"></i>
                        <input type="text" class="form-control" v-model="login" placeholder="Login">
                    </div>
                    <div class="iconic-input">
                        <i class="fa fa-key"></i>
                        <input type="password" class="form-control" v-model="senha" placeholder="Senha">
                    </div>
                    <!--<span class="float-right">-->
                        <!--<a data-toggle="modal" href="#modelEsqueci"> Esqueci minha senha?</a>-->
                    <!--</span>-->
                    <button class="btn btn-lg btn-login btn-block" type="button" @click.prevent="authenticate">Enviar</button>
                </div>

                <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="modelEsqueci" class="modal fade">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Esqueci minha senha?</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Informe seu e-mail para receber uma nova senha.</p>
                                <input type="email" name="email" placeholder="E-mail" autocomplete="off" class="form-control placeholder-no-fix">
                            </div>
                            <div class="modal-footer">
                                <button data-dismiss="modal" class="btn btn-default" type="button">Cancelar</button>
                                <button class="btn btn-success" type="button">Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Alert from '@/components/Alert'
    import flashMessage from '@/mixins/flashMessage'

    export default {
        data () {
            return {
                login: '',
                senha: '',
                message: null,
                alerts: {}
            }
        },
        mixins: [flashMessage],
        components: {
            'alert': Alert
        },
        methods: {
            authenticate () {
                let data = {
                    //grant_type: 'password',
                    //client_id: 2,
                    // client_secret: 'TV9HvAGYzuNhm1hnpwmAAiqGjP7dKWk6Iq6pcDDT',
                    username: this.login,
                    password: this.senha
                }

                this.$http.post('auth/admin/login', data)
                    .then(response => {
                        if(response.body.message) {
                            this.message = response.body.message
                            this.alerts = response.body.alerts
                        } else {
                            this.$store.commit('login', { token: response.body.token, user: response.body.username })
                            this.$router.push("/")
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .login-wrap > span {
        display: block;
        margin-bottom: 14px;
    }

    .alert {
        margin: 30px auto -70px;
        max-width: 330px;
    }

    .form-signin .form-control {
        position: unset;
    }
</style>