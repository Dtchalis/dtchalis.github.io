<script>
    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();

    export let game = {title: '', card: '', splash: ''};
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<slot>
    <div class="card" style="background-image: url({game.card})" on:mouseover={dispatch('handleMouseOver', game.id)}/>
</slot>

<style>
    .card{
        height: 240px;
        width: 700px;
        display: flex;
        cursor: pointer;
        margin: 70px 0px;
        border-radius: 5px;
        border: 10px solid transparent;
        background:#000 no-repeat 50% 50%; 
        background-size: 120%;
    }
    .card:hover{
        border: 10px solid #ffb100;
    }
</style>