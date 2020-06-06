<template>
  <div class="outer-layout">
    <h2>法人信息</h2>
    <ul>
      <li v-for="item in formDatas" :key="item.index">
        <KuInput
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
        >
        </KuInput>
      </li>
    </ul>
    <kuButton
      v-if="btnShowFlag"
      @btnFun="saveLegalPerson"
      btnName="保存"
      :isClick="isClickForBtn"
    ></kuButton>
  </div>
</template>

<script>
import { validateForm, validateFormIsNull } from "../../utils/tool";
import {
  saveUserEnterpriseLegal,
  getUserEnterpriseLegal,
  getUserAuditInfo
} from "../../services/certificate";
import KuInput from "../../components/kuui/input";
import KuButton from "../../components/kuui/button";
export default {
  data() {
    return {
      formDatas: [
        {
          index: 0,
          title: "法人姓名",
          placeholderName: "请输入法人姓名",
          modelVal: "",
          keyName: "legalRealName",
          clearShowFlag: false,
          reg: /^.{2,20}$/,
          errorTip: "请输入合法的姓名",
          typeVal: "text",
          isReadOnly: false
        },
        {
          index: 1,
          title: "法人手机号",
          placeholderName: "请输入法人手机号",
          modelVal: "",
          keyName: "legalMobileNum",
          clearShowFlag: false,
          reg: /^1[3456789]\d{9}$/,
          errorTip: "请输入合法的手机号",
          maxLength: "11",
          typeVal: "tel",
          isReadOnly: false
        },
        {
          index: 2,
          title: "法人证件类型",
          placeholderName: "请选择法人证件类型",
          modelVal: "身份证",
          keyName: "",
          clearShowFlag: false,
          isReadOnly: true,
          typeVal: "text"
        },
        {
          index: 3,
          title: "证件号码",
          placeholderName: "请输入证件号码",
          modelVal: "",
          keyName: "legalIdCardNo",
          clearShowFlag: false,
          reg: /^([0-9]{6})(18|19|20)?([0-9]{2})([01][0-9])([0123][0-9])([0-9]{3})([0-9]|X|x)?$/,
          errorTip: "请输入合法的身份证号码",
          typeVal: "text",
          isReadOnly: false
        }
      ],
      isClickForBtn: false,
      btnShowFlag: true
    };
  },
  components: {
    KuInput,
    KuButton
  },
  created() {
    this.initLegalInfo();
  },
  methods: {
    initLegalInfo() {
      getUserEnterpriseLegal().then(res => {
        let { code, data } = res;
        if ("0" === code) {
          this.formDatas.forEach(item => {
            Object.keys(data).forEach(key => {
              if (item.keyName === key) {
                item.modelVal = data[key];
              }
            });
            this.handleBtnStatus();
          });
          this.initState();
        }
      });
    },
    initState() {
      getUserAuditInfo().then(res => {
        let { code, data } = res;
        if ("0" === code) {
          let { userAuditState } = data;
          if (userAuditState === 2 || userAuditState === 3) {
            this.btnShowFlag = false;
            this.formDatas.forEach(item => {
              item.isReadOnly = true;
            });
          } else {
            this.btnShowFlag = true;
          }
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
      let resultForBtn = validateFormIsNull(this.formDatas);
      this.isClickForBtn = resultForBtn ? true : false;
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
    saveLegalPerson() {
      let error = validateForm(this.formDatas);
      if (error) {
        this.$toast.text(error);
        return;
      }
      let formDatasCopy = this.formDatas.concat();
      let params = {};
      formDatasCopy.forEach(item => {
        if (item.keyName) {
          params[item.keyName] = item.modelVal;
        }
      });
      params.legalIdCardType = 1; //身份证（固定值）
      saveUserEnterpriseLegal(params).then(res => {
        let { code } = res;
        if ("0" === code) {
          this.$router.push({
            path: "/certificate/face",
            query: {
              type: 1
            }
          });
        }
      });
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
    border-bottom: 2px solid #dfe1e4;
    margin-bottom: 28px;
  }
}
</style>
