<script>
    import MusicPlayer from "../shared/MusicPlayer.svelte";

</script>

<div class="parent">
    <div class="child">
      <h1>Latest n' Greatest</h1>
      <div class="button-container">
        <button>Orchestral</button>
        <button>VGM</button>
        <button>Hip-Hop/RnB</button>
      </div>
      <MusicPlayer></MusicPlayer>
    </div>
  </div>
  
  <style>
    h1 {
      font-family: 'MonumentExtended';
      border-left: solid 10px #ffb100;
      /* padding-left: 10px; */
      /* margin-left: 20px; */
    }
  
    .parent {
      color: white;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 45%;
      background-color: #122932;
      justify-content: center;
      display: flex;
    }
  
    .child {
      border: 1px solid white;
      margin: 50px 50px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
  
    .button-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 20px;
    }
  
    button {
      flex: 1;
      height: 80px;
      font-size: 16px;
      border-radius: 0px;
      border: none;
      background-color: #fff;
      color: #122932;
      cursor: pointer;
    }
    button:first-child{
        margin-right: 10px;
    }
    button:last-child{
        margin-left: 10px;
    }
  </style>
  