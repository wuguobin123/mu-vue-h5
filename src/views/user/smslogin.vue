<template>
  <div>
    <ul>
      <li>
        <div>
          <input
            type="tel"
            placeholder="请输入手机号"
            maxlength="11"
            v-model="phone"
            @input="monitorInput('phone')"
            @focus="handleClearIconWhenFocus"
            @blur="handleClearIconWhenBlur"
          />
        </div>
        <div class="clear-icon" v-show="isClear" @mousedown="clearPhone">
          <img :src="require('../../assets/imgs/clear-icon.png')" />
        </div>
      </li>
      <li>
        <div>
          <input
            type="tel"
            placeholder="请输入验证码"
            maxlength="6"
            v-model="sms"
            @input="monitorInput('sms')"
          />
        </div>
        <div
          :class="[
            isSendSms && !isCountDown ? 'undisable-click' : 'disable-click'
          ]"
          @click="sendSms"
        >
          {{ smsBtnName }}
        </div>
      </li>
    </ul>
    <KuButton btnName="登录" :isClick="isClick" @btnFun="login"></KuButton>
    <keep-alive :include="[]">
      <component v-bind:is="currentTabComponent" :key="randomNum"></component>
    </keep-alive>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { sendSmsCodeForLogin, loginWithSmsCode } from "../../services/user";
import { isNumer, isPhone } from "../../utils/tool";
import KuButton from "../../components/kuui/button";
import { throttle } from "../../utils/performance";
import AccountState from "./accountstate";
export default {
  data() {
    return {
      phone: "",
      sms: "",
      isClear: false,
      isClick: false,
      isSendSms: false,
      isCountDown: false,
      smsBtnName: "获取验证码",
      errorTips: [
        {
          from: "phone",
          tip: "请输入正确的手机号"
        },
        {
          from: "sms",
          tip: "请输入正确的验证码"
        }
      ],
      currentTabComponent: "",
      randomNum: 0
    };
  },
  components: {
    KuButton,
    AccountState
  },
  created() {
    this.imgCodeLoad();
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false;
    next();
  },
  mounted() {},
  methods: {
    ...mapActions("user", ["setStateDatas"]),
    imgCode() {
      /* eslint-disable */
      var captcha = new TencentCaptcha("2043630278", res => {
        if (0 === res.ret) {
          this.sendMessage(res);
        } else {
          this.$toast.text("图像验证码错误，请重试");
        }
      });
      captcha.show();
      /* eslint-disable */
    },
    sendMessage(res) {
      let params = {};
      params["ticket"] = res.ticket;
      params["randstr"] = res.randstr;
      params["mobileNum"] = this.phone;
      sendSmsCodeForLogin(params).then(res => {
        if ("0" === res.code) {
          this.countDown();
        }
      });
    },
    imgCodeLoad() {
      let fm = document.createElement("script");
      fm.type = "text/javascript";
      fm.async = true;
      fm.src = "https://ssl.captcha.qq.com/TCaptcha.js";
      let s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(fm, s);
    },
    monitorInput(type) {
      if ("phone" === type) {
        this.clearIconShow();
        this.buttonStatus();
        this.isSendSms = this.phone ? true : false;
      } else {
        this.buttonStatus();
      }
    },
    handleClearIconWhenFocus() {
      this.isClear = this.phone ? true : false;
    },
    handleClearIconWhenBlur() {
      this.isClear = false;
    },
    clearIconShow() {
      this.isClear = this.phone ? true : false;
    },
    clearPhone() {
      this.phone = "";
      this.isSendSms = false;
      this.clearIconShow();
      this.buttonStatus();
    },
    buttonStatus() {
      this.isClick = this.phone && this.sms ? true : false;
    },
    getErrorTip(from) {
      const error = this.errorTips.filter(cur => {
        return cur.from === from;
      });
      return error && error[0].tip;
    },
    errorToast(from) {
      const tip = this.getErrorTip(from);
      this.$toast.text(tip);
    },
    sendSms: throttle(function() {
      if (!isPhone(this.phone)) {
        this.errorToast("phone");
        return false;
      }
      this.imgCode();
    }, 1000),
    countDown() {
      let seconds = 60;
      let timer = setInterval(() => {
        if (seconds) {
          this.smsBtnName = seconds-- + "s重新获取";
          this.isCountDown = true;
        } else {
          clearInterval(timer);
          this.smsBtnName = "获取验证码";
          this.isCountDown = false;
        }
      }, 1000);
    },
    login() {
      if (!isPhone(this.phone)) {
        this.errorToast("phone");
        return false;
      }
      if (!isNumer(this.sms, 6)) {
        this.errorToast("sms");
        return false;
      }
      let params = {};
      params["mobileNum"] = this.phone;
      params["code"] = this.sms;
      loginWithSmsCode(params).then(res => {
        if ("0" === res.code) {
          this.setStateDatas({
            token: res.data
          });
          this.randomNum ++;
          this.currentTabComponent = 'AccountState';
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
$font-name: PingFangSC-Medium;
ul > li {
  width: 622px;
  border-bottom: 2px solid #dfe1e4;
  height: 134px;
  display: -webkit-flex;
  display: flex;
  align-items: flex-end;
  input {
    width: 500px;
    height: 42px;
    font-family: DINAlternate-Bold;
    font-size: 34px;
    color: #303236;
    letter-spacing: 0;
  }
  ::placeholder {
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #c8cbd1;
    letter-spacing: 0;
  }
}
ul li > div {
  margin-bottom: 5px;
  overflow: hidden;
}
ul li:first-child {
  div:first-child {
    width: 595px;
    overflow: hidden;
  }
  div:last-child {
    img {
      width: 26px;
      height: 26px;
    }
  }
}
ul li:last-child {
  div:first-child {
    width: 462px;
  }
  div:last-child {
    width: 166px;
    height: 54px;
    border-radius: 6px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    line-height: 54px;
    margin-bottom: 4px;
  }
}
.disable-click {
  background: #bccffb;
  pointer-events: none;
  disabled: disabled;
}
.undisable-click {
  background: #5888f5;
}
</style>
