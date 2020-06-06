<template>
  <div class="wrapper">
    <div class="result"><i class="icon"></i>开通成功！</div>
    <p class="title">账户信息如下：</p>
    <KuCell :label="'开户银行'" :desc="'中关村银行'"></KuCell>
    <KuCell :label="'账号'" :desc="'4567803890080876'"></KuCell>
    <kuButton
      @btnFun="handleSubmit"
      btnName="融资申请"
      :isClick="true"
      :isFixed="false"
    ></kuButton>
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
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    handleSubmit() {
      this.$router.push({
        path: "/loan/apply"
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
$font-name: PingFangSC-Medium;
.wrapper {
  padding: 59px 30px 0;
  .result {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #303236;
    letter-spacing: 0;
    text-align: center;
    margin-bottom: 58px;
    i {
      display: inline-block;
      width: 41px;
      height: 41px;
      background: url("../../assets/imgs/result-icon.png");
      background-size: 100%;
      margin-right: 20px;
    }
  }
}
.title {
  font-size: 28px;
  color: #303236;
  letter-spacing: 0;
  margin-bottom: 38px;
}
</style>
