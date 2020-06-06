<template>
  <div class="outer-layout">
    <div class="audit-icon">
      <img :src="require('../../assets/imgs/' + imgUrl)" alt />
    </div>
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
    <article>
      <slot></slot>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false
    },
    content: {
      type: String,
      required: false
    },
    imgUrl: {
      type: String,
      required: false
    }
  }
};
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
