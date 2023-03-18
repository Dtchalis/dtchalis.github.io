<script>
    export let playbackTime = 0;
    export let duration = 100;
    export let isPlaying = false;
  
    function togglePlayback() {
      isPlaying = !isPlaying;
    }
  
    function onScrub(event) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const percentage = x / rect.width;
      playbackTime = percentage * duration;
    }
  </script>
  
  <div class="music-player">
    <button on:click={togglePlayback}>
      {#if isPlaying}
        Pause
      {:else}
        Play
      {/if}
    </button>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="scrubbing-bar" on:click={onScrub}>
      <div class="progress" style={`width: ${(playbackTime / duration) * 100}%`}></div>
    </div>
  
    <div class="playback-time">{playbackTime.toFixed(2)} / {duration.toFixed(2)}</div>
  </div>
  
  <style>
    .music-player {
      display: flex;
      align-items: center;
      width: 100%;
    }
  
    button {
      margin-right: 1rem;
    }
  
    .scrubbing-bar {
      position: relative;
      height: 0.5rem;
      width: 100%;
      background-color: #ddd;
      cursor: pointer;
    }
  
    .progress {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      background-color: #00a0df;
    }
  
    .playback-time {
      margin-left: auto;
    }
  </style>
  