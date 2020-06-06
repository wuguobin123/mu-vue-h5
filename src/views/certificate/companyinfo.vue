<template>
  <div class="outer-layout">
    <h2>企业信息</h2>
    <ul>
      <li v-for="item in formDatas" :key="item.index">
        <KuInputSheet
          v-if="item.isInputSheet"
          :menuItems="item.menuItems"
          :title="item.title"
          :typeVal="item.typeVal"
          :placeholderName="item.placeholderName"
          :keyName="item.keyName"
          :isReadonly="item.isReadonly"
          v-model="item.modelVal"
          @menuFun="sheetSelect"
        ></KuInputSheet>
        <KuInputArea
          v-else-if="item.isInputArea"
          :title="item.title"
          :typeVal="item.typeVal"
          :placeholderName="item.placeholderName"
          :keyName="item.keyName"
          :isReadonly="item.isReadonly"
          v-model="item.modelVal"
          @menuFun="areaSelect"
        ></KuInputArea>
        <KuInput
          v-else
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
      </li>
    </ul>
    <kuButton
      v-if="btnShowFlag"
      @btnFun="saveCompanyInfo"
      btnName="保存"
      :isClick="isClickForBtn"
      :isFixed="true"
    ></kuButton>
  </div>
</template>

<script>
import { validateForm, validateFormIsNull } from "../../utils/tool";
import {
  saveUserEnterprise,
  getUserEnterprise,
  getUserAuditInfo
} from "../../services/certificate";
import KuInput from "../../components/kuui/input";
import KuInputArea from "../../components/kuui/inputarea";
import KuInputSheet from "../../components/kuui/inputsheet";
import KuButton from "../../components/kuui/button";
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
          index: 1,
          title: "企业类型",
          placeholderName: "请选择企业类型",
          modelVal: "",
          keyName: "enterpriseType",
          isInputSheet: true,
          isReadonly: true,
          typeVal: "text",
          clearShowFlag: false,
          menuItems: [
            {
              name: "企业/公司",
              value: 1
            },
            {
              name: "个体工商户",
              value: 2
            }
          ]
        },
        {
          index: 2,
          title: "企业规模",
          placeholderName: "请选择企业规模",
          modelVal: "",
          keyName: "enterpriseScale",
          isInputSheet: true,
          typeVal: "text",
          isReadonly: true,
          clearShowFlag: false,
          menuItems: [
            {
              name: "50人以内",
              value: 1
            },
            {
              name: "50~500人",
              value: 2
            },
            {
              name: "500~1000人",
              value: 3
            },
            {
              name: "1000人以上",
              value: 4
            }
          ]
        },
        {
          index: 3,
          title: "营业地址",
          placeholderName: "请选择营业地址",
          modelVal: "",
          keyName: "businessAddress",
          isInputArea: true,
          clearShowFlag: false,
          isReadonly: false
        },
        {
          index: 4,
          title: "详细营业地址",
          placeholderName: "请填写详细营业地址",
          modelVal: "",
          keyName: "businessAddressDetail",
          clearShowFlag: false,
          reg: /^.{1,50}/,
          errorTip: "请输入合法的地址",
          isReadonly: false
        },
        {
          index: 5,
          title: "常用地址",
          placeholderName: "请选择常用地址",
          modelVal: "",
          keyName: "commonAddress",
          isInputArea: true,
          clearShowFlag: false,
          isReadonly: false
        },
        {
          index: 6,
          title: "详细常用地址",
          placeholderName: "请填写详细常用地址",
          modelVal: "",
          keyName: "commonAddressDetail",
          clearShowFlag: false,
          reg: /^.{1,50}/,
          errorTip: "请输入合法的地址",
          isReadonly: false
        },
        {
          index: 7,
          title: "统一社会信用代码",
          placeholderName: "请输入统一社会信用代码",
          modelVal: "",
          keyName: "unifiedCode",
          clearShowFlag: false,
          reg: /^(?=.*[0-9])[0-9A-Z]{18}$/,
          errorTip: "请输入合法的统一社会信用代码",
          isReadonly: false
        },
        {
          index: 8,
          title: "经营品牌",
          placeholderName: "请选择经营品牌",
          modelVal: "",
          keyName: "brand",
          clearShowFlag: false,
          reg: /^.{1,30}$/,
          errorTip: "请输入合法的经营品牌",
          isReadonly: false
        },
        {
          index: 9,
          title: "经营品类",
          placeholderName: "请输入经营品类",
          modelVal: "",
          keyName: "category",
          clearShowFlag: false,
          reg: /^.{1,30}/,
          errorTip: "请输入合法的经营品类",
          isReadonly: false
        }
      ],
      isClickForBtn: false,
      btnShowFlag: false
    };
  },
  components: {
    KuInput,
    KuInputArea,
    KuInputSheet,
    KuButton
  },
  created() {
    this.initEnterpriseInfo();
  },
  methods: {
    initEnterpriseInfo() {
      getUserEnterprise().then(res => {
        let { code } = res;
        if ("0" === code) {
          let result = res.data;
          this.handleRes(result);
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
              item.isReadonly = true;
            });
          } else {
            this.btnShowFlag = true;
          }
        }
      });
    },
    handleRes(result) {
      let businesAddress = result.businesAddress;
      let contactAddress = result.contactAddress;
      if (businesAddress && contactAddress) {
        let businessAddrArr = businesAddress.split("-");
        let businessAddressDetail = businessAddrArr.pop();
        let businessAddress = businessAddrArr.join("-");

        let contractAddrArr = contactAddress.split("-");
        let commonAddressDetail = contractAddrArr.pop();
        let commonAddress = contractAddrArr.join("-");

        result.businessAddress = businessAddress;
        result.businessAddressDetail = businessAddressDetail;

        result.commonAddress = commonAddress;
        result.commonAddressDetail = commonAddressDetail;
      }
      this.formDatas.forEach(item => {
        if (item.keyName === "enterpriseType") {
          let name = this.getMapName(result.type, item.menuItems);
          item.modelVal = name;
        } else if (item.keyName === "enterpriseScale") {
          let name = this.getMapName(result.scale, item.menuItems);
          item.modelVal = name;
        } else {
          for (let key in result) {
            if (item.keyName === key) {
              item.modelVal = result[key];
            }
          }
        }
      });
      this.handleBtnStatus();
    },
    getMapName(key, items) {
      let results = items.filter(item => {
        return item.value === key;
      });
      return results.length > 0 ? results[0]["name"] : "";
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
    saveCompanyInfo() {
      let error = validateForm(this.formDatas);
      if (error) {
        this.$toast.text(error);
        return;
      }
      saveUserEnterprise(this.handleParams()).then(res => {
        let { code } = res;
        if ("0" === code) {
          this.$router.push({
            path: "/certificate/infolist"
          });
        }
      });
    },
    handleParams() {
      let formDatas = this.formDatas.concat();
      let param = {};
      formDatas.forEach(item => {
        if (item.keyName === "enterpriseType") {
          param.type = this.handleValue(item.modelVal, item.menuItems);
        } else if (item.keyName === "enterpriseScale") {
          param.scale = this.handleValue(item.modelVal, item.menuItems);
        } else {
          param[item.keyName] = item.modelVal;
        }
      });
      let businessAddrKeys = Object.keys(param).filter(item => {
        return item.indexOf("businessAddress") > -1;
      });
      let commonAddrKeys = Object.keys(param).filter(item => {
        return item.indexOf("commonAddress") > -1;
      });
      let businessAddr = "";
      let contactAddr = "";
      formDatas.forEach(item => {
        businessAddrKeys.forEach(key => {
          if (item.keyName === key) {
            businessAddr = !businessAddr
              ? item.modelVal
              : (businessAddr += "-" + item.modelVal);
          }
        });
        commonAddrKeys.forEach(key => {
          if (item.keyName === key) {
            contactAddr = !contactAddr
              ? item.modelVal
              : (contactAddr += "-" + item.modelVal);
          }
        });
      });
      for (let key in param) {
        if (
          key.indexOf("businessAddress") > -1 ||
          key.indexOf("commonAddress") > -1
        ) {
          delete param[key];
        }
      }
      param.businesAddress = businessAddr;
      param.contactAddress = contactAddr;
      return param;
    },
    handleValue(name, items) {
      let itemArr = items.filter(item => {
        return item.name === name;
      });
      return itemArr.length > 0 && itemArr[0].value;
    },
    sheetSelect() {
      this.handleBtnStatus();
    },
    areaSelect() {
      this.handleBtnStatus();
    }
  }
};
</script>

<style lang="scss" scoped>
$font-name: PingFangSC-Medium;
.outer-layout {
  padding: 119px 64px 200px 64px;
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
