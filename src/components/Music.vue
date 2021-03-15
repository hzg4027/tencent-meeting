<template>
  <button class="music" :class="{ play: playing }" @click="onPlay"></button>
</template>

<script>
import Music from "../hooks/Music";
export default {
  setup() {
    const { playing, onPlay } = Music();
    return {
      playing,
      onPlay,
    };
  },
};
</script>

<style lang="less" scoped>
.music {
  width: 8vw;
  height: 8vw;
  background-image: url("../assets/img/music.png");
  background-size: 200% 100%;
  position: absolute;
  top: 1vw;
  right: 1vw;
  background-position: -100% 0;
  z-index: 100;
  &.play {
    background-position: 0 0;
  }
}
</style>
