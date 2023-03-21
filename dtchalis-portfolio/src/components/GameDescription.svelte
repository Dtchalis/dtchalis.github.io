<script>
    import { GamesStore } from '../stores/GamesStore.js';

    export let gameID = 0;
</script>

<div class="parent">
    <div class="child">
        <p style="color: {$GamesStore[gameID].fontColor}">Available On These Platforms</p>
        <!-- {@html $GamesStore[gameID].description} -->
    </div>
</div>

<style>
    .parent {
        color: white;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 55%;
        background-color: #122932;
        justify-content: center;
        display: flex;
    }

    .child {
        background-color: #244653;
        
        margin-top: 50px;
        margin-bottom: 50px;

        justify-content: center;
        display: flex;
        flex: 5 10 5 10;
        align-items: center;
    }

    p {
        font-size: 2em;
        width: 50%;
        /* line-height: 1.5em; */
        background: black;
    }

    /* br {
        margin: 20px;
    } */
</style>