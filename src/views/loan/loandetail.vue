<template>
  <div class="wrapper">
    <h3 class="title">凌俊宝(产品名称)</h3>
    <div class="amount">
      ￥<nut-price :price="1010" :needSymbol="false" :thousands="true" />
    </div>
    <div class="auditing" v-if="type == 'processing'">
      <nut-button shape="circle" small class="doingBtn">
        放款处理中
      </nut-button>
    </div>
    <div class="auditing" v-if="type == 'success'">
      <nut-button shape="circle" small class="doingBtn">
        放款成功
      </nut-button>
    </div>
    <div class="failBox" v-if="type == 'fail'">
      <nut-button shape="circle" small class="failBtn">
        放款失败
      </nut-button>
      <p class="fail">
        放款失败原因放款失败原因放款失败原因放款失败原因放款失败原因放款失败原因放款失败原因
      </p>
    </div>
    <div class="loanDetail">
      <h4>融资信息：</h4>
      <ul class="list">
        <li>
          <label class="label">借据号</label>
          <div class="desc">4567803890080876</div>
        </li>
        <li>
          <label class="label">年化利率</label>
          <div class="desc">12.03%</div>
        </li>
        <li>
          <label class="label">逾期利率</label>
          <div class="desc">0.05%</div>
        </li>
        <li>
          <label class="label">申请日期</label>
          <div class="desc">2020-09-12</div>
        </li>
        <template v-if="type == 'success'">
          <li>
            <label class="label">放款日</label>
            <div class="desc">2020-09-12</div>
          </li>
          <li>
            <label class="label">计划还款日</label>
            <div class="desc">2020-09-12</div>
          </li>
          <li>
            <label class="label">预计还款总额 <i class="info"></i></label>
            <div class="desc">
              <nut-price
                :price="10100"
                :needSymbol="false"
                :thousands="true"
              />元
            </div>
          </li>
          <li>
            <label class="label">还款状态</label>
            <div class="desc">已结清</div>
          </li>
        </template>
      </ul>
    </div>
    <div class="receivable">
      <h4>应收账款信息：</h4>
      <KuCell :label="'2020年3月'">
        <div slot="desc">
          <nut-price :price="1010" :needSymbol="false" :thousands="true" />元
        </div>
      </KuCell>
      <KuCell :label="'2020年4月'">
        <div slot="desc">
          <nut-price :price="1010" :needSymbol="false" :thousands="true" />元
        </div>
      </KuCell>
    </div>
  </div>
</template>

<script>
import KuCell from "../../components/kuui/cell";
export default {
  components: {
    KuCell
  },
  props: {},
  data() {
    return {
      type: ""
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    this.type = this.$route.params.type;
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
/deep/.amount .nut-price {
  .price-big {
    font-size: 80px !important;
  }
  .price-small {
    font-size: 80px !important;
  }
}
/deep/.nut-button {
  width: 216px;
  height: 54px;
}
.wrapper {
  padding: 70px 30px 120px;
  .title {
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #303136;
    letter-spacing: 0;
    text-align: center;
  }
  .amount {
    font-size: 50px;
    color: #ff5d5d;
    letter-spacing: 0;
    text-align: center;
    padding-top: 20px;
  }
  .fail {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #898d99;
    letter-spacing: 0;
    text-align: center;
    line-height: 34px;
    padding-top: 30px;
  }
  .auditing,
  .failBox {
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
  .doingBtn {
    background: #ebf1ff;
    border-radius: 27px;
    font-size: 24px;
    color: #5888f5;
    letter-spacing: 0;
    text-align: center;
  }
  .failBtn {
    background: #ebf1ff;
    border-radius: 27px;
    font-size: 24px;
    color: #bbc1d1;
    letter-spacing: 0;
    text-align: center;
  }
  .loanDetail {
    margin-top: 78px;
    h4 {
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #303236;
      letter-spacing: 0;
    }
    .list {
      border-bottom: 1px solid #eff1f5;
      padding-top: 38px;
      padding-bottom: 20px;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 80px;
        .label {
          display: flex;
          align-items: center;
          font-family: PingFangSC-Medium;
          font-size: 30px;
          color: #5b5e66;
          letter-spacing: 0;
          .info {
            display: inline-block;
            width: 30px;
            height: 30px;
            background: url("../../assets/imgs/info-icon.png");
            background-size: 100%;
            margin-left: 20px;
          }
        }
        .desc {
          font-family: DINAlternate-Bold;
          font-size: 28px;
          color: #303236;
          letter-spacing: 0;
          text-align: right;
        }
      }
    }
  }
  .receivable {
    margin-top: 58px;
    h4 {
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #303236;
      letter-spacing: 0;
      margin-bottom: 38px;
    }
  }
}
</style>
