<script>
    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();

    export let game = {title: '', card: '', splash: ''};
    
    let isMouseOver = false;

    const handleMouseEnter = () => {
        isMouseOver = true;
    }

    const handleMouseLeave = () => {
        isMouseOver = false;
    }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a href='{game.link} class:inactiveLink={!game.hasDemo}'>
    <div class="card" style="background-image: url({game.card});" on:mouseover={dispatch('handleMouseOver', game.id)} on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
        {#if game.hasDemo && isMouseOver}
            <div class="overlay">
                <h1>Demo Available!</h1>
            </div>
        {/if}
    </div>
</a>

<style>
    h1 {
        text-align: center;
        position: absolute;

        top: 25%;
        margin-left: 10px;
        margin-right: 10px;

        color: #000;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 30px;
    }
    .card {
        height: 240px;
        width: 700px;

        display: flex;
        
        margin: 70px 0px;
        position: relative;

        border-radius: 5px;
        border: 10px solid transparent;
        background:#000 no-repeat 50% 50%; 
        background-size: 120%;
    }
    .card:hover {
        border: 10px solid #ffb100;
    }
    .overlay {
        position: absolute;
        background-color: #ffb100;
        
        right: 0px;

        height: 100%;
        width: 30%;
    }
    .inactiveLink {
        pointer-events: none;
        cursor: default;
    }
</style>