<template>
    <div class="fileupload fileupload-new" data-provides="fileupload">
        <span class="btn btn-white btn-file">
            <span class="fileupload-new"><i class="fa fa-paper-clip"></i> Selecionar</span>
            <span class="fileupload-exists"><i class="fa fa-undo"></i> Trocar</span>
            <input type="file" class="default" :files="files" @input="$emit('input', $event.target.files[0])" />
        </span>
        <span class="fileupload-preview" style="margin-left:5px;"></span>
        <a href="#" class="close fileupload-exists" data-dismiss="fileupload" style="float: none; margin-left:5px;"></a>
    </div>
</template>

<script>
    export default {
        props: ['files']
    }
</script>