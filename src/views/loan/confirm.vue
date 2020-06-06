<template>
  <div class="wrapper">
    <h3 class="title">请确认本次融资申请信息</h3>
    <KuCell :label="'融资金额'" :desc="'100,000元'"></KuCell>
    <KuCell :label="'利率'" :desc="'4.5%'"></KuCell>
    <KuCell>
      <div slot="action" class="range-title">
        期限
      </div>
       <div slot="desc" class="my-range">
        <nut-slider v-model="stages" :range="[45,90]" :showLabel="true" :showRangeTxt="true"></nut-slider>
      </div>
    </KuCell>
    <div class="total">
      <KuCell :label="'预计还款总额'">
        <div slot="desc" class="money">
          <span>10000</span>元
        </div>
      </KuCell>
      <KuCell :label="'利息'" :desc="'100.00元'"></KuCell>
    </div>
    <kuButton @btnFun="handleSubmit" btnName="确认" :isClick="isClickForBtn" :isFixed="false"></kuButton>
  </div>
</template>

<script>
import KuCell from "../../components/kuui/cell";
import KuButton from "../../components/kuui/button";
export default {
  components: {
    KuCell,
    KuButton
  },
  props: {},
  data() {
    return {
      isClickForBtn: true,
      stages: 50
    };
  },
  watch: {

  },
  computed: {},
  methods: {
    handleSubmit() {
      alert(this.stages);
      this.$router.push({
        path: "/loan/applyresult"
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 98px 38px 0;
  .title {
    font-size: 28px;
    color: #303236;
    letter-spacing: 0;
    margin-bottom: 38px;
  }
  .total {
    margin-top: 100px;
    .kucell:first-child {
      border: none;
      /deep/.nut-cell-box {
        min-height: auto;
        height: auto;
      }
    }
    .money span {
      font-size: 40px;
      color: #303236;
      letter-spacing: 0;
      text-align: right;
    }
  }
  /deep/.stages input {
    text-align: right;
    padding: 0;
  }
  /deep/.my-range {
    width: 525px;
    float: right;
  }
  .range-title {
        font-size: 0.4rem;
    color: #5b5e66;
    letter-spacing: 0;
  }
}
</style>
