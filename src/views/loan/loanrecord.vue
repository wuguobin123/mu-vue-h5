<template>
  <div class="wrapper">
    <div class="recordWrap">
      <ul class="recordList">
        <router-link to="/loan/audit/10002" tag="li">
          <div class="left">
            <h4>凌俊宝(产品名称)</h4>
            <p class="date">2019-05-15</p>
          </div>
          <div class="right">
            <span class="tag">请确认融资申请信息</span>
          </div>
          <i class="arrow"></i>
        </router-link>
        <router-link to="/loan/audit/10001" tag="li">
          <div class="left">
            <h4>凌俊宝(产品名称)</h4>
            <p class="date">2019-05-15</p>
          </div>
          <div class="right">
            <span class="tag">审核中</span>
          </div>
          <i class="arrow"></i>
        </router-link>
        <router-link to="/loan/audit/10003" tag="li">
          <div class="left">
            <h4>凌俊宝(产品名称)</h4>
            <p class="date">2019-05-15</p>
          </div>
          <div class="right">
            <span class="tag">申请已过期</span>
          </div>
          <i class="arrow"></i>
        </router-link>
        <router-link to="/loan/detail/processing" tag="li">
          <div class="left">
            <h4>凌俊宝(产品名称)</h4>
            <p class="date">2019-05-15</p>
          </div>
          <div class="right">
            <div class="amount">
              ￥<nut-price
                :price="1010"
                :needSymbol="false"
                :thousands="true"
              />
            </div>
            <span class="tag">放款处理中</span>
          </div>
          <i class="arrow"></i>
        </router-link>
        <router-link to="/loan/detail/success" tag="li">
          <div class="left">
            <h4>凌俊宝(产品名称)</h4>
            <p class="date">2019-05-15</p>
          </div>
          <div class="right">
            <div class="amount">
              ￥<nut-price
                :price="1010"
                :needSymbol="false"
                :thousands="true"
              />
            </div>
            <span class="tag">放款成功</span>
          </div>
          <i class="arrow"></i>
        </router-link>
        <router-link to="/loan/detail/fail" tag="li">
          <div class="left">
            <h4>凌俊宝(产品名称)</h4>
            <p class="date">2019-05-15</p>
          </div>
          <div class="right">
            <div class="amount">
              ￥<nut-price
                :price="1010"
                :needSymbol="false"
                :thousands="true"
              />
            </div>
            <span class="tag">放款失败</span>
          </div>
          <i class="arrow"></i>
        </router-link>
      </ul>
      <kuButton
        @btnFun="handleSubmit"
        btnName="下一步"
        :isClick="isClickForBtn"
        :isFixed="true"
      ></kuButton>
    </div>

    <div class="empty" style="display:none">
      <img src="../../assets/imgs/record-icon.png" class="recordIco" />
      <p>暂无记录</p>
    </div>
  </div>
</template>

<script>
import KuButton from "../../components/kuui/button";
export default {
  components: {
    KuButton
  },
  props: {},
  data() {
    return {
      isClickForBtn: true
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSubmit() {}
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
/deep/.amount .nut-price {
  .price-big {
    font-size: 40px !important;
  }
  .price-small {
    font-size: 40px !important;
  }
}
.wrapper {
  padding: 30px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: relative;
    height: 150px;
    background: #ffffff;
    border: 1px solid #eeeff2;
    box-shadow: 0 2px 18px 0 rgba(233, 238, 249, 0.5);
    border-radius: 12px;
    padding: 30px;
    box-sizing: border-box;
    margin-bottom: 18px;
    &::before {
      content: "";
      width: 6px;
      height: 24px;
      background: #5888f5;
      position: absolute;
      left: 0;
      top: 35px;
    }
    .left {
      flex: 1;
    }
    .right {
      text-align: right;
    }
    h4 {
      font-family: PingFangSC-Medium;
      font-size: 26px;
      color: #303136;
      letter-spacing: 0;
      padding-bottom: 23px;
    }
    .date {
      font-family: PingFangSC-Regular;
      font-size: 22px;
      color: #898d99;
      letter-spacing: 0;
      text-align: left;
      line-height: 0.4rem;
    }
    .amount {
      font-family: PingFangSC-Semibold;
      font-size: 30px;
      color: #ff5d5d;
      letter-spacing: 0;
      text-align: right;
      line-height: 42px;
    }
    .tag {
      font-family: PingFangSC-Regular;
      font-size: 20px;
      color: #5888f5;
      letter-spacing: 0;
      padding: 5px;
      background: #ebf1ff;
      border-radius: 6px;
    }
    .arrow {
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url("../../assets/imgs/arrow.png");
      background-size: 100%;
      margin-left: 10px;
    }
  }
  .empty {
    width: 100%;
    text-align: center;
    padding-top: 120px;
    .recordIco {
      width: 120px;
      height: 120px;
    }
    p {
      font-family: PingFangSC-Regular;
      font-size: 30px;
      color: #303236;
      letter-spacing: 0;
      text-align: center;
      padding-top: 58px;
    }
  }
}
</style>
