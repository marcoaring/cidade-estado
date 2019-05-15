<template>
  	<div>
  		<Topo></Topo>
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
	import Topo from './componentes/topo.vue'
	import Paginacao from './componentes/paginacao.vue'
  	export default{
  		name: 'Estados',
  		data(){
            return{
                estados: [],
                page: 1,
                total: 0,
                itensPerPage: 10
            }
        },
  		components:{
            Topo,
            Paginacao
        },
        methods:{
        	loadEstados(){
                let t = this;
                let start = (this.page * this.itensPerPage) - this.itensPerPage;
                let end = this.page * this.itensPerPage;

                this.$http.get(`http://localhost:3000/estados?_start=${start}&_end=${end}`).then(
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
            }
        },
        created(){
            this.loadEstados();
        }
  	}
</script>

<style lang="scss">
</style>