<template>
  <div class="outer-layout">
    <div class="audit-icon">
      <img :src="require('../../assets/imgs/audit-icon.png')" alt />
    </div>
    <h3>认证结果审核中</h3>
    <p>预计1个工作日内完成认证审核，审核结果将以短信通知</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
$font-name: PingFangSC-Regular;
.outer-layout {
  padding: 156px 64px 0px 64px;
  .audit-icon {
    width: 105px;
    height: 105px;
    margin: 0px auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  h3 {
    font-family: $font-name;
    font-size: 30px;
    color: #303236;
    letter-spacing: 0;
    text-align: center;
    margin: 65px 0px 18px 0px;
  }
  p {
    font-family: $font-name;
    font-size: 24px;
    color: #5b5e66;
    letter-spacing: 0;
    text-align: center;
  }
}
</style>
