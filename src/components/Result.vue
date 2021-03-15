<template>
  <div class="result page">
    <div class="bg-box">
      <img
        v-if="result.bgy < 873"
        :src="require('../assets/img/game/bg_01.jpg').default"
      />
      <img
        v-if="result.bgy >= 873 && result.bgy < 4090"
        :src="require('../assets/img/game/bg_04.jpg').default"
      />
      <img
        v-if="result.bgy >= 4090"
        :src="require('../assets/img/game/bg_06.jpg').default"
      />

      <div class="content-box" :style="{ transform: 'scale(' + bl + ')' }">
        <img src="../assets/img/ass31.png" alt="" class="ass31" />
        <img
          v-if="result.changeNumber.length === 5"
          src="../assets/img/ass24.png"
          class="ass24 long"
        />
        <img
          v-else-if="result.changeNumber.length === 4"
          src="../assets/img/ass26.png"
          class="ass24 long"
        />
        <img
          v-else-if="result.changeNumber.length === 3"
          src="../assets/img/ass27.png"
          class="ass24 long"
        />
        <div class="flag-text-box">
          <img
            class="flag-text"
            v-for="(item, i) in result.changeNumber"
            :key="i"
            :src="require('../assets/img/text-' + item + '--.png').default"
          />
        </div>
      </div>
      <!-- <div class="top-yun">
        <img
          v-for="i in 4"
          :key="i"
          :src="require('../assets/img/game/bgtop_0' + i + '.png').default"
        />
      </div> -->
    </div>

    <img src="../assets/img/ass25.png" class="bg" />
    <template v-if="creartPoster">
      <img
        v-if="result.bgy < 873"
        src="../assets/img/logo-2.png"
        class="logo top"
      />
      <img v-else src="../assets/img/logo.png" class="logo top" />
    </template>

    <img v-else src="../assets/img/logo.png" class="logo" />
    <template v-if="!creartPoster">
      <button class="restart" @click="onRestart">
        <img src="../assets/img/ass13.png" class="ass13" />
      </button>
      <button class="create" @click="onCreatePoster">
        <img src="../assets/img/ass30.png" class="ass30" />
      </button>
    </template>

    <div class="text">
      <p class="nick-name" :class="{ show: poster }">{{ nickName }}</p>
      <p>
        将龙旗抬起<span>{{ result.clickNumber * 100 }}米</span>
      </p>
      <p>
        超过<span>{{ getBF() }}</span
        >的人
      </p>
      <p class="end"><img src="../assets/img/ass32.png" alt="" /></p>
    </div>
    <div v-show="false" id="qrcode"></div>
    <div v-show="creartPoster" class="code">
      <img :src="code" />
    </div>
    <img
      v-show="creartPoster"
      src="../assets/img/ass33.png"
      class="code-text"
    />
    <!-- <img
        :src="require('../assets/img/code/' + codeStr + '.png').default"
        class="code"
      /> -->
    <img v-if="poster" src="../assets/img/ass29.png" class="ass29" />
    <img v-if="poster" :src="poster" class="poster" />
  </div>
</template>

