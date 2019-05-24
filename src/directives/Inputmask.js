import Inputmask from 'inputmask'

export default {
    inserted(el, binding) {
        new Inputmask().mask(el);
    }
};