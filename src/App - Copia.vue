<template>
    <div id="app" class="container">
        <header class="main-header row">
            <h1 class="main-header__title col-12">Cidades/Estados</h1>
            <section class="main-header__busca col-11">
                <form class="form-inline">
                    <div class="form-group">
                        <input type="search" class="form-control input-search" name="input-search" placeholder="Pesquisar Cidades/Estados" v-model="search"  @submit="procurarEstados">
                    </div>
                    <button type="submit" class="btn btn-primary ml-3" @click="procurarEstados">Pesquisar</button>
                </form>
            </section>
            <section class="main-header__novo col-1 align-self-end">
                <a href="#" class="btn btn-outline-primary novo-btn">Novo</a>
            </section>
        </header>

        <main class="main-content">
          
        </main>
        <estados></estados>
    </div>
</template>

<script>
    import Estados from './estados.vue'
    export default {
        name: 'app',
        data(){
            return{
                isLoading: false,
                search: '',
                estados: [],
                page: 1,
                total: 0,
                selected: {},
                itensPerPage: 10
            }
        },
        components:{
            Estados
        },
        methods:{
            showLoading(){
                this.isLoading=true;
            },

            hideLoading(){
                this.isLoading=false;
            },

            carregaEstados(){
                let t = this
                this.showLoading()

                let start = (this.page * this.itensPerPage) - this.itensPerPage
                let end = this.page * this.itensPerPage

                this.$http.get(`http://localhost:3000/estados?_start=${start}&_end=${end}`).then(
                    response=>{
                        console.log(response.json());
                        t.estados = response.json()
                        t.total = response.headers['X-Total-Count']
                    },
                    error=>{
                        console.log(error)
                    }
                ).finally(function(){
                    t.hideLoading();
                })
            },
            procurarEstados(){}
        },

        created(){
            this.carregaEstados();
            console.log(this.estados);
        },
    }
</script>

<style lang="scss">
    body{
        font-family: 'Raleway', sans-serif;
        background-color: #f8f9fa;
    }

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
