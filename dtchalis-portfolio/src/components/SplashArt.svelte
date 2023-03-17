<script>
    import { GamesStore } from "../stores/GamesStore";

    export let gameID = 0;

    $: game = $GamesStore[gameID];
</script>

<div class="coverImage" style="background-color: black;">
    {#if game.title === 'ReFractal'}
	    <img src="{$GamesStore[0].splash}" alt="">
    {:else if game.title === 'Tower Jump'}
	    <img src="{$GamesStore[1].splash}" alt="">
    {:else if game.title === 'Burst - Component Creator'}
	    <img src="{$GamesStore[2].splash}" alt="">
	    <!-- <img src="{game.splash}" alt=""> -->
    {/if}
</div>

<style>
    .coverImage{
		position: absolute;
		width: 100%;
		height: 100%;
	}
	
	.coverImage img{
		filter: blur(8px);
	}
</style>