<template>
  <div class="register-layout">
    <h2>注册</h2>
    <ul>
      <li v-for="item in formDatas" :key="item.index">
        <KuInput
          v-if="!item.isSendMsgBtn"
          :title="item.title"
          :typeVal="item.typeVal"
          :placeholderName="item.placeholderName"
          :maxLength="item.maxLength"
          v-model="item.modelVal"
          @inputFun="monitorBtnStatus"
          @focusFun="handleClearIconWhenFocus"
          @blurFun="handleClearIconWhenBlur"
          @clearFun="clearInput"
          :keyName="item.keyName"
          :clearFlag="item.clearShowFlag"
        ></KuInput>
        <KuInputSms
          v-else
          :title="item.title"
          :typeVal="item.typeVal"
          :placeholderName="item.placeholderName"
          :maxLength="item.maxLength"
          v-model="item.modelVal"
          @inputFun="monitorBtnStatus"
          :btnName="btnName"
          @sendSms="sendSms"
          :keyName="item.keyName"
          :isClick="isClickForSmsBtn"
          :isCountDown="isCountDown"
        ></KuInputSms>
      </li>
    </ul>

    <kuButton
      @btnFun="register"
      btnName="下一步"
      :isClick="isClickForRegisterBtn"
      :isFixed="true"
      @slotFun="readPro"
      @slotFunSecond="tickPro"
      v-if="!isShowPro"
    >
      <template slot-scope="{ slotFun, slotFunSecond }">
        <p class="user-pro">
          <i
            @click="slotFunSecond()"
            :class="[isSelected ? 'selected-pro' : 'no-select-pro']"
            >1</i
          >
          <em>我已阅读并同意</em>
          <span @click="slotFun()">《用户服务协议》</span>
        </p>
      </template>
    </kuButton>

    <KuActionsheet title="用户服务协议" :isShow="isShowPro">
      <ProtocolContent></ProtocolContent>
      <template v-slot:button>
        <kuButton
          @btnFun="agreeProtocol"
          btnName="已阅读并同意"
          :isClick="true"
          :isFixed="true"
        ></kuButton>
      </template>
    </KuActionsheet>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { validateForm, validateFormIsNull } from "../../utils/tool";
