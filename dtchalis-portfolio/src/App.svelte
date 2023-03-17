<script>
	import { onMount } from 'svelte';

	import Footer from './components/Footer.svelte';
	import SplashArt from './components/SplashArt.svelte';

	import Games from './components/Games.svelte';
    import Music from './components/Music.svelte';
    import Graphics from './components/Graphics.svelte';
    import Info from './components/Info.svelte';
    import Contact from './components/Contact.svelte';
	
	//MUSIC, GRAPHICS
	let items = ['HOME', 'GAMES', 'INFO', 'CONTACT']; 
	// let items = ['HOME', 'GAMES', 'MUSIC', 'GRAPHICS', 'INFO', 'CONTACT']; 
	let activeItem = 'HOME';
	let gameID = 0;

	const handleTabChange = (e) => {
		activeItem = e.detail;
	}

	const resetActiveTab = () => {
        activeItem = 'HOME';
    }

	const handleLinkClicked = (e) => {
		activeItem = e.detail;
		console.log(activeItem + ' page should be shown');
	}

	const handleMouseOver = (e) => {
		gameID = e.detail;
	}

	onMount(() => {
		activeItem = 'HOME';
	});
</script>

{#if activeItem === 'GAMES'}
	<SplashArt {gameID}/>
{/if}
<Footer {activeItem} {items} on:tabChange={handleTabChange} on:resetActiveTab={resetActiveTab}/>

{#if activeItem != 'HOME'}
	<div class="panelbg"></div>
{/if}

{#if activeItem === 'GAMES'}
	<Games on:handleMouseOver={handleMouseOver}/>
{:else if activeItem === 'MUSIC'}
	<Music/>
{:else if activeItem === 'GRAPHICS'}
	<Graphics/>
{:else if activeItem === 'INFO'}
	<Info on:onLinkClicked={handleLinkClicked}/>
{:else if activeItem === 'CONTACT'}
	<Contact/>
{/if}

<style>
	.panelbg{		
		background: linear-gradient(to right, transparent, #122932);

		position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 45%;
    }
</style>