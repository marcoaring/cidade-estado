<template>
  	<div>
  		<header class="main-header row">
            <h1 class="main-header__title col-12">Cidades</h1>
            <section class="main-header__busca col-11">
                <form class="form-inline">
                    <div class="form-group">
                        <input type="search" class="form-control input-search" name="input-search" placeholder="Pesquisar Cidades" v-model="busca" @input="buscarCidades">
                    </div>
                    <button type="submit" class="btn btn-primary ml-3" @click.prevent="buscarCidades">Pesquisar</button>
                </form>
            </section>
            <section class="main-header__novo col-1 align-self-end">
                <a href="#" class="btn btn-outline-primary novo-btn" @click.prevent="novaCidade">Novo</a>
            </section>
        </header>
    
	  	<table class="table" v-show="cidades.length != 0">
	        <thead>
	         	<tr>
	            	<th scope="col">
                        <a href="" class="filter-table" @click.prevent="filterTable('id')">Id</a>
                    </th>
	            	<th scope="col">
                        <a href="" class="filter-table" @click.prevent="filterTable('nome')">Nome</a>
                    </th>
	            	<th scope="col">
                        <a href="" class="filter-table" @click.prevent="filterTable('estado_id')">ID Estado</a>
                    </th>
	            	<th scope="col">
                        <a href="" class="filter-table" @click.prevent="filterTable('data_criacao')">Data de Criação</a>
                    </th>
	            	<th scope="col">
                        <a href="" class="filter-table" @click.prevent="filterTable('data_alteracao')">Data de Alteração</a>
                    </th>
	            	<th scope="col">Ações</th>
	          	</tr>
	        </thead>
	        <tbody>
	          	<tr v-for="cidade in cidades" v-bind:key="cidade.id">
	            	<th scope="row">{{cidade.id}}</th>
	            	<td>{{cidade.nome}}</td>
	            	<td>{{cidade.estado_id}}</td>
	            	<td>{{cidade.data_criacao}}</td>
	            	<td>{{cidade.data_alteracao}}</td>
	            	<td>
	              		<a href="#" class="btn-table btn-edit" @click.prevent="editarCidade(cidade)">
	                		<i class="fa fa-edit"></i>
	              		</a>
	              		<a href="#" class="btn-table btn-delete" @click.prevent="removeCidade(cidade)">
	                		<i class="fa fa-trash"></i>
	              		</a>
	            	</td>
	          	</tr>
	        </tbody>
	    </table>

	    <Paginacao :total="total" :page="page" :itens-per-page="itensPerPage" @change-page="onChangePage" v-show="cidades.length != 0"></Paginacao>

        <div class="alert alert-warning" role="alert" v-show="cidades.length == 0">Nenhum item foi encontrado para a pesquisa sobre "<strong>{{busca}}</strong>"</div>

        <!-- Modal -->
        <div class="modal fade" id="modalform" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="close" aria-label="Close" @click.prevent="fecharModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger" role="alert" v-if="errors.length">
                            <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
                            <ul>
                                <li v-for="error in errors">{{ error }}</li>
                            </ul>
                        </div>
                        <div class="row">
                            <div class="form-group col-6">
                                <label>Nome</label>
                                <input type="text" class="form-control" ref="input_nome" placeholder="Digite o nome" v-bind:value="selected.nome">
                            </div>

                            <div class="form-group col-6">
                                <label>Estado</label>
                                <select name="input_estado_id" class="form-control" ref="input_estado_id">
                                    <option value="">Selecione um Estado</option>
                                    <option v-for="estado in estados" v-bind:value="estado.id" :selected="estado.id === selected.estado_id">{{estado.nome}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click.prevent="validateForm">Salvar nova Cidade</button>
                        <button type="button" class="btn btn-secondary" @click.prevent="fecharModal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
	import Paginacao from './componentes/paginacao.vue'
  	export default{
  		name: 'Cidades',
  		data(){
            return{
                cidades: [],
                estados: [],
                errors: [],
                selected: {},
                page: 1,
                total: 0,
                itensPerPage: 5,
                busca: '',
                filter: '',
                order: '',
            }
        },
  		components:{
            Paginacao
        },
        methods:{
            novaCidade(){
                this.selected = {};
                $('#modalform').modal('show');
            },
            editarCidade(cidade){
                this.selected = cidade;
                $('#modalform').modal('show');
            },
            salvarCidade(){
                let dataForm = {};
                let t = this;
                const date = new Date();
                const currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

                if(this.selected.id != null){ //EDIÇÃO
                    dataForm.nome = this.$refs.input_nome.value;
                    dataForm.estado_id = this.$refs.input_estado_id.value;
                    dataForm.data_criacao = this.selected.data_criacao;
                    dataForm.data_alteracao = currentDate;

                    this.$http.put(`http://localhost:3000/cidades/${this.selected.id}`, dataForm).then(
                        response => {
                            t.selected = {};
                            dataForm = {};
                            $('#modalform').modal('hide');
                            t.loadCidades();
                        },
                        error => {
                            console.error(error);
                        }
                    )
                }

                else{ //NOVO
                    dataForm.nome = this.$refs.input_nome.value;
                    dataForm.estado_id = this.$refs.input_estado_id.value;
                    dataForm.data_criacao = currentDate;
                    dataForm.data_alteracao = currentDate;
                    this.$http.post(`http://localhost:3000/cidades`,dataForm).then(
                        response => {
                            t.selected = {};
                            dataForm = {};
                            $('#modalform').modal('hide');
                            t.loadCidades();
                        },
                        error => {
                            console.error(error);
                        }
                    )
                }
            },
            removeCidade(cidade){
                let self = this;
                swal({
                    title: "Você tem certeza?",
                    text: `Deseja apagar a cidade "${cidade.nome}"`,   
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if(willDelete){
                        self.$http.delete(`http://localhost:3000/cidades/${cidade.id}`).then(
                            result => {
                                swal("Cidade removida!", { icon: "success" });
                                self.loadCidades();
                            }
                        );
                    } else{
                        swal("A cidade não pode ser removida.");
                    }
                });
            },
        	loadCidades(){
                let t = this;
                let start = (this.page * this.itensPerPage) - this.itensPerPage;
                let end = this.page * this.itensPerPage;
                let qString = (this.busca) ? `&q=${this.busca}` : '';
                let qOrder = (this.filter) ? `&_sort=${this.filter}&_order=${this.order}` : '';

                this.$http.get(`http://localhost:3000/cidades?_start=${start}&_end=${end}${qOrder}${qString}`).then(
                    response => {
                        t.cidades = response.body;
                        t.total = response.headers.map['x-total-count'][0];
                    },
                    error => {
                        console.log(error);
                    }
                )
            },
            loadEstados(){
                let t = this;

                this.$http.get(`http://localhost:3000/estados`).then(
                    response => {
                        t.estados = response.body;
                    },
                    error => {
                        console.log(error);
                    }
                )
            },
            filterTable(itemFilter){
                if(this.filter == itemFilter && this.order == 'asc'){
                    this.order = 'desc';
                } else{
                    this.order = 'asc';
                }

                this.filter = itemFilter;
                
                this.loadCidades();
            },
            onChangePage(page){
            	this.page = page;
            	this.loadCidades();
            },
            buscarCidades(){
                this.loadCidades();
            },
            fecharModal(){
                $('#modalform').modal('hide');
            },
            validateForm(){
                this.errors = [];

                if(!this.$refs.input_nome.value){
                    this.errors.push('O nome é obrigatório.');
                }

                if(!this.$refs.input_estado_id.value){
                    this.errors.push('O estado da cidade é obrigatório.');
                }

                if(this.errors.length == 0){
                    this.salvarCidade();
                }
            }
        },
        created(){
            this.loadCidades();
            this.loadEstados();
        }
  	}
</script>

<style lang="scss">
    .main-header{
        margin-bottom: 30px;

        &__title{
            font-size: 30px;
            margin-top: 30px;
            margin-bottom: 30px;
        }

        .input-search{ min-width: 280px; }
    }

    .filter-table{
        color: #000;
        -webkit-transition: all .5s ease;
        -moz-transition: all .5s ease;
        -o-transition: all .5s ease;
        -ms-transition: all .5s ease;
        transition: all .5s ease;

        &:hover{
            color: #007bff;
            text-decoration: none;
        }
    }
</style>