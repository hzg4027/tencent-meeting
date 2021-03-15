<template>
  <div class="loading">
    <div class="content-box" :style="{ transform: 'scale(' + bl + ')' }">
      <p>
        <span>{{ progress }}%</span>
      </p>

      <img src="../assets/img/logo.png" class="logo" />
      <img src="../assets/img/loading-3.png" alt="" class="loading-3" />
    </div>

    <img src="../assets/img/loading-1.png" alt="" class="loading-1" />
    <img src="../assets/img/loading-2.png" alt="" class="loading-2" />
  </div>
</template>

<script>
import { watchEffect } from "vue";
import useImageLoad from "../hooks/useImgLoading";
import { BASE_URL } from "../config";
export default {
  props: {
    bl: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    let imgArr = [
      BASE_URL + "/long3/long.png",
      BASE_URL + "/long4/long.png",
      BASE_URL + "/long5/long.png",
      require("../assets/img/logo-2.png").default,
      require("../assets/img/bg2.jpg").default,
    ];
    for (let i = 1; i <= 33; i++) {
      imgArr.push(require("../assets/img/ass" + i + ".png").default);
    }
    for (let i = 1; i <= 17; i++) {
      imgArr.push(require("../assets/img/text-" + i + ".png").default);
      imgArr.push(require("../assets/img/text-" + i + "-.png").default);
      imgArr.push(require("../assets/img/text-" + i + "--.png").default);
    }

    for (let i = 1; i <= 6; i++) {
      imgArr.push(require("../assets/img/game/bg_0" + i + ".jpg").default);
      imgArr.push(require("../assets/img/game/bgtop_0" + i + ".png").default);
    }

    const { count, progress } = useImageLoad(imgArr);
    watchEffect(() => {
      if (progress.value === 100) {
        emit("update:loaded", true);
      }
    });
    return {
      count,
      progress,
    };
  },
};
</script>

<style lang="less" scoped>
.loading {
  width: 100%;
  height: 100%;
  position: relative;
  .logo {
    bottom: 14.93333vw;
  }
  p {
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
    font-size: 8vw;
    text-align: center;
    color: #fff;
    span {
      margin-bottom: 6.66667vw;
    }
  }
  .loading-1,
  .loading-2 {
    position: absolute;
    top: 50%;
    left: 33.2vw;
    margin-top: 8.4vw;
    width: 82.4vw;
  }
  .loading-2 {
    left: 0;
    margin-top: 9.2vw;
  }
  .loading-3 {
    width: 40.13333vw;
    position: absolute;
    left: 50%;
    margin-left: -20vw;
    top: 12.8vw;
  }
}
</style>
