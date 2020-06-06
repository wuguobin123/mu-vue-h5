<template>
  <div class="outer-layout">
    <section class="state-warn" v-if="stateObj !== null">
      <div>
        <img :src="require('../../assets/imgs/' + stateObj.imgName)" />
      </div>
      <div>{{ stateObj.warnText }}</div>
    </section>
    <ul>
      <li
        v-for="item in formDatas"
        :key="item.index"
        @click="toDetail(item.url)"
      >
        <div :style="{ backgroundImage: 'url(' + item.logo + ')' }">
          {{ item.titleName }}
        </div>
        <div :class="[item.statusVal === 0 ? 'no-finish' : 'finish']">
          {{ item.statusName }}
        </div>
      </li>
    </ul>
    <kuButton
      v-if="submitBtnShow"
      @btnFun="saveInfo"
      :btnName="btnText"
      :isClick="isClickForBtn"
      :isFixed="true"
    ></kuButton>
  </div>
</template>

<script>
import KuButton from "../../components/kuui/button";
import { getUserAuditInfo, userAuditSubmit } from "../../services/certificate";
export default {
  data() {
    return {
      formDatas: [
        {
          index: 0,
          logo: require("../../assets/imgs/company-icon.png"),
          keyName: "enterpriseInfoComplete",
          statusName: "",
          titleName: "企业信息",
          statusVal: 1,
          url: "/certificate/company"
        },
        {
          index: 1,
          logo: require("../../assets/imgs/operator-icon.png"),
          keyName: "legalInfoComplete",
          titleName: "法人信息",
          statusName: "",
          statusVal: 1,
          url: "/certificate/legal"
        },
        {
          index: 2,
          logo: require("../../assets/imgs/operator-icon.png"),
          keyName: "operatorInfoComplete",
          titleName: "操作人信息",
          statusName: "",
          statusVal: 1,
          url: "/certificate/operator"
        }
      ],
      submitBtnShow: false,
      isClickFlag: false,
      //1:待提交，2：审核中，3：审核通过，4：审核未通过
      stateWarns: [
        {
          index: 0,
          imgName: "pass-icon.png",
          stateVal: 3,
          warnText: "身份认证审核通过"
        },
        {
          index: 1,
          imgName: "ing-icon.png",
          stateVal: 2,
          warnText: "身份认证审核中"
        },
        {
          index: 2,
          imgName: "fail-icon.png",
          stateVal: 4,
          warnText: "身份认证审核未通过"
        }
      ],
      stateObj: null,
      btnText: "提交"
    };
  },
  components: {
    KuButton
  },
  computed: {
    isClickForBtn() {
      return this.formDatas.every(item => {
        return item.statusVal === 1;
      });
    }
  },
  created() {
    this.initState();
  },
  methods: {
    initState() {
      getUserAuditInfo().then(res => {
        let { code, data } = res;
        console.log(res);
        if ("0" === code) {
          this.layoutShowFlag = true;
          let { userOperatorType, userAuditState } = data;
          if (userOperatorType === 1) {
            this.formDatas.pop();
          }
          if (userAuditState === 1 || userAuditState === 4) {
            this.submitBtnShow = true;
            this.btnText = userAuditState === 4 ? "重新认证" : "提交";
            this.formDatas.forEach(item => {
              if (userAuditState === 4) {
                item.statusVal = 0;
                item.statusName = "修改";
              } else {
                Object.keys(data).forEach(key => {
                  if (item.keyName === key) {
                    item.statusVal = data[key] ? 1 : 0;
                    item.statusName = data[key] ? "已完成" : "待补充";
                  }
                });
              }
            });
          } else {
            this.submitBtnShow = false;
            this.formDatas.forEach(item => {
              item.statusVal = 0;
              item.statusName = "查看";
            });
          }
          this.getStateWarn(userAuditState);
        }
      });
    },
    getStateWarn(userState) {
      let warns = this.stateWarns.filter(item => {
        return item.stateVal === userState;
      });
      this.stateObj = warns.length > 0 ? warns[0] : null;
    },
    saveInfo() {
      userAuditSubmit().then(res => {
        let { code } = res;
        if ("0" === code) {
          this.$router.push({
            path: "/certificate/verify"
          });
        }
      });
    },
    toDetail(url) {
      this.$router.push({
        path: url
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$font-name: PingFangSC-Medium;
.state-warn {
  width: 750px;
  height: 166px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  div {
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #303236;
    letter-spacing: 0;
    text-align: center;
    line-height: 72px;
    margin-right: 20px;
    img {
      width: 49px;
      height: 49px;
    }
  }
  img {
    margin-top: 20px;
  }
}
.outer-layout {
  padding: 39px 30px 0px 30px;
  ul > li {
    width: 690px;
    height: 106px;
    border-bottom: 2px solid #eff1f5;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-between;
    div:first-child {
      font-family: PingFangSC-Medium;
      font-size: 30px;
      color: #5b5e66;
      letter-spacing: 0;
      background-repeat: no-repeat;
      background-position: left;
      background-size: 44px 44px;
      padding-left: 60px;
    }
    div:last-child {
      background: url(../../assets/imgs/go-icon.png) no-repeat;
      background-position: right;
      background-size: 44px 44px;
      padding-right: 40px;
    }
  }
  p {
    font-family: PingFangSC-Regular;
    font-size: 22px;
    color: #898d99;
    letter-spacing: 0;
    margin-top: 28px;
  }
  .user-pro {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #666666;
    margin: 107px 0px 27px 0px;
    i {
      color: #fff;
      display: inline-block;
      background: url(../../assets/imgs/selected-icon.png) no-repeat;
      background-size: 24px 28px;
      background-position: left;
      padding-left: 40px;
    }
    span {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #5888f5;
      line-height: 33px;
    }
  }
}
.no-finish {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #c8cbd1;
  letter-spacing: 0;
  text-align: right;
}
.finish {
  font-family: PingFangSC-Medium;
  font-size: 24px;
  color: #e63e3e;
  letter-spacing: 0;
  text-align: right;
}
</style>
