<template>
  <div class="login-layout">
    <span></span>
    <h3 class="company-name">钧链-供应链金融平台</h3>
    <h2>登录</h2>
    <component :is="currentView"></component>
    <p>
      <i @click="changeLoginWay">
        {{ loginWay === "phone" ? "密码登录" : "短信验证码登录" }}
        <nut-icon type="right" color="#5888F5" size="12px"> </nut-icon>
      </i>
    </p>
  </div>
</template>

<script>
import SmsLogin from "./smslogin.vue";
import PasswordLogin from "./passwordlogin.vue";
export default {
  data() {
    return {
      loginWay: "phone",
      currentView: "SmsLogin",
      smsLogin: "SmsLogin",
      passwordLogin: "PasswordLogin"
    };
  },
  components: {
    SmsLogin,
    PasswordLogin
  },
  methods: {
    changeLoginWay() {
      const currentWay = this.loginWay;
      if (currentWay && currentWay === "sms") {
        this.currentView = this.smsLogin;
        this.loginWay = "phone";
      } else {
        this.currentView = this.passwordLogin;
        this.loginWay = "sms";
      }
    }
  }
};
</script>

<style scoped lang="scss">
$font-name: PingFangSC-Medium;
.login-layout {
  padding: 20px 64px 0px;
  span {
    display: inline-block;
    width: 70px;
    height: 70px;
    background: #fff;
    margin: 18px 0px;
  }
  h3 {
    font-family: $font-name;
    font-size: 36px;
    color: #303236;
    letter-spacing: 0;
  }
  h2 {
    margin-top: 88px;
    font-family: $font-name;
    font-size: 54px;
    color: #303236;
    letter-spacing: 0;
  }

  p {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #5888f5;
    letter-spacing: 0;
    text-align: center;
  }
}
</style>
