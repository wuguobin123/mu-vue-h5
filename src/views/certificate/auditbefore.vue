<template>
  <div class="outer-layout">
    <div class="audit-icon">
      <img :src="require('../../assets/imgs/audit-icon.png')" alt />
    </div>
    <h3>认证结果审核中</h3>
    <p>将有工作人员联系您核实信息，请保持电话畅通</p>
    <h4>
      请您提前准备以下影像信息
      <!-- <span>查看示例</span> -->
    </h4>
    <ul>
      <li>法人身份证正反面</li>
      <li>营业执照</li>
      <li>税务登记证</li>
      <li>企业联系人授权书</li>
    </ul>
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
  h4 {
    font-family: $font-name;
    font-size: 28px;
    color: #303236;
    letter-spacing: 0;
    margin: 130px 0px 47px 0px;
    span {
      font-family: $font-name;
      font-size: 28px;
      color: #5888f5;
      letter-spacing: 0;
      text-align: center;
      line-height: 40px;
      text-decoration: underline;
    }
  }
  ul li {
    font-family: $font-name;
    font-size: 26px;
    color: #5b5e66;
    letter-spacing: 0;
    margin-bottom: 18px;
    position: relative;
    padding-left: 20px;
    &::before {
      content: "";
      position: absolute;
      left: 0px;
      top: 30%;
      display: table;
      width: 10px;
      height: 10px;
      background: #5888f5;
      border-radius: 50%;
    }
  }
}
</style>
