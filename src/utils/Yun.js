import { TweenMax, Power1 } from "gsap";
const PIXI = window.PIXI;
// const height = (750 / window.innerWidth) * window.innerHeight;
// export const yunContainer = new PIXI.Container();

// const yunInfo = [
//   { width: 888, height: 1074, x: 0, y: height / 2 - 330 },
//   { width: 762, height: 470, x: 137, y: height / 2 - 719 },
//   { width: 1043, height: 997, x: -293, y: height / 2 - 1052 },
//   { width: 750, height: 1179, x: 0, y: height / 2 - 732 },
//   { width: 1725, height: 796, x: -146, y: height / 2 - 967 },
// ];
// let yunArr = [];
// for (let i = 4; i >= 0; i--) {
//   const sprite = PIXI.Sprite.from(
//     require("../assets/img/ass" + (i + 1) + ".png").default
//   );
//   sprite.width = yunInfo[i].width;
//   sprite.height = yunInfo[i].height;
//   sprite.x = yunInfo[i].x;
//   sprite.y = yunInfo[i].y;
//   yunContainer.addChild(sprite);
//   yunArr[i] = sprite;
// }

// const time = 1;
// export function yunIn(startCallback, callback) {
//   if (startCallback) startCallback();
//   TweenMax.to(yunArr[4], time, {
//     x: yunInfo[4].x,
//     y: yunInfo[4].y,
//     alpha: 1,
//   });
//   TweenMax.to(yunArr[3], time + 0.1, {
//     x: yunInfo[3].x,
//     y: yunInfo[3].y,
//     alpha: 1,
//   });
//   TweenMax.to(yunArr[2], time + 0.2, {
//     x: yunInfo[2].x,
//     y: yunInfo[2].y,
//     alpha: 1,
//   });
//   TweenMax.to(yunArr[1], time + 0.3, {
//     x: yunInfo[1].x,
//     y: yunInfo[1].y,
//     alpha: 1,
//     onComplete: function () {
//       if (callback) callback();
//     },
//   });
//   TweenMax.to(yunArr[0], time + 0.2, {
//     x: yunInfo[0].x,
//     y: yunInfo[0].y,
//     alpha: 1,
//   });
// }
// export function yunOut(callback, frist) {
//   TweenMax.to(yunArr[4], frist ? 0 : time, {
//     x: -yunInfo[4].width,
//     y: -yunInfo[4].height * 0.2,
//     alpha: 0,
//   });
//   TweenMax.to(yunArr[3], frist ? 0 : time + 0.1, {
//     x: yunArr[3].width,
//     y: -yunArr[3].height * 0.1,
//     alpha: 0,
//   });
//   TweenMax.to(yunArr[2], frist ? 0 : time + 0.2, {
//     x: yunArr[2].width,
//     y: -yunArr[2].height * 0.2,
//     alpha: 0,
//   });
//   TweenMax.to(yunArr[1], frist ? 0 : time + 0.3, {
//     x: yunArr[1].width,
//     y: yunArr[1].height * 0.5,
//     alpha: 0,
//     onComplete: function () {
//       if (callback) callback();
//     },
//   });
//   TweenMax.to(yunArr[0], frist ? 0 : time + 0.2, {
//     x: -yunArr[0].width,
//     y: yunArr[0].height * 0.4,
//     alpha: 0,
//   });
// }
// yunOut(undefined, true);

