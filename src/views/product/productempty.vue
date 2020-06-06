<template>
  <article>
    <div>
      <img :src="require('../../assets/imgs/maintenance-icon.png')" />
    </div>
    <p>产品维护中</p>
  </article>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
div {
  width: 120px;
  height: 120px;
  margin: 128px auto 58px;
  img {
    width: 100%;
    height: 100%;
  }
}
p {
  font-family: PingFangSC-Regular;
  font-size: 30px;
  color: #303236;
  letter-spacing: 0;
  text-align: center;
}
</style>
