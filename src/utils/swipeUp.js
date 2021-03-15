/**
 *
 * @param {String} domID html节点ID
 * @param {Funtion} callback 回调函数
 */
export default function swipeUp(domID, callback) {
  let startY = 0;
  let endY = 0;
  let touchStartTime = 0;
  let touchEndTime = 0;
  document.getElementById(domID).addEventListener("touchstart", function (e) {
    touchStartTime = new Date().getTime();
    startY = endY = e.touches[0].pageY;
  });
  document.getElementById(domID).addEventListener("touchmove", function (e) {
    endY = e.touches[0].pageY;
    touchEndTime = new Date().getTime();
  });
  document.getElementById(domID).addEventListener("touchend", function () {
    if (startY - endY > 18 && touchEndTime - touchStartTime < 300) {
      if (callback) callback();
    }
  });
}
