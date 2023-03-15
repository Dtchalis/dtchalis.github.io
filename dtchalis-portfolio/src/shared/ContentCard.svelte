<script>
    export let position = 0;
    export let item = {title: '', image: '', genre: ''};
</script>

<div class="card" style="transform: translateY({(position) * 100}%)">
    <!-- <img src={item.image} alt=""> -->
    <h2>{item.title}</h2>
</div>

<style>
    .card{
        background-color: black;
        height: fit-content;
        text-align: right;
        cursor: pointer;
        /* padding: 1px; */

        border-radius: 5px;
    }
    .card:hover{
        background-color: rgb(38, 0, 255);
    /* padding: 1px; */
    }
</style>