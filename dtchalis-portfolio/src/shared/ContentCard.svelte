<script>
    // export let position = 0;
    export let item = {title: '', image: '', genre: ''};
</script>
 
<div class="card">
    <!-- <img src={item.image} alt=""> -->
    <h2>{item.title}</h2>
    <div class="itemImage" style="background: url({item.image});"></div>
    <div class="overlay"/>
</div>

<style>
    .card{
        background-color: black;
        height: 200px;
        text-align: right;
        cursor: pointer;
        margin: 30px 0px;
    
        border-radius: 5px;

        /* background: linear-gradient(to left, transparent, yellow); */
    }
    h2 {
        position: absolute;
    }
    .itemImage{
        background: red;
    }
    .overlay{
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background: transparent;
    }
    .overlay:hover{
        background: linear-gradient(to right, transparent, rgba(38, 0, 255));
    }
</style>