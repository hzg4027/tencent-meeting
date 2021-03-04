import { ref, watchEffect } from "vue";
function imgPromise(src) {
  return new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve();
    i.onerror = reject;
    i.src = src;
  });
}
function useImageLoad(arr) {
  const count = ref(0);
  const progress = ref(0);

  watchEffect(() => {
    progress.value =
      (progress.value > 100
        ? 100
        : Math.ceil((count.value / arr.length) * 100)) || 0;
    if (count.value > arr.length - 1) return;
    imgPromise(arr[count.value])
      .then(() => {
        count.value++;
      })
      .catch(() => {
        count.value++;
      });
  });

  return {
    count,
    progress,
  };
}
export default useImageLoad;
