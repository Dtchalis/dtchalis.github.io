import { writable } from 'svelte/store';

export const GamesStore = writable([
    {   
        id: 0, title: 'ReFractal', card: 'img/Assets/gifs/Refractal_card.gif', splash: 'img/Assets/gifs/Refractal_splash.gif', 
        accent: '#21fb8e', hasDemo: true, link: 'https://drive.google.com/file/d/1luWuWMLQMFEpuZ3SpsgWehNUij4qQ8sv/view?usp=sharing', 
        fontColor: 'white', description: 'Discover a small game of light and shadow!<br><br>Turn mirrors, open portals and solve puzzles across a budding galaxy in over 50+ levels!'
    },
    { 
        id: 1, title: 'Tower Jump', card: 'img/Assets/gifs/TowerJump_card.gif', splash: 'img/Assets/gifs/TowerJump_splash.gif', 
        accent: 'White', hasDemo: true, link: 'https://drive.google.com/file/d/1aHGbuTZYFOCPtvknd2kKbHrwkVAHqt_7/view?usp=sharing', 
        fontColor: 'white', description: 'Ascend through the floors of a mysterious tower!<br><br>In this arcade adventure, a couple jumps a day keeps the pain at bay!' 
    },
    { 
        id: 2, title: 'Burst - Component Creator', card: 'img/Assets/gifs/BurstCC_card.gif', splash: 'img/Assets/gifs/BurstCC_splash.gif', 
        accent: 'white', hasDemo: false, link: '', 
        fontColor: 'black', description: "Create, edit and publish cards for the official 'Burst' TCG!<br><br>What's 'Burst' you ask?<br><br>Good question...stay tuned for more." 
    },
    // { id: 3, title: 'Burst TCG', card: '', splash: '', accent: ''},
    // { id: 4, title: 'Super Rhythm Fighter', card: '', splash: '', accent: '' },
    // { id: 5, title: 'Die Man Dungeon', card: '', splash: '', accent: '' },
    // { id: 6, title: 'DCM', card: '', splash: '', accent: '', accent: '' },
    // { id: 7, title: 'Beyond the Veil', card: '', splash: '', accent: '' },
    // { id: 8, title: 'Lament In Paradise', card: '', splash: '', accent: '' },
    // { id: 9, title: 'Requiem of the End', card: '', splash: '', accent: '' },
    // { id: 10, title: 'SankVerse', card: '', splash: '', accent: '' },
]);