<template>
  <div v-show="isShow">
    <KuMask></KuMask>
    <div class="panel-layout">
      <h2>{{ title }}</h2>
      <article>
        <slot></slot>
      </article>
    </div>
    <slot name="button"></slot>
  </div>
</template>

<script>
import KuMask from "../../components/kuui/mask";
export default {
  data() {
    return {};
  },
  components: {
    KuMask
  },
  created() {
    console.log(this.name2);
  },
  props: {
    title: {
      type: String,
      required: false
    },
    isShow: {
      type: Boolean,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-layout {
  width: 100%;
  height: 1136px;
  background: #ffffff;
  border-radius: 18px 18px 0 0;
  position: fixed;
  z-index: 10000;
  left: 0;
  bottom: 0;
}
h2 {
  font-family: PingFangSC-Medium;
  font-size: 32px;
  color: #303236;
  letter-spacing: 0;
  text-align: center;
  margin: 48px auto 28px;
}
article {
  font-family: PingFangSC-Regular;
  font-size: 26px;
  color: #5b5e66;
  letter-spacing: 0;
  text-align: justify;
  padding: 0px 30px 120px 30px;
  line-height: 50px;
  height: 840px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
