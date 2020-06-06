<template>
  <div class="outer-layout">
    <h2>企业基本户信息</h2>
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
        <KuBranch
          v-else-if="item.isBranch"
          v-model="item.modelVal"
          :title="item.title"
          @on-change="handleChange"
          :placeholderName="item.placeholderName"
          :keyName="item.keyName"
        ></KuBranch>
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
      @btnFun="creditApply"
      btnName="提交授信申请"
      :isClick="isClickForBtn"
    ></kuButton>
  </div>
</template>

<script>
import defaultBanks from "../../assets/data/defaultBanks";
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
          placeholderName: "请输入企业名称（2到20位字符）",
          modelVal: "",
          keyName: "operatorRealName",
          clearShowFlag: false,
          reg: /^.{2,20}$/,
          errorTip: "请输入合法的企业名称",
          typeVal: "text",
          isReadOnly: false
        },
        {
          index: 1,
          title: "基本户账户",
          placeholderName: "请输入基本户账户",
          modelVal: "",
          keyName: "operatorMobileNum",
          clearShowFlag: false,
          reg: /^\d{16,21}$/,
          errorTip: "请输入合法的基本户账户",
          maxLength: "21",
          typeVal: "tel",
          isReadOnly: false
        },
        {
          index: 2,
          title: "开户行",
          placeholderName: "请选择开户行",
          modelVal: "",
          keyName: "bank",
          errorTip: "请选择开户行",
          clearShowFlag: false,
          isReadOnly: false,
          typeVal: "text",
          isBank: true
        },
        {
          index: 3,
          title: "开户网点",
          placeholderName: "请选择开户网点",
          modelVal: "",
          keyName: "branch",
          clearShowFlag: false,
          reg: /^.{2,50}$/,
          errorTip: "请选择开户网点",
          typeVal: "text",
          isReadOnly: false,
          isBranch: true
        }
      ],
      isClickForBtn: false,
      btnShowFlag: true,
      banks: defaultBanks.banks
    };
  },
  components: {
    KuInput,
    KuButton,
    KuBank,
    KuBranch
  },
  created() {},
  mounted() {},
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
    creditApply() {
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
      //todo 授信申请
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