export default function Yun(start, center, end) {
  this.time = 1;
  this.start = start || undefined;
  this.center = center || undefined;
  this.end = end || undefined;
  const height = (750 / window.innerWidth) * window.innerHeight;
  this.Container = new PIXI.Container();
  this.yunInfo = [
    { width: 888, height: 1074, x: 0, y: height / 2 - 330 },
    { width: 762, height: 470, x: 137, y: height / 2 - 719 },
    { width: 1043, height: 997, x: -293, y: height / 2 - 1052 },
    { width: 750, height: 1179, x: 0, y: height / 2 - 732 },
    { width: 1725, height: 796, x: -146, y: height / 2 - 967 },
  ];
  this.yunArr = [];
  for (let i = 4; i >= 0; i--) {
    const sprite = PIXI.Sprite.from(
      require("../assets/img/ass" + (i + 1) + ".png").default
    );
    sprite.width = this.yunInfo[i].width;
    sprite.height = this.yunInfo[i].height;
    sprite.x = this.yunInfo[i].x;
    sprite.y = this.yunInfo[i].y;
    this.Container.addChild(sprite);
    this.yunArr[i] = sprite;
  }
  this.out(true);

  //ani

  var brt = new PIXI.BaseRenderTexture(750, height, PIXI.SCALE_MODES.LINEAR, 1);
  this.rt = new PIXI.RenderTexture(brt);
  var sprite = new PIXI.Sprite(this.rt);
  this.imgbg = new PIXI.TilingSprite(sprite.texture, 750, height);
}
Yun.prototype = {
  in: function () {
    const self = this;
    if (this.start) this.start();
    const yunArr = this.yunArr;
    const yunInfo = this.yunInfo;
    const time = this.time;
    TweenMax.to(yunArr[4], time, {
      x: yunInfo[4].x,
      y: yunInfo[4].y,
      alpha: 1,
    });
    TweenMax.to(yunArr[3], time + 0.1, {
      x: yunInfo[3].x,
      y: yunInfo[3].y,
      alpha: 1,
    });
    TweenMax.to(yunArr[2], time + 0.2, {
      x: yunInfo[2].x,
      y: yunInfo[2].y,
      alpha: 1,
    });
    TweenMax.to(yunArr[1], time + 0.3, {
      x: yunInfo[1].x,
      y: yunInfo[1].y,
      alpha: 1,
      onComplete: function () {
        if (self.center) self.center();
      },
    });
    TweenMax.to(yunArr[0], time + 0.2, {
      x: yunInfo[0].x,
      y: yunInfo[0].y,
      alpha: 1,
    });
  },
  out: function (frist) {
    const yunArr = this.yunArr;
    const yunInfo = this.yunInfo;
    const time = this.time;
    const self = this;
    TweenMax.to(yunArr[4], frist ? 0 : time, {
      x: -yunInfo[4].width,
      y: -yunInfo[4].height * 0.2,
      alpha: 0,
    });
    TweenMax.to(yunArr[3], frist ? 0 : time + 0.1, {
      x: yunArr[3].width,
      y: -yunArr[3].height * 0.1,
      alpha: 0,
    });
    TweenMax.to(yunArr[2], frist ? 0 : time + 0.2, {
      x: yunArr[2].width,
      y: -yunArr[2].height * 0.2,
      alpha: 0,
    });
    TweenMax.to(yunArr[1], frist ? 0 : time + 0.3, {
      x: yunArr[1].width,
      y: yunArr[1].height * 0.5,
      alpha: 0,
      onComplete: function () {
        if (self.end) self.end();
      },
    });
    TweenMax.to(yunArr[0], frist ? 0 : time + 0.2, {
      x: -yunArr[0].width,
      y: yunArr[0].height * 0.4,
      alpha: 0,
    });
  },
  move: function () {
    const height = (750 / window.innerWidth) * window.innerHeight;
    const blurFilter1 = new PIXI.filters.BlurFilter();
    blurFilter1.blur = 10;
    this.Container.filters = [blurFilter1];
    //app.stage.addChild(imgbg);
    TweenMax.to(this.imgbg.tilePosition, 5, {
      y: height * 10,
      ease: Power1.easeInOut,
      onUpdate: () => {
        // if (blurFilter1.blur > 10) {
        //   blurFilter1.blur =
        //     blurFilter1.blur < 0 ? 0 : blurFilter1.blur - 0.1;
        // } else {
        //   blurFilter1.blur = blurFilter1.blur + 0.1;
        // }
        // console.log("blur :>> ", blurFilter1.blur);
      },
      onComplete: () => {
        this.Container.filters = [];
        //app.stage.removeChild(imgbg);
      },
    });
  },
};

// function startMove() {
//   startAni = true;
//   //app.stage.addChild(sprite);
//   yunContainer.filters = [blurFilter1];
//   app.stage.addChild(imgbg);
//   TweenMax.to(imgbg.tilePosition, 5, {
//     y: height * 10,
//     ease: Power1.easeInOut,
//     onUpdate: () => {
//       // if (blurFilter1.blur > 10) {
//       //   blurFilter1.blur =
//       //     blurFilter1.blur < 0 ? 0 : blurFilter1.blur - 0.1;
//       // } else {
//       //   blurFilter1.blur = blurFilter1.blur + 0.1;
//       // }
//       // console.log("blur :>> ", blurFilter1.blur);
//     },
//     onComplete: () => {
//       yunContainer.filters = [];
//       app.stage.removeChild(imgbg);
//     },
//   });
// }
