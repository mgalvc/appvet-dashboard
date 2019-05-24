<template>
    <select class="form-control" :multiple="multiple_select">
        <option v-if="!multiple_select"></option>
        <option v-for="item in itens" :value="item.id" :key="item.id">{{ item.option }}</option>
    </select>
</template>

<script>
    export default {
        props: ['itens', 'value', 'multiple_select'],
        data() {
            return {
                series: []
            }
        },
        watch: {
            value (val) {
                let vm = $(this.$el)

                setTimeout(() => {
                    vm.val(val).trigger('change')
                }, 100)

                if(this.multiple_select) {
                    this.series = val
                }

                this.updateDropdown(val)
            }
        },
        mounted() {
            let me = this
            let control = $(this.$el)

            control.select2({
                placeholder: this.multiple_select ? '' : 'Selecione uma opção',
                language: "pt-BR",
                allowClear: true
            })

            control.on('select2:select', function (e) {
                if(me.multiple_select) {
                    me.series.push(e.params.data.id)
                    me.updateDropdown(me.series)
                } else {
                    me.updateDropdown(e.params.data.id)
                }
            })

            control.on('select2:unselecting', function (e) {
                if(!me.multiple_select) {
                    me.updateDropdown('')
                }
            })

            control.on('select2:unselect', function (e) {
                if(me.multiple_select) {
                    let actual = $(this).val()
                    me.series = actual
                    me.updateDropdown(actual)
                }
            })
        },
        methods: {
            updateDropdown(id) {
                this.$emit('input', id)
                this.$emit('loadCombo')
            }
        }
    }
</script>