<script>
	import Footer from './components/Footer.svelte';
	import Content from './components/PageContent.svelte';

	import Games from './components/Games.svelte';
    import Music from './components/Music.svelte';
    import Graphics from './components/Graphics.svelte';
    import Info from './components/Info.svelte';
    import Contact from './components/Contact.svelte';

	let items = ['HOME', 'GAMES', 'MUSIC', 'GRAPHICS', 'INFO', 'CONTACT']; 
	let activeItem = 'HOME';

	const handleTabChange = (e) => {
		activeItem = e.detail;
	}

	const resetActiveTab = () => {
        activeItem = 'HOME';
    }

	const linkToGames = () => {
		activeItem = 'GAMES';
		console.log("Games page should be shown");
	}
</script>

{#if activeItem != 'HOME'}
	<div class="panelbg">s</div>
{/if}

{#if activeItem === 'GAMES'}
	<Games/>
{:else if activeItem === 'MUSIC'}
	<Music/>
{:else if activeItem === 'GRAPHICS'}
	<Graphics/>
{:else if activeItem === 'INFO'}
	<Info on:linkToGames={linkToGames}/>
{:else if activeItem === 'CONTACT'}
	<Contact/>
{/if}

<Footer {activeItem} {items} on:tabChange={handleTabChange} on:resetActiveTab={resetActiveTab}/>

<style>
	.panelbg{
		background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.301));
	}

	div {
        color: transparent;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 45%;
        background-color: #122932;
    }
</style>