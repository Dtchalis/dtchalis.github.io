<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
    
    export let items = [''];
	export let activeItem = '';
</script>

<div class="tabs">
    <ul>
        {#each items as item}
        {#if item != 'HOME'}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => dispatch('tabChange', item)}>
            <div class:active={item === activeItem} class:inactive={item != activeItem}>{item}</div>
        </li>
        {/if}
        {/each}
    </ul>
</div>

<style>
    .tabs{
        margin-bottom: 40px;
    }
    ul{
        display: flex;
        justify-content: left;
        padding: 0;
        list-style-type: none;
    }
    li{
        margin: 0px 32px;
        font-size: 18px;
        color: white;
        cursor: pointer;
        border-bottom: 8px solid rgba(0, 0, 0, 0);
    }

    li:hover{
        color: #ffb100;
        /* border-bottom: 2px solid #ffb100; */
    }

    li .active{
        color: #ffb100;
        border-bottom: 6px solid #ffb100;
    }

    li .inactive{
        border-bottom: 6px solid rgba(0, 0, 0, 0);
    }
</style>