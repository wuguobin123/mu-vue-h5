<template>
  <div class="outer-layout">
    <h2 class="title">企业基本户信息</h2>
    <ul>
      <li v-for="item in formDatas" :key="item.index">
        <KuInput
          v-if="item.index < 3"
          :title="item.title"
          :typeVal="item.typeVal"
          :placeholderName="item.placeholderName"
          :maxLength="item.maxLength"
          :isReadonly="item.isReadonly"
          v-model="item.modelVal"
          @inputFun="monitorBtnStatus"
          @focusFun="handleClearIconWhenFocus"
          @blurFun="handleClearIconWhenBlur"
          @clearFun="clearInput"
          :keyName="item.keyName"
          :clearFlag="item.clearShowFlag"
        ></KuInput>
        <KuBank
          v-model="item.modelVal"
          :title="item.title"
          @on-change="handleChange"
          :placeholderName="item.placeholderName"
          :keyName="item.keyName"
          v-if="item.index == 3"
          :banks="banks"
        ></KuBank>
        <KuBranch
          v-model="item.modelVal"
          :title="item.title"
          @on-change="handleChange"
          :placeholderName="item.placeholderName"
          :keyName="item.keyName"
          v-if="item.index == 4"
        ></KuBranch>
      </li>
    </ul>
    <kuButton
      @btnFun="handleSubmit"
      btnName="下一步"
      :isClick="isClickForBtn"
      :isFixed="true"
    ></kuButton>
  </div>
</template>

<script>
import defaultBank from "../../assets/data/defaultBanks";
// eslint-disable-next-line no-unused-vars
import { validateForm, validateFormIsNull } from "../../utils/tool";
import KuInput from "../../components/kuui/input";
import KuButton from "../../components/kuui/button";
import KuBank from "../../components/kuui/selectBank";
import KuBranch from "../../components/kuui/selectBranch";
export default {
  data() {
    return {
      formDatas: [
        {
          index: 0,
          title: "企业名称",
          placeholderName: "请输入企业名称",
          modelVal: "",
          keyName: "enterpriseName",
          clearShowFlag: false,
          reg: /^.{2,20}$/,
          errorTip: "请输入合法的企业名称",
          isReadonly: false
        },
        {
          index: 2,
          title: "基本户账户",
          placeholderName: "请填写基本户账户",
          modelVal: "",
          keyName: "businessAddress",
          isInputArea: true,
          clearShowFlag: false,
          isReadonly: false
        },
        {
          index: 3,
          title: "开户行",
          placeholderName: "请填写开户行",
          modelVal: "",
          keyName: "bankName"
        },
        {
          index: 4,
          title: "开户网点",
          placeholderName: "请填写开户网点",
          modelVal: "",
          keyName: "branchName"
        }
      ],
      isClickForBtn: false,
      bankName: "北京银行",
      banks: defaultBank.banks
    };
  },
  components: {
    KuInput,
    KuButton,
    KuBank,
    KuBranch
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
    handleChange() {
      this.handleBtnStatus();
    },
    handleSubmit() {
      let error = validateForm(this.formDatas);
      if (error) {
        this.$toast.text(error);
        return;
      }
      let formDatasCopy = this.formDatas;
      let params = {};
      formDatasCopy.forEach(item => {
        if (item.keyName) {
          params[item.keyName] = item.modelVal;
        }
      });
      //todo 提交企业基本户信息
      this.$router.push({
        path: "/loan/amount"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$font-name: PingFangSC-Medium;
.outer-layout {
  padding: 98px 64px 28px;
  .title {
    margin-bottom: 58px;
    font-size: 54px;
    color: #303236;
    letter-spacing: 0;
    font-family: $font-name;
  }
}
/deep/.bottom-box {
  z-index: 99 !important;
}
</style>
