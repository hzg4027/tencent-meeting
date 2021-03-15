<template>
  <div class="fly-yun" id="fly-yun" :class="{ show: start }">
    <!-- <img src="../assets/img/ass5.png" class="ass5 ani" />
    <img src="../assets/img/ass4.png" class="ass4 ani" />
    <img src="../assets/img/ass3.png" class="ass3 ani" />
    <img src="../assets/img/ass2.png" class="ass2 ani" />
    <img src="../assets/img/ass1.png" class="ass1 ani" /> -->
    <!-- <button style="right: 0" @click="yunOut">out</button>
    <button @click="yunIn">in</button> -->
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
//import { yunContainer, yunIn, yunOut } from "../utils/Yun";
import Yun from "../utils/Yun";
const PIXI = window.PIXI;
export default {
  setup() {
    const height = (750 / window.innerWidth) * window.innerHeight;
    const start = ref(false);
    const app = new PIXI.Application({
      width: 750,
      height,
      transparent: true,
    });
    let centerFun = undefined;
    const yun = new Yun(
      function () {
        start.value = true;
      },
      function () {
        setTimeout(() => {
          yun.out();
        }, 200);
      },
      function () {
        start.value = false;
      }
    );
    app.stage.addChild(yun.Container);

    //const yunContainer = new PIXI.Container();

    //app.stage.addChild(yunContainer);

    //ani
    // const blurFilter1 = new PIXI.filters.BlurFilter();
    // blurFilter1.blur = 10;
    // var brt = new PIXI.BaseRenderTexture(
    //   750,
    //   height,
    //   PIXI.SCALE_MODES.LINEAR,
    //   1
    // );
    // var rt = new PIXI.RenderTexture(brt);
    // var sprite = new PIXI.Sprite(rt);
    // let imgbg = new PIXI.TilingSprite(sprite.texture, 750, height);
    // let startAni = false;

    // function startMove() {
    //   startAni = true;
    //   //app.stage.addChild(sprite);
    //   yunContainer.filters = [blurFilter1];
    //   app.stage.addChild(imgbg);
    //   TweenMax.to(imgbg.tilePosition, 5, {
    //     y: height * 10,
    //     ease: Power1.easeInOut,
    //     onUpdate: () => {
    //       // if (blurFilter1.blur > 10) {
    //       //   blurFilter1.blur =
    //       //     blurFilter1.blur < 0 ? 0 : blurFilter1.blur - 0.1;
    //       // } else {
    //       //   blurFilter1.blur = blurFilter1.blur + 0.1;
    //       // }
    //       // console.log("blur :>> ", blurFilter1.blur);
    //     },
    //     onComplete: () => {
    //       yunContainer.filters = [];
    //       app.stage.removeChild(imgbg);
    //     },
    //   });
    // }

    // app.ticker.add(function () {
    //   if (!startAni) return;
    //   //imgbg.tilePosition.y += 30;
    //   app.renderer.render(yunContainer, rt);
    // });

    // const yunInfo = [
    //   { width: 888, height: 1074, x: 0, y: app.renderer.height / 2 - 330 },
    //   { width: 762, height: 470, x: 137, y: app.renderer.height / 2 - 719 },
    //   { width: 1043, height: 997, x: -293, y: app.renderer.height / 2 - 1052 },
    //   { width: 750, height: 1179, x: 0, y: app.renderer.height / 2 - 732 },
    //   { width: 1725, height: 796, x: -146, y: app.renderer.height / 2 - 967 },
    // ];
    // let yunArr = [];
    // for (let i = 4; i >= 0; i--) {
    //   const sprite = PIXI.Sprite.from(
    //     require("../assets/img/ass" + (i + 1) + ".png").default
    //   );
    //   sprite.width = yunInfo[i].width;
    //   sprite.height = yunInfo[i].height;
    //   sprite.x = yunInfo[i].x;
    //   sprite.y = yunInfo[i].y;
    //   yunContainer.addChild(sprite);
    //   yunArr[i] = sprite;
    // }

    // const time = 1;
    // function yunIn(callback) {
    //   start.value = true;
    //   TweenMax.to(yunArr[4], time, {
    //     x: yunInfo[4].x,
    //     y: yunInfo[4].y,
    //     alpha: 1,
    //   });
    //   TweenMax.to(yunArr[3], time + 0.1, {
    //     x: yunInfo[3].x,
    //     y: yunInfo[3].y,
    //     alpha: 1,
    //   });
    //   TweenMax.to(yunArr[2], time + 0.2, {
    //     x: yunInfo[2].x,
    //     y: yunInfo[2].y,
    //     alpha: 1,
    //   });
    //   TweenMax.to(yunArr[1], time + 0.3, {
    //     x: yunInfo[1].x,
    //     y: yunInfo[1].y,
    //     alpha: 1,
    //     onComplete: function () {
    //       start.value = true;
    //       if (callback) callback();
    //     },
    //   });
    //   TweenMax.to(yunArr[0], time + 0.2, {
    //     x: yunInfo[0].x,
    //     y: yunInfo[0].y,
    //     alpha: 1,
    //   });
    // }
    // function yunOut(callback, frist) {
    //   TweenMax.to(yunArr[4], frist ? 0 : time, {
    //     x: -yunInfo[4].width,
    //     y: -yunInfo[4].height * 0.2,
    //     alpha: 0,
    //   });
    //   TweenMax.to(yunArr[3], frist ? 0 : time + 0.1, {
    //     x: yunArr[3].width,
    //     y: -yunArr[3].height * 0.1,
    //     alpha: 0,
    //   });
    //   TweenMax.to(yunArr[2], frist ? 0 : time + 0.2, {
    //     x: yunArr[2].width,
    //     y: -yunArr[2].height * 0.2,
    //     alpha: 0,
    //   });
    //   TweenMax.to(yunArr[1], frist ? 0 : time + 0.3, {
    //     x: yunArr[1].width,
    //     y: yunArr[1].height * 0.5,
    //     alpha: 0,
    //     onComplete: function () {
    //       start.value = false;
    //       if (callback) callback();
    //     },
    //   });
    //   TweenMax.to(yunArr[0], frist ? 0 : time + 0.2, {
    //     x: -yunArr[0].width,
    //     y: yunArr[0].height * 0.4,
    //     alpha: 0,
    //   });
    // }
    // yunOut(undefined, true);

    onMounted(() => {
      document.getElementById("fly-yun").appendChild(app.view);
    });
    return {
      start,
      yun,
      centerFun,
    };
  },
};
</script>

<style lang="less">
.fly-yun {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 101;
  canvas {
    width: 100%;
  }
  visibility: hidden;
  &.show {
    visibility: visible;
  }
  .ani {
    position: absolute;
    top: 50%;
  }
  .ass5 {
    width: 230vw;
    left: -19.53333vw;
    margin-top: -129vw;
  }
  .ass4 {
    width: 100vw;
    right: 0;
    margin-top: -97.6vw;
  }
  .ass3 {
    width: 139.06667vw;
    right: 0;
    margin-top: -140.26667vw;
  }
  .ass2 {
    width: 139.06667vw;
    left: 18.2vw;
    margin-top: -95.8vw;
  }
  .ass1 {
    width: 118.4vw;
    left: 0;
    margin-top: -44vw;
  }
}
</style>
