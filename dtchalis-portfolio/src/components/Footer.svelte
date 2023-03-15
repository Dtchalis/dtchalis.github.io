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
    <img on:click={() => dispatch('resetActiveTab', 'HOME')} src="img/Assets/Dtchalis_Logo_Text_2.gif" alt="">
    <Tabs {activeItem} {items} on:tabChange></Tabs>
</footer>

<style>
    /* h1{
        color: white;
        font-weight: 100;
        font-size: 80px;
        border: 0px;
        margin: 0px 16px;
        cursor: pointer;
        width: fit-content;
    }

    h1:hover{
        color: #ffb100;
    } */

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