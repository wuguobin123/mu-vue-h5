/**
 * 随机生成ID字符串
 */
export function generateId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 获取两个日期之间间隔的天数
 * @param {*} startDateStr
 * @param {*} endDateStr
 */
export function intervalDays(startDateStr, endDateStr) {
  const startDate = new Date(startDateStr).getTime();
  const endDate = new Date(endDateStr).getTime();
  const days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
  return days;
}

/**
 * 对手机号码进行正则匹配
 * @param {*} phone
 */
export function isPhone(phone) {
  const phoneReg = /^1[3456789]\d{9}/g;
  return phoneReg.test(phone);
}

/**
 * 对输入的内容进行安全过滤
 * @param {*} content
 */
export function html2Escape(content) {
  const reg = /[<>&"]/g;
  return content.replace(reg, c => {
    const baseMap = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;"
    };
    return baseMap[c];
  });
}

/**
 * 去除字符串中的空格
 * @param {*} content
 */
export function trimSpace(content) {
  const reg = /\s+/g;
  return content.replace(reg, "");
}

/**
 * 判断字符串是否为空
 * @param {
 * } content
 */
export function isDef(content) {
  return content !== null && content !== undefined;
}

/**
 * 将变量转成数字，如果转化失败则返回原来的字符串
 * @param {*} val
 */
export function toNumber(val) {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
}

/**
 * 判断对象中是否包含某个属性
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * 创建函数的缓存版本
 * @param {*} fn
 */
export function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * 判断字符串是否为固定位数的数字
 * @param {*} content
 * @param {*} num
 */
export function isNumer(content, num) {
  let reg = null;
  if (num) {
    reg = new RegExp("^\\d{" + num + "}$");
  } else {
    reg = new RegExp("^\\d+$");
  }
  return reg.test(content);
}

const toStringFun = Object.prototype.toString;

/**
 * 动态对输入的内容进行正则匹配
 * @param {*} content
 * @param {*} reg
 */
export function regFun(content, reg) {
  if (toStringFun.call(reg) === "[object RegExp]") {
    return reg.test(content);
  } else {
    return false;
  }
}

/**
 * 对表单数据进行动态验证
 * @param {*} formData
 * @param {*} modelKey
 * @param {*} regKey
 * @param {*} errorKey
 */
export function validateForm(
  formData,
  modelKey = "modelVal",
  regKey = "reg",
  errorKey = "errorTip"
) {
  let error = "";
  for (let i = 0, len = formData.length; i < len; i++) {
    let content = formData[i][modelKey];
    let reg = formData[i][regKey];
    if (!reg) {
      continue;
    }
    let isPass = regFun(content, reg);
    if (!isPass) {
      error = formData[i][errorKey];
      break;
    }
  }
  return error;
}

/**
 * 验证表单是否不为null
 * @param {*} formData
 * @param {*} modelKey
 */
export function validateFormIsNull(formData, modelKey = "modelVal") {
  let flag = true;
  for (let i = 0, len = formData.length; i < len; i++) {
    let content = formData[i][modelKey];
    if (!content) {
      flag = false;
      break;
    }
  }
  return flag;
}

// Find components upward
export function findComponentUpward(context, componentName, componentNames) {
  if (typeof componentName === "string") {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }

  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}
// Find components downward
export function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}
/**
  设置title，解决微信改不了title的bug
 */
export function setTitle(title) {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isiOS = userAgent.indexOf("applewebkit") >= 0;
  const isWechat = userAgent.indexOf("micromessenger") >= 0;
  document.title = title;
  if (isiOS && isWechat) {
    const iframe = document.createElement("iframe");
    iframe.src = "https://m.urwork.cn/favicon.ico";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    iframe.onload = function() {
      setTimeout(function() {
        iframe.remove();
      }, 0);
    };
  }
}

/**
 * 两数相乘
 * @param {*} num1
 * @param {*} num2
 */
export function multiply(num1, num2) {
  var m = 0,
    s1 = num1.toString(),
    s2 = num2.toString();
  if (s1.indexOf(".") > 0) {
    m += s1.split(".")[1].length;
  }
  if (s2.indexOf(".") > 0) {
    m += s2.split(".")[1].length;
  }
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}

/**
 * 两数相加
 * @param {*} num1
 * @param {*} num2
 */
export function add(num1, num2) {
  var num1Digits = (num1.toString().split(".")[1] || "").length;
  var num2Digits = (num2.toString().split(".")[1] || "").length;
  var baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}
