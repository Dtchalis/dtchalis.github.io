<script>
    import ContentCard from '../shared/ContentCard.svelte';
    import { GamesStore } from '../stores/GamesStore.js';
    import { onMount } from 'svelte';

    onMount(() => {
       console.log($GamesStore); 
    });

    let currentIndex = 0;

    function handleWheel(event) {
        if (event.deltaY < 0 && currentIndex > 0) {
            currentIndex--;
        } else if (event.deltaY > 0 && currentIndex < $GamesStore.length - 1) {
            currentIndex++;
        }

        console.log('should be scrolling');
    }
</script>

<div class="parent">
    <div class="child">
        <div on:wheel={handleWheel}>
            {#each $GamesStore as item, i}
              <ContentCard {item} position={i - currentIndex}/>
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
    }

    .child {
        /* border: 1px solid white; */
        /* background-color: #244653; */
        margin: 50px 50px;
    }
</style>