<template>
  <Loading />
</template>

<script>
import Loading from "./components/Loading";

export default {
  name: "App",
  components: {
    Loading,
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100vw;
  height: 100vh;
}
img,
p,
span {
  user-select: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("./assets/img/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
