<template>
    <b-modal :id="idModal ? idModal : ('modal-confirm-edit-'+movimento.id)" :title="title" v-on:ok="ok" v-on:cancel="reset">
        <b-form> 
            <b-form-input 
            v-model="movimentoInterno.id"
            type="number"
            hidden
            ></b-form-input>
            <b-form-group
            id="input-data_mov"
            label="Data"
            label-for="data_mov"
            ></b-form-group>
            <b-form-input 
            id="data_mov"
            v-model="movimentoInterno.data_mov"
            type="date"
            required
            ></b-form-input>
            <b-form-group
            id="input-descricao"
            label="Descrição"
            label-for="descricao"
            ></b-form-group>
            <b-form-input 
            id="descricao"
            v-model="movimentoInterno.descricao"
            type="text"
            required
            ></b-form-input>
            <b-form-group
            id="input-categoria"
            label="Categoria"
            label-for="categoria"
            ></b-form-group>
            <b-form-select
            id="categoria"
            v-model="movimentoInterno.categoria"
            :options="categorias"
            required
            ></b-form-select>
            <b-form-group
            id="input-valor"
            label="Valor"
            label-for="valor"
            ></b-form-group>
            <b-form-input 
            id="valor"
            v-model="movimentoInterno.valor"
            type="number"
            required
            ></b-form-input>
        </b-form>
    </b-modal>
</template>

<script>
export default {
    name: "FormMovimento",
    data: function() {
        return {
            movimentoInterno: {
                id: '',
                data_mov: '',
                descricao: '',
                categoria: null,
                valor: ''
            },
            categorias: [{ text: 'Selecione Uma', value: null }, 'esporte', 'lazer', 'jogos', 'contas', 'alimentação', 'vestuário'],
            show: true
        }
    },
    props: {
        title: String,
        idModal: String,
        movimento: {
            id: Number,
            data_mov: Date,
            descricao: String,
            categoria: String,
            valor: String 
        }
    },
    methods: {
        ok: function() {
                this.movimentoInterno.valor = parseFloat(this.movimentoInterno.valor)
                this.$emit('confirmed', this.movimentoInterno);
        },
        reset: function() {
            this.movimentoInterno.id = this.movimento.id
            this.movimentoInterno.data_mov = this.movimento.data_mov
            this.movimentoInterno.descricao = this.movimento.descricao
            this.movimentoInterno.categoria = this.movimento.categoria
            this.movimentoInterno.valor = this.movimento.valor
        }
    },
    mounted() {
        this.reset();
    }
}
</script>

<style>
</style>