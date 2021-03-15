<template>
  <div class="game" v-show="pageCurrent === 3">
    <div id="game"></div>
    <div class="note" :class="{ show: showNote }" @click="onRemoveNote">
      <img src="../assets/img/ass21.png" alt="" class="ass21" />
      <img src="../assets/img/ass20.png" alt="" class="ass20" />
      <img src="../assets/img/ass28.png" alt="" class="ass28" />
      <p>我知道了</p>
    </div>
    <div class="count-down" v-if="countDownText > 0">
      <p>
        {{ countDownText === 4 ? "开始" : countDownText }}
      </p>
    </div>
    <p class="info" v-if="countDownText <= 0">
      倒计时:{{ (countDown / 1000).toFixed(0) }}s<br />
    </p>
    <p class="info" v-if="countDownText <= 0" style="left: auto; right: 0">
      抬⻰头:{{ clickNumber * 100 }}米<br />
    </p>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from "vue";
import swipeUp from "../utils/swipeUp";
import "pixi-spine";
import { TweenMax, Power0, Power1 } from "gsap";
import { BASE_URL } from "../config";
const PIXI = window.PIXI;
import { MotionBlurFilter } from "@pixi/filter-motion-blur";
import { Howl } from "howler";
import Music from "../hooks/Music";
import { getQueryVariable } from "../utils/Util";

