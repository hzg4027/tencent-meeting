<template>
  <div class="loading">
    <p>{{ progress }}%</p>
  </div>
</template>

<script>
import useImageLoad from "../hooks/useImgLoading";
export default {
  setup() {
    let imgArr = [];
    // for (let i = 1; i <= 28; i++) {
    //   imgArr.push(require('../assets/img/ass' + i + '.png'));
    // }
    const { count, progress } = useImageLoad(imgArr);
    return {
      count,
      progress,
    };
  },
};
</script>

<style lang="less" scoped>
.loading {
  width: 31.86667vw;
  height: 50.13333vw;
  background-image: url("../assets/img/loading-bg.png");
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 8vw;
    text-align: center;
    color: #fff;
  }
}
</style>
