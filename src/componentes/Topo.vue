<template>
    <header class="main-header row">
        <h1 class="main-header__title col-12">Cidades/Estados</h1>
        <section class="main-header__busca col-11">
            <form class="form-inline">
                <div class="form-group">
                    <input type="search" class="form-control input-search" name="input-search" placeholder="Pesquisar Cidades/Estados">
                </div>
                <button type="submit" class="btn btn-primary ml-3">Pesquisar</button>
            </form>
        </section>
        <section class="main-header__novo col-1 align-self-end">
            <a href="#" class="btn btn-outline-primary novo-btn">Novo</a>
        </section>
    </header>
</template>

<script>
    export default{
        name: 'topo'
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