import Alert from '@/components/Alert'
import ContentHeader from '@/components/ContentHeader'
import AppFilter from '@/components/AppFilter'
import DataGrid from '@/components/DataGrid'
import ModalDelete from '@/components/ModalDelete'
import flashMessage from './flashMessage'

export default {
    data () {
        return {
            params : {
                total: 0,
                per_page: 30,
                current_page: 1,
                direction: 'asc'
            },
            success: true,
            message: null,
            alerts: {},
            element: null
        }
    },
    components: {
        'alert': Alert,
        'content-header': ContentHeader,
        'app-filter': AppFilter,
        'data-grid': DataGrid,
        'modal-delete': ModalDelete
    },
    mixins: [flashMessage],
    created () {
        this.index()
    },

    methods: {
        openModal(obj)
        {
            this.element = obj
        },

        destroy (param_id) {
            this.$http.delete(param_id)
                .then(response => {
                    this.success = response.body.success
                    this.message = response.body.message
                    this.alerts = response.body.alerts
                    this.index()
                })

            return false;
        }
    }
}