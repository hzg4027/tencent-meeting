import { ref, onMounted } from "vue";
export default function Music() {
  const playing = ref(false);
  const audio = ref(null);
  const onPlay = () => {
    if (playing.value) {
      audio.value.pause();
    } else {
      audio.value.play();
    }
  };
  onMounted(() => {
    audio.value = document.getElementById("audio");
    audio.value.addEventListener("play", function () {
      playing.value = true;
    });
    audio.value.addEventListener("pause", function () {
      playing.value = false;
    });
  });
  return {
    audio,
    playing,
    onPlay,
  };
}
