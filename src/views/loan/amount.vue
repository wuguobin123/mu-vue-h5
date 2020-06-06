<template>
  <div class="outer-layout">
    <p class="title">
      我们已打款随机金额至您的企业账户，
      <br />请输入金额并确认
    </p>
    <div class="amount">
      <nut-textinput
        label="￥"
        v-model="amount"
        type="number"
        :clearBtn="false"
        placeholder="请输入金额"
      />
    </div>
    <kuButton
      @btnFun="handleSubmit"
      btnName="确认并开通电子账户"
      :isClick="isClickForBtn"
      :isFixed="false"
    ></kuButton>
  </div>
</template>

<script>
import KuButton from "../../components/kuui/button";
export default {
  data() {
    return {
      amount: null,
      isClickForBtn: false
    };
  },
  components: {
    KuButton
  },
  created() {},
  methods: {
    handleSubmit() {
      this.$router.push({
        path: "/loan/result"
      });
    }
  },
  watch: {
    amount(val) {
      const reg = /^(\.*)(0|[1-9]\d{0,7})(\.\d{1,2})?.*$/;
      if (reg.test(val)) {
        this.amount = val.replace(reg, "$2$3");
        this.isClickForBtn = true;
      } else {
        this.isClickForBtn = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$font-name: PingFangSC-Medium;
.outer-layout {
  padding: 98px 64px 28px;
  .title {
    font-size: 28px;
    color: #303236;
    letter-spacing: 0;
    font-family: $font-name;
    line-height: 40px;
    margin-bottom: 108px;
  }
  /deep/.amount {
    border-bottom: 1px solid #dfe1e4;
    .nut-textinput-label {
      font-family: DINAlternate-Bold;
      font-size: 38px;
      color: #303236;
      letter-spacing: 0;
    }
    input {
      font-size: 38px;
      color: #303236;
      font-family: $font-name;
    }
    input::-webkit-input-placeholder {
      font-size: 38px;
      color: #c8cbd1;
      letter-spacing: 0;
      font-family: $font-name;
      font-weight: normal;
    }
  }
}
</style>
