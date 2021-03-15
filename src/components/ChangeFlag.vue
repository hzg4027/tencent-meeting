<template>
  <div class="change-flag page">
    <div class="change-box" :class="{ show: !showPreview }">
      <img src="../assets/img/ass25.png" class="bg" />
      <div class="content-box" :style="{ transform: 'scale(' + bl + ')' }">
        <img src="../assets/img/logo-2.png" class="logo" />
        <img src="../assets/img/ass12.png" class="ass12" />
        <swiper :slides-per-view="3" :space-between="0" :loop="true">
          <swiper-slide v-for="i in 17" :key="i">
            <div
              class="flag"
              :class="{ changed: changeArr.indexOf(i) > -1 }"
              @click="onChangeFlag(i)"
            >
              <img
                :src="require('../assets/img/text-' + i + '-.png').default"
              />
            </div>
          </swiper-slide>
          <img src="../assets/img/ass14.png" class="arrow arrow-left" />
          <img src="../assets/img/ass14.png" class="arrow arrow-right" />
        </swiper>
        <ul class="selected-box">
          <li
            v-for="(i, index) in 5"
            :key="i"
            :class="{ selected: changeArr[index] }"
          >
            <img
              v-if="changeArr[index]"
              class="text"
              :src="
                require('../assets/img/text-' + changeArr[index] + '.png')
                  .default
              "
            />
            <img
              src="../assets/img/ass17.png"
              alt=""
              class="ass17"
              @click="onDelFlag(index)"
            />
          </li>
        </ul>
        <button
          class="ass18"
          @click="onSubmit"
          :class="{ show: changeArr.length > 2 }"
        >
          <img src="../assets/img/ass18.png" alt="" />
        </button>
      </div>
    </div>

    <div class="preview" :class="{ show: showPreview }">
      <div class="content-box" :style="{ transform: 'scale(' + bl + ')' }">
        <img src="../assets/img/logo-2.png" class="logo" />
        <img src="../assets/img/ass23.png" class="ass23" />
        <img
          v-if="changeArr.length === 5"
          src="../assets/img/ass24.png"
          class="ass24"
        />
        <img
          v-else-if="changeArr.length === 4"
          src="../assets/img/ass26.png"
          class="ass24"
        />
        <img
          v-else-if="changeArr.length === 3"
          src="../assets/img/ass27.png"
          class="ass24"
        />
        <p class="preview-text">
          <img
            v-for="(item, i) in changeArr"
            :key="i"
            :src="require('../assets/img/text-' + item + '--.png').default"
          />
        </p>
      </div>
      <img src="../assets/img/ass25.png" class="bg" />

      <div class="content-box" :style="{ transform: 'scale(' + bl + ')' }">
        <button class="ass22" @click="onStartGame">
          <img src="../assets/img/ass22.png" />
        </button>
      </div>
    </div>

    <div class="note" :class="{ show: showNote }" @click="onRemoveNote">
      <img src="../assets/img/ass19.png" alt="" class="ass19" />
      <img src="../assets/img/ass20.png" alt="" class="ass20" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.less";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    bl: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    const changeArr = ref([]);
    const onChangeFlag = (i) => {
      if (changeArr.value.indexOf(i) !== -1 || changeArr.value.length >= 5) {
        return;
      }

      changeArr.value.push(i);
      //console.log("changeArr.value :>> ", changeArr.value);
    };
    const onDelFlag = (index) => {
      changeArr.value.splice(index, 1);
    };

    //
    const showPreview = ref(false);
    const onSubmit = () => {
      if (changeArr.value.length < 3) return;

      showPreview.value = true;
      console.log("changeArr.value :>> ", changeArr.value);
      emit("update:result", { changeNumber: changeArr.value, clickNumber: 0 });
      try {
        //eslint-disable-next-line
        MtaH5.clickStat("2")
      } catch (error) {
        console.log("Mta error :>> ");
      }
    };

    //
    const showNote = ref(false);
    let timer = null;
    const onRemoveNote = () => {
      if (!showNote.value) return;
      showNote.value = false;
      if (timer) clearTimeout(timer);
    };
    onMounted(() => {
      showNote.value = true;
      timer = setTimeout(onRemoveNote, 8000);
    });

    //
    const onStartGame = () => {
      emit("changePage", () => {
        emit("update:pageCurrent", 3);
      });
      try {
        //eslint-disable-next-line
        MtaH5.clickStat("3")
      } catch (error) {
        console.log("Mta error :>> ");
      }
    };

    return {
      onStartGame,
      onRemoveNote,
      showNote,
      onChangeFlag,
      onDelFlag,
      onSubmit,
      changeArr,
      showPreview,
    };
  },
};
</script>

