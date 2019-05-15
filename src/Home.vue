<template>
    <div class="main-home">
        <a href="./estados" class="main-home__btn">
            <p class="txt-btn">Estados</p>
        </a>
        <a href="./cidades" class="main-home__btn">
            <p class="txt-btn">Cidades</p>
        </a>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="scss">
    .main-home{
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: row;
        
        &__btn{
            min-height: 50vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: column;
            width: 30%;
            padding: 30px;
            margin: 0px 30px;
            background-color: #007bff;
            color: #fff;
            border-radius: 30px;
            text-align: center;
            font-size: 2em;
            text-transform: uppercase;
            -webkit-transition: all .5s ease;
            -moz-transition: all .5s ease;
            -o-transition: all .5s ease;
            -ms-transition: all .5s ease;
            transition: all .5s ease;

            &:hover{
                color: #fff;
                text-decoration: none;
                box-shadow:1px 1px #53a7ea,2px 2px #53a7ea,3px 3px #53a7ea;
                -webkit-transform: translateX(-3px);
                transform: translateX(-3px);
            }
        }
    }
</style>
