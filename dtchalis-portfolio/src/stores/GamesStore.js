import { writable } from 'svelte/store';

export const GamesStore = writable([
    { title: 'Refractal', image: '' },
    { title: 'Tower Jump', image: '' },
    { title: 'DCM', image: '' },
    { title: 'Burst', image: '' },
    { title: 'Super Rhythm Fighter', image: '' },
]);