import {
  sendSmsCodeForReg,
  validateSmsCodeForReg,
  coreEnterpriseNoCheck
} from "../../services/user";
import KuInput from "../../components/kuui/input";
import KuInputSms from "../../components/kuui/inputsms";
import KuButton from "../../components/kuui/button";
import { throttle } from "../../utils/performance";
import ProtocolContent from "./protocol";
import KuActionsheet from "../../components/kuui/actionsheet";
export default {
  components: {
    KuInput,
    KuInputSms,
    KuButton,
    KuActionsheet,
    ProtocolContent
  },
  data() {
    return {
      formDatas: [
        {
          index: 0,
          title: "创建用户名",
          placeholderName: "用户名（4到20位字母和数字组合）",
          modelVal: "",
          keyName: "userName",
          reg: /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{4,20}$/,
          errorTip: "请输入合法的用户名",
          typeVal: "text",
          clearShowFlag: false
        },
        {
          index: 1,
          title: "企业名称",
          placeholderName: "企业名称（4到30位字符）",
          modelVal: "",
          keyName: "enterpriseName",
          reg: /^.{4,30}$/,
          errorTip: "请输入合法的企业名称",
          typeVal: "text",
          clearShowFlag: false
        },
        {
          index: 2,
          title: "企业邮箱",
          placeholderName: "请输入企业邮箱",
          modelVal: "",
          keyName: "enterpriseEmail",
          reg: /^[\w]+@[\w]+\.[a-z]{2,4}$/,
          errorTip: "请输入合法的邮箱地址",
          typeVal: "text",
          clearShowFlag: false
        },
        {
          index: 3,
          title: "手机号",
          placeholderName: "请输入手机号",
          modelVal: "",
          keyName: "mobileNum",
          reg: /^1[3456789]\d{9}$/,
          errorTip: "请输入合法的手机号",
          typeVal: "tel",
          maxLength: "11",
          clearShowFlag: false
        },
        {
          index: 4,
          title: "验证码",
          placeholderName: "请输入验证码",
          modelVal: "",
          keyName: "code",
          isSendMsgBtn: true,
          reg: /^\d{6}$/,
          errorTip: "请输入合法的验证码",
          typeVal: "tel",
          maxLength: "6"
        }
      ],
      isClickForSmsBtn: false,
      isClickForRegisterBtn: false,
      btnName: "获取验证码",
      isCountDown: false,
      coreEnterpriseCode: this.$route.query.code,
      isShowPro: false,
      isSelected: false
    };
  },
  created() {
    this.imgCodeLoad();
    this.coreEnterpriseCode ? this.coreEnterpriseNoCheck() : "";
  },
  methods: {
    ...mapActions("user", ["setStateDatas"]),
    sendSms: throttle(function() {
      let formDataCopy = this.formDatas.concat();
      formDataCopy.pop();
      let error = validateForm(formDataCopy);
      if (error) {
        this.$toast.text(error);
        return false;
      }
      //调用图形验证码
      this.imgCode();
    }, 1000),
    btnCountDown() {
      let seconds = 60;
      let timerId = setInterval(() => {
        if (seconds) {
          this.isClickForSmsBtn = false;
          this.isCountDown = true;
          this.btnName = seconds-- + "s重新获取";
        } else {
          clearInterval(timerId);
          this.isClickForSmsBtn = true;
          this.isCountDown = false;
          this.btnName = "获取验证码";
        }
      }, 1000);
    },
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
      let fromDataCopy = this.formDatas.concat();
      fromDataCopy.pop();
      let params = {};
      params["randstr"] = res.randstr;
      params["ticket"] = res.ticket;
      params["coreEnterpriseNo"] = this.coreEnterpriseCode;
      fromDataCopy.forEach(function(item) {
        params[item.keyName] = item["modelVal"];
      });
      sendSmsCodeForReg(params).then(res => {
        if ("0" === res.code) {
          this.btnCountDown();
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
    coreEnterpriseNoCheck() {
      coreEnterpriseNoCheck({ coreEnterpriseNo: this.coreEnterpriseCode }).then(
        res => {
          let { code, data } = res;
          if ("0" === code && !data) {
            this.$toast.text("商户号不正确");
          }
        }
      );
    },
    readPro() {
      this.isShowPro = true;
    },
    tickPro() {
      this.isSelected = !this.isSelected;
    },
    agreeProtocol() {
      this.isShowPro = false;
      this.isSelected = true;
    },
    register() {
      let error = validateForm(this.formDatas);
      if (error) {
        this.$toast.text(error);
        return false;
      }
      if (!this.isSelected) {
        this.$toast.text("请勾选用户服务协议");
        return;
      }
      let formDatasCopy = this.formDatas;
      let lastItems = formDatasCopy.slice(formDatasCopy.length - 2);
      let params = {};
      lastItems.forEach(function(item) {
        params[item.keyName] = item["modelVal"];
      });
      validateSmsCodeForReg(params).then(res => {
        if ("0" === res.code) {
          this.setStateDatas({ phone: params.mobileNum });
          this.$router.push({
            path: "/user/setpassword",
            query: {
              from: "register"
            }
          });
        }
      });
    },
    monitorBtnStatus(keyName) {
      let item = this.getForm(keyName);
      this.resetForms();
      if (item.modelVal) {
        item.clearShowFlag = true;
      }
      this.handleBtnStatus();
    },
    handleBtnStatus() {
      let formDataCopy = this.formDatas.concat();
      let resultForRegisterBtn = validateFormIsNull(formDataCopy);
      this.isClickForRegisterBtn = resultForRegisterBtn ? true : false;
      formDataCopy.pop();
      let resultForSmsBtn = validateFormIsNull(formDataCopy);
      this.isClickForSmsBtn = resultForSmsBtn ? true : false;
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
      this.handleBtnStatus();
    }
  }
};
</script>

<style lang="scss" scoped>
$font-name: PingFangSC-Medium;
.register-layout {
  padding: 50px 64px 0px 64px;
  h2 {
    font-family: PingFangSC-Medium;
    font-size: 54px;
    color: #303236;
    letter-spacing: 0;
    margin-bottom: 58px;
  }
  ul li {
    width: 622px;
    height: 108px;
    border-bottom: 2px solid #dfe1e4;
    margin-bottom: 28px;
  }
  .user-pro {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #666666;
    margin: 107px 0px 27px 0px;
    i {
      color: #fff;
      display: inline-block;
      background-position: left;
      padding-left: 38px;
      padding-top: 2px;
    }
    .selected-pro {
      background: url(../../assets/imgs/selected-icon.png) no-repeat;
      background-size: 24px 28px;
    }
    .no-select-pro {
      background: url(../../assets/imgs/select-icon.png) no-repeat;
      background-size: 24px 28px;
    }
    span {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #5888f5;
      line-height: 33px;
    }
  }
}
</style>
