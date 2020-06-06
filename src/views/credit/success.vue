<template>
  <div>
    <section class="state-warn">
      <div>
        <img :src="require('../../assets/imgs/pass-icon.png')" />
      </div>
      <div>授信成功！</div>
    </section>
    <section class="user-pro-bg">
      <div class="pro-intro">
        <div>您当前可融资额度(元)</div>
        <div @click="lookTerm">
          <img :src="require('../../assets/imgs/warn-tip.png')" />
          &nbsp;产品条款
        </div>
      </div>
      <p class="able-amont">9,994.00</p>
      <section class="pro-content">
        <div>
          <p>100,000.00</p>
          <p>总额度(元)</p>
        </div>
        <div class="line"></div>
        <div>
          <p>10.00%</p>
          <p>年利率(%)</p>
        </div>
        <div class="line"></div>
        <div>
          <p>45~90</p>
          <p>贷款期限(天)</p>
        </div>
      </section>
    </section>
    <div class="btn-box">
      <div class="loan-btn">我要融资</div>
    </div>
    <KuActionsheet title="产品条款" :isShow="isShowTerm">
      <TermContent></TermContent>
      <template v-slot:button>
        <kuButton
          @btnFun="closeTerm"
          btnName="知道了"
          :isClick="true"
          :isFixed="true"
        ></kuButton>
      </template>
    </KuActionsheet>
  </div>
</template>

<script>
import KuActionsheet from "../../components/kuui/actionsheet";
import TermContent from "../product/productTerm";
import kuButton from "../../components/kuui/button";
export default {
  data() {
    return {
      isShowTerm: false
    };
  },
  components: {
    KuActionsheet,
    TermContent,
    kuButton
  },
  methods: {
    closeTerm() {
      this.isShowTerm = false;
    },
    lookTerm() {
      this.isShowTerm = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.state-warn {
  width: 750px;
  height: 106px;
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
    line-height: 64.5px;
    margin-right: 20px;
    img {
      width: 41px;
      height: 41px;
    }
  }
  img {
    margin-top: 20px;
  }
}
.user-pro-bg {
  width: 730px;
  height: 372px;
  background: url("../../assets/imgs/pro-bg2.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 10px;
  padding: 54px 0px 0px 50px;
  box-sizing: border-box;
}
.pro-intro {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  div:first-child {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #ffffff;
    letter-spacing: 0;
  }
  div:last-child {
    width: 150px;
    height: 45px;
    line-height: 45px;
    background: #5156e0;
    border-radius: 31.5px;
    margin-right: 40px;
    text-align: center;
    overflow: hidden;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    img {
      width: 28px;
      height: 28px;
      margin-right: 5px;
    }
  }
}
.able-amont {
  font-family: DINAlternate-Bold;
  font-size: 80px;
  color: #ffffff;
  letter-spacing: 0;
  margin-top: 10px;
}
.pro-content {
  display: flex;
  display: -webkit-flex;
  margin-top: 45px;
  div:nth-child(odd) {
    width: 210px;
    text-align: center;
    overflow: hidden;
  }
  p:first-child {
    font-family: DINAlternate-Bold;
    font-size: 38px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
  }
  p:last-child {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    margin-top: 10px;
  }
  .line {
    width: 1px;
    height: 40px;
    background: #9ca1f0;
    margin-top: 20px;
  }
}
ul {
  padding: 0px 30px 0px 30px;
  margin-top: 25px;
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
    }
    div:last-child {
      font-family: PingFangSC-Medium;
      font-size: 24px;
      color: #898d99;
      letter-spacing: 0;
      text-align: right;
      padding-right: 20px;
      height: 24px;
      span {
        color: red;
      }
      background: url("../../assets/imgs/go-icon.png") no-repeat;
      background-size: 25px 25px;
      background-position: right;
    }
  }
}
.btn-box {
  position: fixed;
  left: 0px;
  bottom: 0px;
  background: #fff;
  margin-top: 58px;
  padding-left: 30px;
  padding-bottom: 28px;
  div:first-child {
    width: 690px;
    height: 98px;
    background: #5888f5;
    border-radius: 6px;
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    line-height: 98px;
  }
}
</style>