export default {
  props: {
    bl: {
      type: Number,
      default: 1,
    },
    result: {
      type: Object,
      default: () => {},
    },
    pageCurrent: {
      type: Number,
      default: -1,
    },
  },
  setup(props, { emit }) {
    //music
    var sound = new Howl({
      src: [require("../assets/media/start.mp3").default],
      volume: 0.5,
    });
    //声音控制
    const { playing, audio } = Music();
    let musicState = false;

    //游戏提示
    const showNote = ref(true);
    const onRemoveNote = () => {
      if (!showNote.value) return;
      showNote.value = false;

      setTimeout(onGameStart, 1000);
    };

    function init() {
      const app = new PIXI.Application({
        width: 750,
        height: (750 / window.innerWidth) * window.innerHeight,
        backgroundColor: 0x1099bb,
      });
      //背景图
      const bgHeight = 1275 * 6;
      const bgContainer = new PIXI.Container();
      for (let i = 0; i < 6; i++) {
        const sprite = PIXI.Sprite.from(
          require("../assets/img/game/bg_0" + (i + 1) + ".jpg").default
        );
        sprite.y = i * 1275;
        bgContainer.addChild(sprite);
      }
      bgContainer.y = -(bgHeight - app.renderer.height);

      //前景云
      const bgtopContainer = new PIXI.Container();
      for (let i = 0; i < 6; i++) {
        const sprite = PIXI.Sprite.from(
          require("../assets/img/game/bgtop_0" + (i + 1) + ".png").default
        );
        sprite.y = i * 1275;
        bgtopContainer.addChild(sprite);
      }

      bgtopContainer.y = -(bgHeight - app.renderer.height);
      return {
        app,
        bgHeight,
        bgContainer,
        bgtopContainer,
      };
    }

    const { app, bgHeight, bgContainer, bgtopContainer } = init();

    app.stage.addChild(bgContainer);

    //龙
    const longName = ["long3", "long4", "long5"];
    let goblin = {};
    const loaded = ref(false);
    const str = ref("long" + props.result.changeNumber.length);
    const goblinContainer = new PIXI.Container();
    const textContainer = new PIXI.Container();
    app.stage.addChild(goblinContainer);
    app.loader
      .add("long3", BASE_URL + "/long3/long.json")
      .add("long4", BASE_URL + "/long4/long.json")
      .add("long5", BASE_URL + "/long5/long.json")
      .load(onAssetsLoaded);

    function onAssetsLoaded(loader, res) {
      for (let i = 0; i < longName.length; i++) {
        goblin[longName[i]] = new PIXI.spine.Spine(res[longName[i]].spineData);

        // set the position
        goblin[longName[i]].x = 330 * props.bl;
        goblin[longName[i]].y = 1800 * props.bl;
        goblin[longName[i]].width = 680 * props.bl;
        goblin[longName[i]].height = 1676 * props.bl;
        goblin[longName[i]].alpha = 0;

        goblinContainer.addChild(goblin[longName[i]]);
      }
      //if (str.value) goblin[str.value].alpha = 1;

      TweenMax.to(goblinContainer, 0, {
        x: 350 - (680 * props.bl) / 2,
        y: app.renderer.height - 400 * props.bl,
      });
      drawText();
      textContainer.x = -57 * props.bl;
      textContainer.y = 20;
      goblinContainer.addChild(textContainer);
      app.stage.addChild(bgtopContainer);
      loaded.value = true;
    }

    //文字
    function drawText() {
      textContainer.removeChildren(0, 5);
      //文字
      const weizhi = [
        { x: 180, y: 620 },
        { x: 578, y: 826 },
        { x: 364, y: 1050 },
        { x: 380, y: 522 },
        { x: 180, y: 1200 },
      ];
      for (let i = 0; i < props.result.changeNumber.length; i++) {
        const sprite = PIXI.Sprite.from(
          require("../assets/img/text-" +
            props.result.changeNumber[i] +
            "--.png").default
        );
        sprite.width = 92 * props.bl;
        sprite.height = 160 * props.bl;

        sprite.x = weizhi[i].x * props.bl;
        sprite.y = weizhi[i].y * props.bl;
        textContainer.addChild(sprite);
      }
    }

    //游戏参数
    const GAME_CONFIG = {
      time: 5000, //游戏时长(毫秒)
      height: Math.abs(bgContainer.y), //背景距离顶部距离
      minTime: 500, //点击间隔最小时间(毫秒)
    };

    let clickNumber = ref(0); //点击次数
    const countDown = ref(GAME_CONFIG.time); //游戏中倒计时
    const countDownText = ref(4); //开始前倒计时
    let startTime = undefined; //游戏开始时间
    let endTime = undefined; //最后一次点击事件

    //背景动画
    function setAni() {
      const blurFilter1 = new MotionBlurFilter([0, 0], 25); //模糊滤镜
      let fff = 0;
      return TweenMax.to([bgContainer, bgtopContainer], 5, {
        //y: 0,
        ease: Power1.easeOut,
        paused: true,
        onStart: () => {
          console.log("背景动画开始");
          PIXI.spine.Spine.globalAutoUpdate = true;
          //动态模糊

          bgtopContainer.filters = [blurFilter1];
          bgContainer.filters = [blurFilter1];
        },
        onComplete: () => {
          // console.log("游戏结束");
          // bgtopContainer.filters = [];
          // bgContainer.filters = [];
          // ani.paused();
          // startTime = undefined;
          // PIXI.spine.Spine.globalAutoUpdate = false;
          // emit("changePage", () => {
          //   emit("update:result", {
          //     ...props.result,
          //     clickNumber: clickNumber.value,
          //     bgy: Math.abs(bgContainer.y),
          //   });
          //   emit("update:pageCurrent", 4);
          // });
          // if (musicState) audio.value.play();
        },
        onUpdate: () => {
          if (new Date().getTime() - endTime > GAME_CONFIG.minTime) {
            fff = fff < 0 ? 0 : fff - 0.3;
            blurFilter1.setVelocity([0, fff]);
          } else {
            fff = fff > 40 ? 40 : fff + 0.8;
            blurFilter1.setVelocity([0, fff]);
          }
        },
      });
    }
    let ani = setAni();

    let clickLen =
      GAME_CONFIG.height /
      (getQueryVariable("time") ? Number(getQueryVariable("time")) : 30);
    const onClick = () => {
      if (countDown.value <= 0) return;

      if (clickNumber.value === 0) {
        TweenMax.to(goblinContainer, 1, {
          //delay: 0.7,
          y: 0,
          ease: Power0.easeNone,
          onStart: () => {
            goblin[str.value].state.setAnimation(0, "idle1", true);
          },
          onComplete: () => {
            ani.play();
          },
        });
      }

      if (
        startTime &&
        countDown.value > 0 &&
        countDown.value < GAME_CONFIG.time
      ) {
        //如果游戏开始
        endTime = new Date().getTime(); //每次滑动的时间

        //如果上次滑动事件小于阈值
        if (new Date().getTime() - endTime < GAME_CONFIG.minTime) {
          let tempY =
            clickNumber.value * clickLen - GAME_CONFIG.height >= 0
              ? 0
              : clickNumber.value * clickLen - GAME_CONFIG.height;

          ani.updateTo({ y: tempY }, false);
        }
      }
      clickNumber.value++;
    };

    app.ticker.add(() => {
      if (startTime && countDown.value > 0) {
        //倒计时
        let t = GAME_CONFIG.time - (new Date().getTime() - startTime);
        countDown.value = t > 0 ? t : 0;
      }
      if (startTime && countDown.value <= 0) {
        console.log("游戏结束");
        bgtopContainer.filters = [];
        bgContainer.filters = [];
        ani.paused();
        startTime = undefined;
        PIXI.spine.Spine.globalAutoUpdate = false;

        emit("changePage", () => {
          emit("update:result", {
            ...props.result,
            clickNumber: clickNumber.value,
            bgy: Math.abs(bgContainer.y),
          });
          emit("update:pageCurrent", 4);
        });
        if (musicState) audio.value.play();
      }
    });

    const onGameStart = () => {
      if (playing.value) {
        audio.value.pause();
        sound.play();
        musicState = true;
      } else {
        musicState = false;
      }
      countDownText.value--;
      goblin[str.value].alpha = 1;
      goblin[str.value].state.setAnimation(0, "idle", false);
      const timer = setInterval(() => {
        if (countDownText.value === 0) {
          clearInterval(timer);
          startTime = new Date().getTime();
          endTime = startTime;
          console.log("游戏开始:");
        }
        countDownText.value--;
      }, 1000);
    };
    watchEffect(() => {
      if (loaded.value && props.result.changeNumber.length >= 3) {
        for (let i = 0; i < longName.length; i++) {
          goblin[longName[i]].alpha = 0;
          goblin[longName[i]].state.setEmptyAnimation(0);
        }

        str.value = "long" + props.result.changeNumber.length;
        // goblin[str.value].alpha = 1;
        drawText();
      }

      //初始化参数
      if (props.pageCurrent === 3) {
        //musicState = playing.value;
        clickNumber.value = 0; //点击次数
        countDown.value = GAME_CONFIG.time; //倒计时
        countDownText.value = 4;
        startTime = undefined; //游戏开始时间
        endTime = undefined; //最后一次点击事件
        ani = null;
        ani = setAni();
        bgContainer.y = -(bgHeight - app.renderer.height);
        bgtopContainer.y = -(bgHeight - app.renderer.height);
        showNote.value = true;

        PIXI.spine.Spine.globalAutoUpdate = true;
        if (!loaded.value) return;
        TweenMax.to(goblinContainer, 0, {
          x: 350 - (680 * props.bl) / 2,
          y: app.renderer.height - 400 * props.bl,
        });
      }
    });

    //
    onMounted(() => {
      document.getElementById("game").appendChild(app.view);
      //滑动事件绑定
      swipeUp("game", onClick);
    });

    return {
      onGameStart,
      countDown,
      clickNumber,
      onClick,
      showNote,
      onRemoveNote,
      countDownText,
    };
  },
};
</script>

