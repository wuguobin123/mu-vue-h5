<template>
  <div>
    <ul>
      <KuInputClear
        v-for="item in formDatas"
        :key="item.index"
        :typeVal="item.typeVal"
        :placeholderName="item.placeholderName"
        v-model="item.modelVal"
        @inputFun="monitorInput"
        @focusFun="handleClearIconWhenFocus"
        @blurFun="handleClearIconWhenBlur"
        @clearFun="clearInput"
        :keyName="item.keyName"
        :clearFlag="item.clearShowFlag"
      ></KuInputClear>
    </ul>
    <kuButton @btnFun="login" btnName="登录" :isClick="isClick"></kuButton>
    <keep-alive>
      <component v-bind:is="currentTabComponent" :key="randomNum"></component>
    </keep-alive>
  </div>
</template>

<script>
import { loginWithPwd } from "../../services/user";
import { mapActions } from "vuex";
import KuInputClear from "../../components/kuui/inputclear";
import KuButton from "../../components/kuui/button";
import { validateFormIsNull, validateForm } from "../../utils/tool";
import AccountState from "./accountstate";
export default {
  data() {
    return {
      isClick: false,
      formDatas: [
        {
          index: 0,
          placeholderName: "请输入账号/手机号",
          modelVal: "",
          keyName: "userName",
          reg: /^[\w]{4,20}$/,
          errorTip: "请输入正确的账号",
          typeVal: "text",
          clearShowFlag: false
        },
        {
          index: 1,
          placeholderName: "请输入密码",
          modelVal: "",
          keyName: "password",
          reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\w]{6,20}$/,
          errorTip: "请输入正确的密码",
          typeVal: "password",
          clearShowFlag: false
        }
      ],
      currentTabComponent: "",
      randomNum: 0
    };
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false;
    next();
  },
  components: {
    KuInputClear,
    AccountState,
    KuButton
  },
  methods: {
    ...mapActions("user", ["setStateDatas"]),
    monitorInput(keyName) {
      let item = this.getForm(keyName);
      this.resetForms();
      if (item.modelVal) {
        item.clearShowFlag = true;
      }
      this.btnStatus();
    },
    btnStatus() {
      let result = validateFormIsNull(this.formDatas);
      this.isClick = result ? true : false;
    },
    getForm(keyName) {
      let formDatas = this.formDatas;
      let items = formDatas.filter(item => {
        return item.keyName === keyName;
      });
      return items && items[0];
    },
    resetForms() {
      let formDatas = this.formDatas;
      formDatas.forEach(item => {
        item.clearShowFlag = false;
      });
    },
    handleClearIconWhenFocus(keyName) {
      let item = this.getForm(keyName);
      this.resetForms();
      if (item.modelVal) {
        item.clearShowFlag = true;
      }
    },
    handleClearIconWhenBlur() {
      this.resetForms();
    },
    clearInput(keyName) {
      let item = this.getForm(keyName);
      this.resetForms();
      if (item.modelVal) {
        item.modelVal = "";
        item.clearShowFlag = false;
      }
      this.btnStatus();
    },
    login() {
      let error = validateForm(this.formDatas);
      if (error) {
        this.$toast.text(error);
        return;
      }
      this.currentTabComponent = "";
      let params = {};
      this.formDatas.forEach(function(item) {
        params[item.keyName] = item["modelVal"];
      });
      loginWithPwd(params).then(res => {
        if ("0" === res.code) {
          this.setStateDatas({
            token: res.data
          });
          this.randomNum++;
          this.currentTabComponent = "AccountState";
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
ul li {
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
</style>
