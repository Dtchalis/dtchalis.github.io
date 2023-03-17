<script>
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";
    let dispatch = createEventDispatcher();

    let fields = { name: '', email: '', message: ''};
    let errors = { name: '', email: ''};
    let valid = false;

    let defaultMessage = 'Drop us a message here...';

    const submitHandler = (e) => {
        valid = true;

        // validate name
        if (fields.name.trim().length < 1) {
            valid = false;
            errors.name = 'Name must be at least 1 character long';
        } else {
            errors.name = '';
        }

        // validate email
        if (fields.email.trim().length < 1) {
            valid = false;
            errors.email = "E-mail can't be empty";
        } else if (!fields.email.includes('@')) {
            valid = false;
            errors.email = "E-mail must include an '@' symbol";
        } else {
            errors.email = '';
        }

        if (valid) {
            console.log(fields);
            dispatch('submitContact', fields);
        }
    }

    onMount(() => {
        fields.message = defaultMessage;
    });
</script>

<div class="parent">
    <div class="child">
        <form on:submit|preventDefault={submitHandler}>
            <h1>Let's Talk</h1>
            
            <h2>Start a dialogue or sign up for our mailing list below.</h2>
            
            <label for="name">Name</label>
            <input type="text" id="name" bind:value={fields.name}>
            
            <label for="email">E-Mail</label>
            <input type="email" id="email" bind:value={fields.email}>
            
            <!-- make this a component that auto erases on click -->
            <textarea bind:value={fields.message}></textarea>
            <label for=""></label>
            
            <button on:click={submitHandler}>Submit</button>
        </form>
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
            font-family: "Segoe UI";
            font-weight: 500;
            font-size: 19px;
            /* padding: 200px; */
            margin: 140px;
            /* border: 1px solid white; */
            display: flex;
        }

        h1 {
            font-family: 'MonumentExtended';
            border-left: solid 10px #ffb100;
            padding-left: 10px;
        }

        h2 {
            font-family: 'Segoe UI';
            font-weight: 500;
        }

        input{
            width: 100%;

            background-color: transparent;
            border: solid 1px white;
            border-radius: 5px;

            color: white;
            padding: 10px 18px;

            text-align: start;
        }

        input[type="email"]:valid{
            background-color: transparent;
        }

        textarea{
            width: 100%;
            height: 200px;

            background-color: transparent;
            border: solid 1px white;
            border-radius: 5px;

            color: white;
            padding: 10px 18px;
            margin-top: 25px;

            text-align: start;
        }

        button {
            width: 120px;
            height: 60px;

            background-color: #ffb100;
            border: transparent;
            border-radius: 5px;

            color: black;
            font-family: 'MonumentExtended';
            /* font-weight: 100; */
        }

        /* p {
            margin-top: 50px;
            margin-bottom: 50px;
        }

        a { 
            color: #ffb100;
        } */
</style>