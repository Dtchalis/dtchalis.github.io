<script>
    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();
</script>


<div class="parent">
    <div class="child">
        <p>
            Driven by a love for curating euphoric digital experiences, game developer 
            and audio composer 'Dtchalis' strives to innovate within the 
            realms of sound and gameplay.
        </p>
        
        <p>
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            With a diverse background in <a on:click={() => dispatch('onLinkClicked', 'MUSIC')}>film scoring</a>, 
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <a on:click={() => dispatch('onLinkClicked', 'GRAPHICS')}>graphic design</a> and 
            software development, his creative vision blends traditional and modern elements into an eclectic
            collage of analog and digital mediums.
        </p>
        
        <p>
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            At present, Dtchalis is fully dedicated to his <a on:click={() => dispatch('onLinkClicked', 'GAMES')}>upcoming indie games</a> and 
            his highly anticipated debut EP. He strongly welcomes collaboration and 
            can be contacted at 
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <a on:click={() => dispatch('onLinkClicked', 'CONTACT')}>theofficialdtchalis@gmail.com</a>.
        </p>
    </div>
</div>


<style>
    .parent {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 45%;
        /* background-color: #122932; */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .child {
        color: white;
        padding: 50px;

        font-family: "Segoe UI";
        font-weight: 500;
        font-size: 19px;
    }

    p {
        margin-top: 50px;
        margin-bottom: 50px;
    }

    a { 
        color: #ffb100;
    }
</style>