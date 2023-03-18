import { writable } from 'svelte/store';

export const GamesStore = writable([
    { id: 0, title: 'ReFractal', card: 'img/Assets/gifs/Refractal_card.gif', splash: 'img/Assets/gifs/Refractal_splash.gif', accent: '#1A121F', link: 'google.com'},
    { id: 1, title: 'Burst - Component Creator', card: 'img/Assets/gifs/BurstCC_card.gif', splash: 'img/Assets/gifs/BurstCC_splash.gif', accent: '#EEEEEE', link: 'google.com'},
    // { id: 2, title: 'Tower Jump', card: 'img/Assets/gifs/TowerJump_card.png', splash: 'img/Assets/gifs/TowerJump_splash_2.gif', accent: '', link: 'google.com' },
    // { id: 3, title: 'Burst TCG', card: '', splash: '', accent: ''},
    // { id: 4, title: 'Super Rhythm Fighter', card: '', splash: '', accent: '' },
    // { id: 5, title: 'Die Man Dungeon', card: '', splash: '', accent: '' },
    // { id: 6, title: 'DCM', card: '', splash: '', accent: '', accent: '' },
    // { id: 7, title: 'Beyond the Veil', card: '', splash: '', accent: '' },
    // { id: 8, title: 'Lament In Paradise', card: '', splash: '', accent: '' },
    // { id: 9, title: 'Requiem of the End', card: '', splash: '', accent: '' },
    // { id: 10, title: 'SankVerse', card: '', splash: '', accent: '' },
]);