<style lang="less">
.change-flag {
  background-image: url("../assets/img/bg2.jpg");
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: 100% 100%;
  .swiper-container {
    width: 97.06667vw;
    height: 53.06667vw;
    text-align: center;
    position: relative;
    margin: 0 auto;
    margin-top: 21.2vw;
    //background-image: url("../assets/img/ass11.png");
    background-size: 100% auto;
    background-position: left bottom;
    background-repeat: no-repeat;
  }
  .ass12 {
    width: 92.8vw;
    position: absolute;
    left: 4.4vw;
    top: 8.93333vw;
  }
  .logo {
    top: 6vw;
  }
  .flag {
    width: 23.46667vw;
    height: 48.93333vw;
    background-image: url("../assets/img/ass10.png");
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    &.changed {
      filter: grayscale(100%);
    }
    &:active {
      transform: scale(0.98);
    }
    img {
      width: 20vw;
    }
  }
  .arrow {
    width: 3.73333vw;
    position: absolute;
    top: 50%;
    margin-top: -3.33333vw;
    left: 0;
    z-index: 1;
    //animation: arrow-left 0.5s linear infinite alternate;
    &.arrow-right {
      left: auto;
      right: 0;
      transform: rotateY(180deg);
      //animation: arrow-right 0.5s linear infinite alternate;
    }
  }
  .selected-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 5.33333vw;
    li {
      list-style-type: none;
      background-image: url("../assets/img/ass16.png");
      background-size: 100% 100%;
      width: 32.66667vw;
      height: 33.86667vw;
      margin-bottom: 1.33333vw;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      &.selected {
        background-image: url("../assets/img/ass15.png");
        .ass17 {
          display: block;
        }
      }
      img.text {
        width: 18vw;
        //height: 66%;
        margin-right: 2.2vw;
        margin-bottom: 3vw;
      }
      .ass17 {
        width: 6.93333vw;
        position: absolute;
        top: 0.2vw;
        right: 1vw;
        display: none;
        &:active {
          transform: scale(0.98);
        }
      }
    }
  }
  button.ass18 {
    width: 63.46667vw;
    height: 16.53333vw;
    position: absolute;
    left: 14.13333vw;
    bottom: 10.4vw;
    filter: grayscale(100%);
    &:active {
      transform: scale(1);
    }
    &.show {
      filter: none;
      animation: zoomIn 1s linear infinite alternate;
      &:active {
        transform: scale(0.98);
      }
    }
    img {
      float: left;
      width: 100%;
    }
  }
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
    transition: 0.5s 0s all;
    &.show {
      opacity: 1;
      visibility: visible;
      transition: 0.5s 1s all;
    }
    .ass19 {
      width: 48.2667vw;
      position: absolute;
      left: 50%;
      margin-left: -24.13vw;
      top: 50%;
      margin-top: -30.66667vw;
    }
    .ass20 {
      width: 15.33333vw;
      position: absolute;
      left: 50%;
      margin-left: -5.5vw;
      top: 50%;
      margin-top: -25vw;
      animation: hand-lr 1s linear infinite alternate;
    }
  }
  img.bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .change-box {
    opacity: 0;
    visibility: hidden;
    &.show {
      opacity: 1;
      visibility: visible;
    }
  }
  .preview {
    opacity: 0;
    visibility: hidden;
    &.show {
      opacity: 1;
      visibility: visible;
    }
    .ass22 {
      width: 63.46667vw;
      height: 16.53333vw;
      position: absolute;
      left: 14.13333vw;
      bottom: 10.4vw;
      animation: zoomIn 1s linear infinite alternate;
      img {
        width: 100%;
        float: left;
      }
    }
    .ass23 {
      width: 133.2vw;
      position: absolute;
      left: -17.86667vw;
      top: 0;
    }
    .ass24 {
      position: absolute;
      width: 70vw;
      left: 14.13333vw;
      top: 14.13333vw;
    }
    .preview-text {
      img {
        position: absolute;
        width: 10vw;
        &:nth-child(4) {
          top: 53vw;
          left: 42.4vw;
        }
        &:nth-child(1) {
          top: 63vw;
          left: 21.8vw;
        }
        &:nth-child(2) {
          top: 85vw;
          left: 63vw;
        }
        &:nth-child(3) {
          top: 108vw;
          left: 41vw;
        }
        &:nth-child(5) {
          top: 124vw;
          left: 21.8vw;
        }
      }
    }
  }
  @keyframes hand-lr {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(3.66667vw, 0, 0);
    }
  }
}
@keyframes arrow-left {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(1vw, 0, 0);
  }
}
@keyframes arrow-right {
  0% {
    transform: translate3d(0, 0, 0) rotateY(180deg);
  }
  100% {
    transform: translate3d(-1vw, 0, 0) rotateY(180deg);
  }
}
</style>
