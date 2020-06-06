<template>
  <div class="wrapper">
    <img src="../../assets/imgs/result-icon.png" class="applyStatus" />
    <p class="applyResult">
      融资申请已提交，申请结果将以短信通知您，<br />请您耐心等待
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    setTimeout(() => {
      var r = confirm("演示，查看审核中页面");
      if (r == true) {
        this.$router.push({
          path: "/loan/audit/10001"
        });
      }
    }, 1500);
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 128px 75px 0;
  .applyStatus {
    display: block;
    width: 120px;
    height: 120px;
    margin: 0 auto 58px;
  }
  .applyResult {
    font-size: 30px;
    color: #303236;
    letter-spacing: 0;
    text-align: center;
    line-height: 46px;
  }
}
</style>
