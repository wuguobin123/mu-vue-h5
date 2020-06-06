<template>
  <div class="outer-layout">
    <section class="company-logo">HI，领军科技公司~</section>
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
  </div>
</template>

<script>
import { getUserAuditInfo } from "../../services/certificate";
import { getAccountStateText } from "../../utils/constant";
export default {
  data() {
    return {
      formDatas: [
        {
          index: 0,
          logo: require("../../assets/imgs/company-icon.png"),
          keyName: "enterpriseInfoComplete",
          statusName: "",
          titleName: "身份认证",
          statusVal: 0,
          url: "/certificate/infolist"
        },
        {
          index: 1,
          logo: require("../../assets/imgs/operator-icon.png"),
          keyName: "legalInfoComplete",
          titleName: "法人信息",
          statusName: "",
          statusVal: 0,
          url: "/certificate/legal"
        },
        {
          index: 2,
          logo: require("../../assets/imgs/operator-icon.png"),
          keyName: "operatorInfoComplete",
          titleName: "操作人信息",
          statusName: "",
          statusVal: 0,
          url: "/certificate/operator"
        }
      ],
      submitBtnShow: false,
      isClickFlag: false
    };
  },
  components: {},
  created() {
    this.initState();
  },
  methods: {
    initState() {
      getUserAuditInfo().then(res => {
        let { code, data } = res;
        if ("0" === code) {
          this.layoutShowFlag = true;
          let { userAuditState } = data;
          let statusValue = getAccountStateText(userAuditState);
          this.formDatas[0].statusName = statusValue;
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
.outer-layout {
  ul {
    padding: 39px 30px 0px 30px;
    li {
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
        height: 20px;
      }
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
.company-logo {
  box-sizing: border-box;
  width: 750px;
  height: 294px;
  background: url("../../assets/imgs/user-center-bg.png") no-repeat;
  background-size: 100%;
  line-height: 294px;
  font-family: PingFangSC-Medium;
  font-size: 36px;
  color: #ffffff;
  letter-spacing: 0;
  padding-left: 35px;
}
</style>
