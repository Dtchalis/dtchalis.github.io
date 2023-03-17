<script>
    import ContentCard from '../shared/ContentCard.svelte';
    import { GamesStore } from '../stores/GamesStore.js';
    import { onMount } from 'svelte';

    onMount(() => {
       console.log($GamesStore); 
    });

    let currentIndex = 0;

    function handleWheel(event) {
        // if (event.deltaY < 0 && currentIndex < 0)
        //     currentIndex++;
        // else if (event.deltaY > 0 && currentIndex > -$GamesStore.length)
        //     currentIndex--;

        // console.log('should be scrolling ' + currentIndex);
    }
</script>

<div class="parent">
    <div class="child">
        <div on:wheel={handleWheel} style="transform: translateY({currentIndex * 150}px);">
                {#each $GamesStore as game, i}
                    {#if i < 3}
                        <ContentCard {game} on:handleMouseOver/>
                    {/if}
                {/each}
          </div>
    </div>
</div>

<style>
    .parent {
        color: white;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 45%;
        /* background-color: #122932; */
        justify-content: center;
        display: flex;
    }

    .child {
        /* border: 1px solid white; */
        /* background-color: #244653; */
        margin: 50px 50px;
        width: 100%;
        justify-content: center;
        display: flex;
        flex: 2 1 auto;
        align-items: center;

    }
</style>