<script>
    import { GamesStore } from "../stores/GamesStore";
    import { tweened } from 'svelte/motion';
    
    export let gameID = 0;

    $: game = $GamesStore[gameID];

    const value = tweened(0);
    $: tweened;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div class="coverImage" style="background-color: black;" on:mouseover={() => value.set(1)}>
    {#if game.title === 'ReFractal'}
    <img src="{$GamesStore[0].splash}" alt="">
    {:else if game.title === 'Tower Jump'}
        <img src="{$GamesStore[1].splash}" alt="">
    {:else if game.title === 'Burst - Component Creator'} 
        <img src="{$GamesStore[2].splash}" alt="">
    {/if}
</div>

<style>
    .coverImage {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	
	.coverImage img {
		filter: blur(8px);
        width: inherit;
        height: inherit;
	}
</style>