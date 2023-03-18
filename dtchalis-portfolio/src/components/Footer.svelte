<script>
    import { createEventDispatcher } from 'svelte';
    import Tabs from '../shared/Tabs.svelte';

    let dispatch = createEventDispatcher();

    export let items = [''];
	export let activeItem = '';
</script>

<footer>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- <h1 on:click={() => dispatch('resetActiveTab', 'HOME')}>DTCHALIS</h1> -->
    {#if activeItem != 'GAMES'}
        <img on:click={() => dispatch('resetActiveTab', 'HOME')} src="img/Assets/Dtchalis_Logo_Text_2.gif" alt="">
    {/if}
    <Tabs {activeItem} {items} on:tabChange/>
</footer>

<style>
    img{
        cursor: pointer;
        padding: 0px 10px;
    }

    footer{
        padding: 40px;
        text-align: left;
        font-weight: 500;
        position: absolute;
        bottom: 0;
        width: fit-content;
    }
</style>