<template>
<div>
  <div class="pulse h3" @mousedown="buttonDown" @mouseup="sendMessage">
    <b-icon icon="mic"></b-icon>
  </div>
  <audio ref="audio" src="@/assets/sound/notification.mp3" preload id="audio" muted></audio>
</div>
</template>

<script>
export default {
  name: 'Button',
  data: () => ({
    start: new Date(),
  }),
  methods: {
    buttonDown() {
      this.start = new Date();
    },
    sendMessage() {
      let now = new Date();
      let duration = now.getTime() - this.start.getTime();

      document.getElementById('audio').play();

      this.$emit('newMessage', duration);
    }
  }
}
</script>

<style>
.pulse {
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--first);
  cursor: pointer;
  box-shadow: 0 0 0 var(--first);

  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.pulse:active {
  animation: pulse 1s infinite;
}

.pulse:hover {
  transform: scale(1.05);
}

@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(0, 168, 157, 0.4);
  }

  70% {
    -webkit-box-shadow: 0 0 0 10px rgba(0, 168, 157, 0);
  }

  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(0, 168, 157, 0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    -moz-box-shadow: 0 0 0 0 rgba(0, 168, 157, 0.4);
    box-shadow: 0 0 0 0 rgba(0, 168, 157, 0.4);
  }

  70% {
    transform: scale(1.15);
    -moz-box-shadow: 0 0 0 10px rgba(0, 168, 157, 0);
    box-shadow: 0 0 0 10px rgba(0, 168, 157, 0);
  }

  100% {
    transform: scale(1);
    -moz-box-shadow: 0 0 0 0 rgba(0, 168, 157, 0);
    box-shadow: 0 0 0 0 rgba(0, 168, 157, 0);
  }
}
</style>
