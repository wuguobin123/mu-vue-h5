/**
 * 节流
 * @param {*} fn
 * @param {*} delay
 */
export const throttle = (func, wait, type = 1) => {
  if (type === 1) {
    var previous = 0;
  } else if (type === 2) {
    var timeout;
  }
  return function() {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();
      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    }
  };
};

/**
 * 防抖
 * @param {*} fn
 * @param {*} delay
 */
export function debounce(fn, delay) {
  let timer = null;
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  };
}
