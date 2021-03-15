import { createApp } from "vue";

import App from "./App.vue";
createApp(App).mount("#app");
// import vconsole from "vconsole";
// new vconsole();
document.body.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);
