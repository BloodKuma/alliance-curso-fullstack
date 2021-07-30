<template>
    <div>
        <b-button v-b-modal="'modal-confirm-delete-' + movimento.id">
            <b-icon-trash></b-icon-trash>
        </b-button>
        <b-button v-b-modal="'modal-confirm-edit' + movimento.id"> 
            <b-icon-pen></b-icon-pen>
        </b-button>
        <b-modal :id="'modal-confirm-delete-' + movimento.id" title="Confirmação" ok-variant='danger' 
        cancel-variant="success" ok-title="Sim" cancel-title="Não"
        v-on:ok="excluir()">
            <p>Tem certeza que deseja excluir?</p>
        </b-modal>
        <FormMovimento :movimento="movimento" title="Editar movimento" v-on:confirmed="edit"/>
    </div>

</template>

<script>
import FormMovimento from './FormMovimento.vue'

export default {
    name: "Movimento",
    props: {
        movimento: {
            id: Number,
            data_mov: String,
            descricao: String,
            categoria: String,
            valor: Number 
        },
        index: Number
    },
    components: {
        FormMovimento
    },

    methods: {
        excluir: function(){
            this.$emit('removed')
        },
        edit: function(movimento){
            this.$emit('edited', movimento, this.index)
        }
    }
}
</script>

<style scoped>
</style>