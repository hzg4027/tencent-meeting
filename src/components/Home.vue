<template>
  <div class="home">
    <div class="content-box" :style="{ transform: 'scale(' + bl + ')' }">
      <img src="../assets/img/ass7.png" class="ass7" />
      <img src="../assets/img/ass8.png" alt="" class="ass8" />
      <img src="../assets/img/ass9.png" alt="" class="ass9" />
      <button class="ass6" @click="start">
        <img src="../assets/img/ass6.png" />
      </button>
      <img src="../assets/img/logo-2.png" alt="" class="logo" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bl: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    const start = () => {
      emit("changePage", () => {
        emit("update:pageCurrent", 2);
      });
      try {
        //eslint-disable-next-line
        MtaH5.clickStat("1")
      } catch (error) {
        console.log("Mta error :>> ");
      }
    };
    return {
      start,
    };
  },
};
</script>

<style lang="less">
.home {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .logo {
    top: 50%;
    margin-top: -90.4vw;
  }
  .ass6 {
    width: 60.8vw;
    position: absolute;
    top: 50%;
    margin-top: 62.8vw;
    left: 15.33333vw;
    img {
      float: left;
      width: 100%;
    }
    animation: zoomIn 1s linear infinite alternate;
  }
  .ass7 {
    width: 82.13333vw;
    position: absolute;
    top: 50%;
    margin-top: -80.66667vw;
    left: 10.8vw;
  }

  .ass8,
  .ass9 {
    position: absolute;
    top: 50%;
    left: -25.2vw;
    margin-top: -11vw;
    width: 157.46667vw;
  }
  .ass9 {
    left: -1vw;
    margin-top: -3vw;
    width: 120.93333vw;
  }
}
</style>
