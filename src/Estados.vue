<template>
  	<div>
  		<header class="main-header row">
            <h1 class="main-header__title col-12">Cidades/Estados</h1>
            <section class="main-header__busca col-11">
                <form class="form-inline">
                    <div class="form-group">
                        <input type="search" class="form-control input-search" name="input-search" placeholder="Pesquisar Cidades/Estados" v-model="busca">
                    </div>
                    <button type="submit" class="btn btn-primary ml-3" @click.prevent="buscarEstados">Pesquisar</button>
                </form>
            </section>
            <section class="main-header__novo col-1 align-self-end">
                <a href="#" class="btn btn-outline-primary novo-btn">Novo</a>
            </section>
        </header>
  		<a class="">Loading</a>
	  	<table class="table">
	        <thead>
	         	<tr>
	            	<th scope="col">Id</th>
	            	<th scope="col">Nome</th>
	            	<th scope="col">Abreviação</th>
	            	<th scope="col">Data de Criação</th>
	            	<th scope="col">Data de Alteração</th>
	            	<th scope="col">Ações</th>
	          	</tr>
	        </thead>
	        <tbody>
	          	<tr v-for="estado in estados">
	            	<th scope="row">{{estado.id}}</th>
	            	<td>{{estado.nome}}</td>
	            	<td>{{estado.abreviacao}}</td>
	            	<td>{{estado.data_criacao}}</td>
	            	<td>{{estado.data_alteracao}}</td>
	            	<td>
	              		<a href="#" class="btn-table btn-edit">
	                		<i class="fa fa-edit"></i>
	              		</a>
	              		<a href="#" class="btn-table btn-delete">
	                		<i class="fa fa-trash"></i>
	              		</a>
	            	</td>
	          	</tr>
	        </tbody>
	    </table>

	    <Paginacao :total='total' :page='page' :itens-per-page='itensPerPage' @change-page='onChangePage'></Paginacao>
	</div>
</template>

<script>
	import Paginacao from './componentes/paginacao.vue'
  	export default{
  		name: 'Estados',
  		data(){
            return{
                estados: [],
                page: 1,
                total: 0,
                itensPerPage: 10,
                busca: ''
            }
        },
  		components:{
            Paginacao
        },
        methods:{
        	loadEstados(){
                let t = this;
                let start = (this.page * this.itensPerPage) - this.itensPerPage;
                let end = this.page * this.itensPerPage;
                let qString = (this.busca) ? `&q=${this.busca}` : '';

                this.$http.get(`http://localhost:3000/estados?_start=${start}&_end=${end}${qString}`).then(
                    response => {
                        this.estados = response.body;
                        this.total = response.headers.map['x-total-count'][0];
                    },
                    error => {
                        console.log(error);
                    }
                )
            },
            onChangePage(page){
            	this.page = page;
            	this.loadEstados();
            },
            buscarEstados(){
                this.loadEstados();
            }
        },
        created(){
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
</style>