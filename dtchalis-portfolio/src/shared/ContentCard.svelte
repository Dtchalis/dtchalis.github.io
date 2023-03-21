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
        {#if isMouseOver}
            <div class="overlay">
                {#if game.hasDemo}
                    <h1>Try it!</h1>
                {:else}
                    <h1 class="inDev">In Development</h1>
                {/if}
            </div>
        {/if}
    </div>
</a>

<style>
    h1 {
        margin: 0;

        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        background-image: linear-gradient(to top, transparent, black);
        /* font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; */
        font-size: 2.5em;
        font-weight: 1000;
    }
    .card {
        height: 240px;
        width: 700px;

        display: flex;
        justify-content: center;
        align-items: center;

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
        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        /* background: linear-gradient(to right, transparent, #ffb100); */
        background: #ffb100;

        right: 0px;

        height: 100%;
        width: 30%;
    }
    .overlay .inDev {
        font-size: 1em;
    }

    .inactiveLink {
        pointer-events: none;
        cursor: default;
    }
</style>