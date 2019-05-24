import Alert from '@/components/Alert'
import ContentHeader from '@/components/ContentHeader'
import FormError from '@/components/FormError'
import SubmitButton from '@/components/SubmitButton'
import Focus from '@/directives/Focus'
import GlobalService from '@/domain/GlobalService'

export default {
    data () {
        return {
            id: this.$route.params.id,
            message: null,
            alerts: {},
            submitted: false,
            success: false,
            errors: []
        }
    },
    created () {
        this.service = new GlobalService(this.$router)

        if(this.id) {
            this.show()
        }
    },
    directives: {
        focus: Focus
    },
    components: {
        'alert': Alert,
        'form-error': FormError,
        'content-header': ContentHeader,
        'submit-button': SubmitButton
    }
}