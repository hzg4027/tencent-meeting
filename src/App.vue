<template>
  <div class="content-box" ref="contentBox" style="z-index: -1"></div>
  <Loading :bl="bl" v-model:loaded="loaded" v-if="pageCurrent === 0" />
  <Home
    :bl="bl"
    v-if="pageCurrent === 1"
    @changePage="changePage"
    v-model:pageCurrent="pageCurrent"
  />
  <ChangeFlag
    :bl="bl"
    v-if="pageCurrent === 2"
    @changePage="changePage"
    v-model:pageCurrent="pageCurrent"
    v-model:result="result"
  />
  <Game
    :bl="bl"
    :pageCurrent="pageCurrent"
    @changePage="changePage"
    v-model:pageCurrent="pageCurrent"
    v-model:result="result"
    :result="result"
  />
  <Result
    :bl="bl"
    v-if="pageCurrent === 4"
    :result="result"
    @changePage="changePage"
    v-model:pageCurrent="pageCurrent"
  />
  <Music v-show="pageCurrent !== 3" :pageCurrent="pageCurrent" />
  <Yun ref="yun" />
</template>

<script>
import { ref, onMounted, watchEffect } from "vue";
import Loading from "./components/Loading";
import Home from "@/components/Home.vue";
import Yun from "@/components/Yun.vue";
import ChangeFlag from "@/components/ChangeFlag.vue";
import Game from "@/components/Game.vue";
import Result from "@/components/Result.vue";
import Music from "@/components/Music.vue";
export default {
  name: "App",
  components: {
    Loading,
    Home,
    Yun,
    ChangeFlag,
    Game,
    Result,
    Music,
  },
  setup() {
    const result = ref({ changeNumber: [], clickNumber: 0 });
    const pageCurrent = ref(0);
    const loaded = ref(false);
    const yun = ref(null);
    const bl = ref(0);
    const contentBox = ref(null);
    function resize() {
      let temp = window.innerHeight / contentBox.value.offsetHeight;
      bl.value = temp > 1 ? 1 : temp;
    }
    function changePage(callback) {
      if (callback) {
        yun.value.yun.center = compose(callback, yun.value.yun.center);
      }
      yun.value.yun.in();

      // yun.value.yunIn(
      //   () => {
      //     yun.value.start = true;
      //   },
      //   () => {
      //     if (callback) callback();
      //     setTimeout(() => {
      //       //yun.value.startMove();
      //       yun.value.yunOut(() => {
      //         yun.value.start = false;
      //       });
      //     }, 200);
      //   }
      // );
    }
    onMounted(() => {
      resize();
      window.onresize = () => setTimeout(resize, 200);
    });
    watchEffect(() => {
      if (loaded.value) {
        console.log("资源加载完成");
        changePage(() => {
          pageCurrent.value = 1;
        });
      }
    });
    return {
      result,
      changePage,
      loaded,
      pageCurrent,
      yun,
      contentBox,
      bl,
    };
  },
};
function compose(f, g) {
  return function (x) {
    return f(g(x));
  };
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
html,
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
img,
p,
span {
  user-select: none;
}
button {
  background-color: transparent;
  border: 0;
  outline: none;
  &:active {
    transform: scale(0.98);
  }
}
.page {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.logo {
  width: 32.13333vw;
  position: absolute;
  left: 50%;
  margin-left: -16vw;
}
.content-box {
  width: 100%;
  height: 193.2vw;
  position: absolute;
  transform-origin: center 0;
  top: 0;
  left: 0;
}
#app {
  font-family: "font1680", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("./assets/img/bg.jpg");
  background-size: cover;
  background-position: center;
  position: absolute;
}
@keyframes zoomIn {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.95) translateY(-1vw);
  }
}
</style>
