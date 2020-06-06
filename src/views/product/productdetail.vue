<template>
  <div>
    <section class="pro-bg">
      <p>{{ product.productName }}</p>
      <div class="pro-intro">
        <div class="amount">
          <p>
            <nut-price
              :price="product.maxLoanLimit"
              :needSymbol="false"
              :thousands="true"
            ></nut-price>
          </p>
          <p class="title-intro">最高额度(元)</p>
        </div>
        <div class="line"></div>
        <div class="rate">
          <p>{{ product.annualRate }}%</p>
          <p class="title-intro">年利率(%)</p>
        </div>
        <div class="line"></div>
        <div class="day">
          <p>{{ product.minLoanTerm }}~{{ product.maxLoanTerm }}</p>
          <p class="title-intro">贷款期限({{ product.termUnit }})</p>
        </div>
      </div>
    </section>
    <section class="apply-step">
      <h2>申请流程</h2>
      <div class="steps">
        <article v-for="step in steps" :key="step.index">
          <div v-if="step.url">
            <img :src="require('../../assets/imgs/' + step.url)" alt />
            <p>{{ step.name }}</p>
          </div>
          <div v-else></div>
        </article>
      </div>
    </section>
    <section class="intro-content">
      <h2>产品说明</h2>
      <div v-html="product.productDesc"></div>
    </section>
    <section class="bottom-box">
      <div @click="goApply">立即申请</div>
    </section>
  </div>
</template>

<script>
import { getProductDetail } from "../../services/product";
export default {
  data() {
    return {
      steps: [
        {
          index: 0,
          url: "material.png",
          name: "提交资料"
        },
        {
          index: 1
        },
        {
          index: 2,
          url: "credit.png",
          name: "产品授信"
        },
        {
          index: 3
        },
        {
          index: 4,
          url: "loan.png",
          name: "借款申请"
        },
        {
          index: 5
        },
        {
          index: 6,
          url: "give.png",
          name: "放款"
        }
      ],
      product: {},
      detail: {
        code: "0",
        msg: "成功",
        data: {
          productNo: "12345678",
          productName: "12345678",
          maxLoanLimit: 2000,
          annualRate: 3,
          minLoanTerm: 5,
          maxLoanTerm: 6,
          loanTermUnit: 1,
          productLabel: "10,11,12",
          termUnit: "日",
          productDesc:
            "<p>发生了非建安路；上交房都拉设计费了；家发电量；按实际发</p><p>防静电拉三级分类；大撒解放路； 撒</p>"
        }
      }
    };
  },
  created() {
    this.product = this.detail.data;
    // this.getProductDetail();
  },
  methods: {
    goApply() {
      this.$router.push({
        path: "/credit/bankinfo"
      });
    },
    getProductDetail() {
      getProductDetail().then(res => {
        let { code, data } = res;
        if ("0" === code) {
          this.product = data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.pro-bg {
  box-sizing: border-box;
  width: 730px;
  height: 307px;
  background: url("../../assets/imgs/pro-bg1.png") no-repeat;
  background-size: 730px 307px;
  margin-left: 10px;
  padding: 54px 0px 0px 50px;
  p {
    font-family: PingFangSC-Medium;
    font-size: 34px;
    color: #ffffff;
    letter-spacing: 0;
  }
  .title-intro {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #ffffff;
    letter-spacing: 0;
  }
  .pro-intro {
    display: flex;
    display: -webkit-flex;
    .amount {
      width: 230px;
      overflow: hidden;
      p:first-child {
        font-family: DINAlternate-Bold;
        font-size: 60px;
        color: #ffffff;
        letter-spacing: 0;
        margin: 30px 0px 10px 0px;
      }
    }
    .line {
      height: 40px;
      border-right: solid #9ca1f0 1px;
      margin-top: 70px;
    }
    .rate,
    .day {
      width: 200px;
      text-align: center;
      p:first-child {
        font-family: DINAlternate-Bold;
        font-size: 38px;
        color: #ffffff;
        letter-spacing: 0;
        margin-top: 40px;
        line-height: 60px;
      }
    }
  }
}
.apply-step {
  padding: 0px 30px 0px 30px;
  margin-top: 34px;
  h2 {
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #303136;
    letter-spacing: 0;
  }
  img {
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin: 38px 0px 18px 5px;
  }

  .steps {
    display: flex;
    display: -webkit-flex;
    margin-left: 23px;
    font-family: PingFangSC-Regular;
    font-size: 26px;
    color: #303136;
    letter-spacing: 0;
    text-align: center;
    div {
      margin-right: 12px;
    }
    article:nth-child(even) {
      width: 54px;
      height: 2px;
      background: #4f82f9;
      margin-top: 60px;
    }
    div:last-child {
      p {
        padding-left: 8px;
      }
    }
  }
}
.intro-content {
  padding: 0px 30px 0px 30px;
  h2 {
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #303136;
    letter-spacing: 0;
    margin: 58px 0px 38px 0px;
  }
  div {
    font-family: PingFangSC-Regular;
    font-size: 26px;
    color: #5b5e66;
    letter-spacing: 0;
    text-align: justify;
    line-height: 45px;
  }
}
.bottom-box {
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 750px;
  height: 144px;
  background: #fff;

  div {
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
    margin: 18px auto;
  }
}
</style>
