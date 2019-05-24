<template>
    <input type="text" class="form-control" v-input-mask data-inputmask-mask="9{1,4},99"
           data-inputmask-greedy="false" data-inputmask-placeholder="" autocomplete="off" :value="val"
           @input="$emit('input', $event.target.value)"/>
</template>

<script>
    import Inputmask from '@/directives/Inputmask'

    export default {
        props: ['val'],
        directives: {
            'input-mask': Inputmask
        }
    }
</script>