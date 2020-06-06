<template>
  <div class="outer-layout">
    <ul v-if="products.length > 0">
      <li
        v-for="item in products"
        :key="item.productNo"
        @click="productDetail(item.productNo)"
      >
        <span class="small-icon"></span>
        <p class="name">{{ item.productName }}</p>
        <section>
          <div class="limit">
            <p>
              <nut-price
                :price="item.maxLoanLimit"
                :needSymbol="false"
                :thousands="true"
              ></nut-price>
            </p>
            <p class="title-intro">最高额度(元)</p>
          </div>
          <div class="rate">
            <p>{{ item.annualRate }}%</p>
            <p class="title-intro">年化率(%)</p>
          </div>
          <div class="day">
            <p>{{ item.minLoanTerm }}~{{ item.maxLoanTerm }}</p>
            <p class="title-intro">贷款期限({{ item.termUnit }})</p>
          </div>
          <div class="look">
            <div>去看看</div>
          </div>
        </section>
        <div class="mark">
          <span v-for="mark in item.productLabel" :key="mark">{{ mark }}</span>
        </div>
      </li>
    </ul>
    <ProductEmpty v-else></ProductEmpty>
  </div>
</template>

<script>
import ProductEmpty from "./productempty";
import { getProducts } from "../../services/product";
export default {
  data() {
    return {
      products: [],
      results: {
        code: "0",
        msg: "成功",
        data: [
          {
            productNo: "12345678",
            productName: "12345678",
            maxLoanLimit: 20000,
            annualRate: 3,
            minLoanTerm: 5,
            maxLoanTerm: 6,
            loanTermUnit: 1,
            productLabel: "10,11,12",
            termUnit: "日"
          }
        ]
      }
    };
  },
  components: {
    ProductEmpty
  },
  created() {
    this.formatData();
    // this.getProducts();
  },
  methods: {
    getProducts() {
      getProducts().then(res => {
        if ("0" === res.code) {
          this.formatData(res.data);
        }
      });
    },
    formatData(products) {
      products = this.results.data;
      for (let i = 0, len = products.length; i < len; i++) {
        let product = products[i];
        for (let key in product) {
          if (key === "productLabel") {
            product[key] = product[key] ? product[key].split(",") : "";
          }
        }
      }
      this.products = products;
    },
    productDetail(productNum) {
      let randomNum = Math.random();
      if (randomNum > 1) {
        this.$router.push({
          path: "/product/myproduct",
          query: {
            num: productNum
          }
        });
      } else {
        this.$router.push({
          path: "/product/detail",
          query: {
            num: productNum
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$font-name: DINAlternate-Bold;
.outer-layout {
  padding: 49px 30px 0px 30px;
  li {
    box-sizing: border-box;
    width: 690px;
    height: 243px;
    background: #ffffff;
    border: 2px solid #eeeff2;
    box-shadow: 0 2px 18px 0 rgba(233, 238, 249, 0.5);
    border-radius: 12px;
    padding: 28px 28px 28px 30px;
    margin-bottom: 18px;
    position: relative;
    .small-icon {
      position: absolute;
      left: 0;
      top: 26px;
      width: 6px;
      height: 24px;
      background: #5888f5;
    }
  }
  .name {
    font-family: PingFangSC-Medium;
    font-size: 26px;
    color: #303136;
    letter-spacing: 0;
  }
  section {
    display: flex;
    display: -webkit-flex;
    margin-top: 15px;
    div {
      width: 160px;
      height: 80px;
      overflow: hidden;
    }
    .title-intro {
      font-family: PingFangSC-Regular;
      font-size: 20px;
      color: #898d99;
      letter-spacing: 0;
      text-align: left;
    }
    .limit {
      p:first-child {
        font-family: $font-name;
        font-size: 48px;
        color: #ff5d5d;
        letter-spacing: 0;
        text-align: left;
        margin-bottom: 10px;
      }
    }
    .rate,
    .day {
      p:first-child {
        font-family: $font-name;
        font-size: 32px;
        color: #5b5e66;
        letter-spacing: 0;
        text-align: left;
        line-height: 57px;
      }
    }
    .look div {
      width: 150px;
      height: 63px;
      background-image: linear-gradient(162deg, #4a94fc 0%, #585ef4 95%);
      box-shadow: 0 4px 20px 0 rgba(36, 63, 180, 0.22);
      border-radius: 31.5px;
      font-family: PingFangSC-Regular;
      font-size: 22px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      line-height: 63px;
      margin-top: 10px;
    }
  }
  .mark {
    margin-top: 25px;
    line-height: 0px;
    span {
      display: inline;
      background: #ebf1ff;
      border-radius: 6px;
      padding: 5px 10px 5px 10px;
      font-family: PingFangSC-Regular;
      font-size: 20px;
      color: #5888f5;
      letter-spacing: 0;
      margin-right: 18px;
      line-height: 26px;
    }
  }
}
</style>