<script>
import { ref, nextTick } from "vue";
import { ElLoading } from "element-plus";
//import http from "axios";
import { getQueryVariable } from "../utils/Util";
const QRCode = window.QRCode;
//import QRious from "qrious";
export default {
  props: {
    result: {
      type: Object,
      default: () => {},
    },
    bl: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    const code = ref("");
    let str = "https://meeting.xb2.cn/";
    if (getQueryVariable("utm_source")) {
      str += "?utm_source=" + getQueryVariable("utm_source");
    }

    nextTick(() => {
      new QRCode(document.getElementById("qrcode"), {
        text: str,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
      // qrcode.set({
      //   level: "H",
      //   padding: 4,
      //   size: 194,
      //   value: str,
      // });

      code.value = document.querySelector("#qrcode canvas").toDataURL();
    });

    //code
    let codeStr = ref(getQueryVariable("utm_source") || "code");
    //旗子位置
    const weizhi = [
      { x: 156, y: 510 },
      { x: 482, y: 680 },
      { x: 306, y: 874 },
      { x: 320, y: 426 },
      { x: 153, y: 994 },
    ];
    const poster = ref("");
    const nickName = ref(window.nickName);
    const onRestart = () => {
      emit("changePage", () => {
        emit("update:pageCurrent", 2);
      });
      try {
        //eslint-disable-next-line
        MtaH5.clickStat("4")
      } catch (error) {
        console.log("Mta error :>> ");
      }
    };

    const getBF = () => {
      const MAX_NUMBER = 60;
      let text = "";
      // if (props.result.bgy < 873) {
      //   text = "99%";
      // }
      // if (props.result.bgy >= 873 && props.result.bgy < 4090) {
      //   text = "65%";
      // }
      // if (props.result.bgy >= 4090) {
      //   text = "35%";
      // }
      // if (props.result.clickNumber === 0) {
      //   text = "0%";
      // }
      text =
        props.result.clickNumber / MAX_NUMBER > 1
          ? "99%"
          : ((props.result.clickNumber / MAX_NUMBER) * 100).toFixed(0) + "%";

      return text;
    };

    const creartPoster = ref(false);
    const onCreatePoster = async () => {
      try {
        //eslint-disable-next-line
        MtaH5.clickStat("5")
      } catch (error) {
        console.log("Mta error :>> ");
      }
      const loading = ElLoading.service();
      const canvas = document.createElement("canvas");
      canvas.width = 750;
      canvas.height = 1449;
      const ctx = canvas.getContext("2d");
      //背景
      let cbg = "";
      if (props.result.bgy < 873) {
        cbg = require("../assets/img/game/bg_01.jpg").default;
      }
      if (props.result.bgy >= 873 && props.result.bgy < 4090) {
        cbg = require("../assets/img/game/bg_04.jpg").default;
      }
      if (props.result.bgy >= 4090) {
        cbg = require("../assets/img/game/bg_06.jpg").default;
      }
      await drawImg(ctx, cbg, 0, 0, 750, 1224, 0, 0, 750, 1224);
      //龙
      let longPath = "";
      switch (props.result.changeNumber.length) {
        case 5:
          longPath = require("../assets/img/ass24.png").default;
          break;
        case 4:
          longPath = require("../assets/img/ass26.png").default;
          break;
        case 3:
          longPath = require("../assets/img/ass27.png").default;
          break;
        default:
          break;
      }
      await drawImg(ctx, longPath, 0, 0, 525, 1324, 94, 120, 560, 1412);
      for (let i = 0; i < props.result.changeNumber.length; i++) {
        //console.log("props.changeNumber[i] :>> ", props.result.changeNumber[i]);
        await drawImg(
          ctx,
          require("../assets/img/text-" +
            props.result.changeNumber[i] +
            "--.png").default,
          0,
          0,
          92,
          160,
          weizhi[i].x,
          weizhi[i].y,
          86,
          150
        );
      }
      //云
      // await drawImg(
      //   ctx,
      //   require("../assets/img/game/bgtop_01.png").default,
      //   0,
      //   0,
      //   750,
      //   1083,
      //   0,
      //   28,
      //   750,
      //   1083
      // );
      //右上角文字
      await drawImg(
        ctx,
        require("../assets/img/ass31.png").default,
        0,
        0,
        331,
        395,
        460,
        20,
        331,
        395
      );
      //边框
      await drawImg(
        ctx,
        require("../assets/img/ass25.png").default,
        0,
        0,
        750,
        1449,
        0,
        0,
        750,
        1449
      );

      //logo
      let logImg = "";
      if (props.result.bgy < 873) {
        logImg = require("../assets/img/logo-2.png").default;
      } else {
        logImg = require("../assets/img/logo.png").default;
      }
      await drawImg(ctx, logImg, 0, 0, 241, 41, 10, 55, 188, 32);

      //code
      ctx.fillStyle = "#a27961";

      ctx.fillRect(559, 1216, 150, 150);
      ctx.fillStyle = "#ffffff";

      ctx.fillRect(563, 1220, 142, 142);
      await drawImg(ctx, code.value, 0, 0, 200, 200, 567, 1224, 134, 134);

      await drawImg(
        ctx,
        require("../assets/img/code-logo.png").default,
        0,
        0,
        68,
        68,
        559 + 75 - 10,
        1216 + 75 - 10,
        25,
        25
      );

      await drawImg(
        ctx,
        require("../assets/img/ass33.png").default,
        0,
        0,
        198,
        18,
        538,
        1386,
        198,
        18
      );

      //文字
      ctx.font = "25px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = "#8d6b4d";
      ctx.fillText(window.nickName, 40, 1248);
      ctx.fillText("将龙头抬起", 40, 1298);
      ctx.font = "38px Arial";
      ctx.fillText(props.result.clickNumber * 100 + "米", 172, 1300);
      ctx.font = "25px Arial";
      ctx.fillText("超过", 40, 1346);
      ctx.font = "38px Arial";
      ctx.textAlign = "center";
      ctx.fillText(getBF(), 134, 1348);
      ctx.font = "25px Arial";
      ctx.fillText("的人", 200, 1346);
      await drawImg(
        ctx,
        require("../assets/img/ass32.png").default,
        0,
        0,
        452,
        56,
        22,
        1365,
        452,
        56
      );

      poster.value = canvas.toDataURL("image/jpeg", 0.8);
      creartPoster.value = true;
      loading.close();

      // http
      //   .post("/poster", {
      //     image: poster.value,
      //   })
      //   .then((res) => {
      //     console.log("res.data :>> ", res.data);
      //     if (res.data.data) {
      //       window.shareData = {
      //         ...window.shareData,
      //         link: res.data.data.share_link,
      //       };
      //       /* eslint-disable */
      //       wx.ready(function () {
      //         console.log('result window.shareData :>> ', window.shareData);
      //         wx.updateAppMessageShareData(window.shareData);
      //         wx.updateTimelineShareData(window.shareData);
      //       });
      //       /* eslint-disable */
      //     }

      //     loading.close();
      //     creartPoster.value = true;
      //   });
    };
    return {
      code,
      getBF,
      weizhi,
      poster,
      nickName,
      onRestart,
      creartPoster,
      onCreatePoster,
      codeStr,
    };
  },
};

function drawImg(
  ctx,
  src,
  sx = 0,
  sy = 0,
  swidth,
  sheight,
  x,
  y,
  width,
  height
) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      ctx.drawImage(
        img,
        sx,
        sy,
        swidth || img.width,
        sheight || img.height,
        x,
        y,
        width || img.width,
        height || img.height
      );
      resolve();
    };
  });
}
</script>