<style lang="less">
.game {
  .note {
    background-color: rgba(0, 0, 0, 0.85);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;

    p {
      color: #fff;
      border: 1px solid #fff;
      padding: 1.3333vw;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 13.3333vw;
      font-size: 4.2667vw;
      opacity: 0;
    }
    &.show {
      opacity: 1;
      visibility: visible;
      transition: 0.5s 1.5s all;
    }
    .ass21 {
      width: 58.8vw;
      position: absolute;
      left: 20.93333vw;
      top: 50%;
      margin-top: -8vw;
    }
    .ass20 {
      width: 15.33333vw;
      position: absolute;
      left: 50%;
      margin-left: -2.5vw;
      top: 50%;
      margin-top: -37vw;
      animation: hand-up 0.8s 1.5s ease-out infinite;
    }
    .ass28 {
      width: 6.53333vw;
      position: absolute;
      left: 50%;
      margin-left: -15.2vw;
      top: 50%;
      margin-top: -34.8vw;
      animation: arrow-up 0.8s 1.5s ease-out infinite;
    }
  }
  p.info {
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    z-index: 10;
    font-size: 5.33333vw;
    text-shadow: 1.0667vw 0.9333vw 1.33333vw rgba(66, 43, 13, 0.84);
    color: #b78855;
    -webkit-text-stroke: 0.13333vw #fff;
  }
  .count-down {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 19.06667vw;
    text-shadow: 0 0 2.66667vw #d4856f;
    color: #d6b695;
    -webkit-text-stroke: 0.13333vw #fff;
    p {
      margin-bottom: 40%;
    }
  }
}
#game {
  canvas {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}

@keyframes hand-up {
  0% {
    transform: translate3d(0, 10.66667vw, 0) rotate(-20deg);
    opacity: 0;
  }
  60% {
    transform: translate3d(0, 0, 0) rotate(0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 0, 0) rotate(0);
    opacity: 1;
  }
}
@keyframes arrow-up {
  0% {
    transform: translate3d(0, 0, 0);
  }
  10% {
    transform: translate3d(0, 0, 0);
  }
  20% {
    transform: translate3d(0, -4vw, 0);
  }
  30% {
    transform: translate3d(0, 0, 0);
  }
  40% {
    transform: translate3d(0, -2vw, 0);
  }
  60% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
