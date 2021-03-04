import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");

document.body.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);