<style lang="less">
.result {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .logo {
    position: absolute;
    width: 32.13333vw;
    left: 70.8vw;
    bottom: 5.2vw;
    margin-left: 0;
    width: 24.66667vw;
    &.top {
      bottom: auto;
      left: 2vw;
      top: 5vw;
      width: 25.06667vw;
    }
  }
  .bg-box {
    position: relative;
    width: 100%;
    overflow: hidden;

    img {
      width: 100%;
      float: left;
    }
    .top-yun {
      width: 100%;
      position: absolute;
      top: 3.73333vw;
      bottom: 0;
      left: 0;
    }
    img.long {
      width: 74vw;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
      top: 13vw;
    }

    .ass31 {
      width: 44.13333vw;
      position: absolute;
      top: 2.53333vw;
      right: -6vw;
    }

    .flag-text-box {
      img.flag-text {
        width: 11.2vw;
        position: absolute;
        &:nth-child(1) {
          left: 20.8vw;
          top: 65vw;
        }
        &:nth-child(2) {
          left: 64.26667vw;
          top: 87.66667vw;
        }
        &:nth-child(3) {
          left: 40.99333vw;
          top: 113.53333vw;
        }
        &:nth-child(4) {
          left: 42.66667vw;
          top: 53.8vw;
        }
        &:nth-child(5) {
          left: 21vw;
          top: 129.53333vw;
        }
      }
    }
  }
  button.create,
  button.restart {
    position: absolute;
    left: 0;
    width: 15.73333vw;
    height: 44.13333vw;
    top: 50%;
    margin-top: -17vw;
    transform-origin: 0 50%;
    &.restart {
      margin-top: -66vw;
    }
    img {
      width: 100%;
      float: left;
    }
  }
  .bg {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    min-height: 100%;
  }
  .text {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 6.5vw;

    p {
      font-size: 3.3vw;
      color: #8d6b4d;
      line-height: 6vw;
      height: 6vw;
      padding-left: 5.5vw;
      box-sizing: border-box;
      letter-spacing: 0.26667vw;
      font-family: Arial;
      span {
        font-size: 5.06667vw;
        display: inline-block;
        margin: 0 0.53333vw;
      }
      &.nick-name {
        //font-size: 3.5vw;
        //text-shadow: 0 0 2vw rgba(76, 40, 27, 0.45);
        //color: #775537;
        //-webkit-text-stroke: 0.13333vw #fff;
        //font-weight: bold;
        opacity: 0;
        &.show {
          opacity: 1;
        }
      }
      &.end {
        font-weight: bold;
        font-size: 3.8vw;
        letter-spacing: 1.8vw;
        margin-top: 2vw;
        color: #775537;
        img {
          width: 60.26667vw;
        }
      }
    }
  }
  .code {
    position: absolute;
    bottom: 10vw;
    right: 3.2vw;
    padding: 2px;
    background-color: #a27961;
    width: 20vw;
    height: 20vw;
    &::after {
      content: "";
      width: 3.3333vw;
      height: 3.3333vw;
      background-image: url("../assets/img/code-logo.png");
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    img {
      width: 100%;
      border: 2px solid #fff;
      box-sizing: border-box;
    }
  }
  .code-text {
    position: absolute;
    bottom: 6vw;
    width: 26.4vw;
    right: 2vw;
  }
  .ass29 {
    width: 41.06667vw;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scale(1.2);
    bottom: 32vw;
  }
  .poster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    opacity: 0;
  }
}
</style>
