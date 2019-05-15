<template>
	<nav aria-label="Page navigation example">
  		<ul class="pagination">
		    <li v-bind:class="[showPreviousButton ? '' : 'disabled', 'page-item']">
		    	<a class="page-link" href="#"  v-bind:aria-disabled="showPreviousButton" @click="goPreviousPage()">Anterior</a>
		    </li>
		    <li v-bind:class="[showNextButton ? '' : 'disabled', 'page-item']">
		    	<a class="page-link" href="#" v-bind:aria-disabled="showNextButton" @click="goNextPage()">Próximo</a>
		    </li>
  		</ul>
	</nav>
</template>

<script>
 	export default{
 		name: 'Paginacao',
    	props: ["total","page","itensPerPage"],
    	computed:{
      		totalPages: function(){
        		return Math.ceil(this.total / this.itensPerPage) || 1
      		},

      		showNextButton: function(){
       			return  this.page != this.totalPages
      		},

      		showPreviousButton: function(){
       			return this.page != 1
      		}
    	},
    	methods:{
      		goNextPage: function(){
        		this.$emit('change-page', this.page+1)
      		},
      		goPreviousPage: function(){
        		this.$emit('change-page', this.page-1)
      		}
    	}
  	}
</script>