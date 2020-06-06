<template>
  <div class="outer-layout">
    <h2>法人信息</h2>
    <ul>
      <li v-for="item in formDatas" :key="item.index">
        <KuBank
          v-if="item.isBank"
          v-model="item.modelVal"
          :title="item.title"
          @on-change="handleChange"
          :placeholderName="item.placeholderName"
          :keyName="item.keyName"
          :isMargin="true"
          :banks="banks"
        ></KuBank>
        <KuInputSms
          v-else-if="item.isSendMsgBtn"
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
        <KuInput
          v-else
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
          :isReadonly="item.isReadOnly"
        ></KuInput>
      </li>
    </ul>
    <kuButton
      v-if="btnShowFlag"
      @btnFun="saveBankInfo"
      btnName="下一步"
      :isClick="isClickForBtn"
    ></kuButton>
  </div>
</template>

<script>
import defaultBanks from "../../assets/data/defaultBanks";
import { validateForm, validateFormIsNull } from "../../utils/tool";
import KuInput from "../../components/kuui/input";
import KuInputSms from "../../components/kuui/inputsms";
import KuButton from "../../components/kuui/button";
import KuBank from "../../components/kuui/selectBank";
import { throttle } from "../../utils/performance";
export default {
  data() {
    return {
      formDatas: [
        {
          index: 0,
          title: "法人姓名",
          placeholderName: "请输入法人姓名（2到20位字符）",
          modelVal: "",
          keyName: "legalName",
          clearShowFlag: false,
          reg: /^.{2,20}$/,
          errorTip: "请输入合法的姓名",
          typeVal: "text",
          isReadOnly: false
        },
        {
          index: 1,
          title: "银行卡号",
          placeholderName: "请输入银行卡号",
          modelVal: "",
          keyName: "bankCardNo",
          clearShowFlag: false,
          reg: /^\d{16,21}$/,
          errorTip: "请输入合法的银行卡号",
          maxLength: "21",
          typeVal: "tel",
          isReadOnly: false
        },
        {
          index: 2,
          title: "所属银行",
          placeholderName: "请输入所属银行",
          modelVal: "",
          keyName: "",
          reg: /^.{2,20}$/,
          clearShowFlag: false,
          isReadOnly: false,
          typeVal: "text",
          isBank: true
        },
        {
          index: 3,
          title: "预留手机号",
          placeholderName: "请输入手机号",
          modelVal: "",
          keyName: "bankMobile",
          clearShowFlag: false,
          reg: /^1[3456789]\d{9}$/,
          errorTip: "请输入合法的手机号",
          maxLength: "11",
          typeVal: "tel",
          isReadOnly: false
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
      isClickForBtn: false,
      btnShowFlag: true,
      isClickForSmsBtn: false,
      isClickForRegisterBtn: false,
      btnName: "获取验证码",
      isCountDown: false,
      banks: defaultBanks.banks
    };
  },
  components: {
    KuInput,
    KuButton,
    KuInputSms,
    KuBank
  },
  created() {},
  methods: {
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
      let resultForBtn = validateFormIsNull(formDataCopy);
      this.isClickForBtn = resultForBtn ? true : false;
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
    },
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
    handleChange() {
      this.handleBtnStatus();
    },
    sendSms: throttle(function() {
      console.log(this.formDatas);
      let formDataCopy = this.formDatas.concat();
      formDataCopy.pop();
      let error = validateForm(formDataCopy);
      if (error) {
        this.$toast.text(error);
        return false;
      }
      setTimeout(() => {
        this.btnCountDown();
      }, 3000);
      //todo 发送短信接口
    }, 1000),
    saveBankInfo() {
      let error = validateForm(this.formDatas);
      if (error) {
        this.$toast.text(error);
        return;
      }
      //todo 保存银行信息接口
    }
  }
};
</script>

<style lang="scss" scoped>
$font-name: PingFangSC-Medium;
.outer-layout {
  padding: 119px 64px 0px 64px;
  h2 {
    font-family: PingFangSC-Medium;
    font-size: 54px;
    color: #303236;
    letter-spacing: 0;
    margin-bottom: 58px;
  }
  p {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #303236;
    letter-spacing: 0;
    margin: 18px 0px 58px 0px;
  }
  ul li {
    width: 622px;
    height: 108px;
    margin-bottom: 28px;
  }
}
</style>
