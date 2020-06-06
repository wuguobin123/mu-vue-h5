<template>
  <div>
    <section :class="[isFixed ? 'bottom-box' : '']">
      <slot :slotFun="slotFun" :slotFunSecond="slotFunSecond"></slot>
      <button
        :class="[
          isClick ? 'undisable-click' : 'disable-click',
          !isFixed ? 'btn-height' : ''
        ]"
        @click="btnFun"
      >
        {{ btnName }}
      </button>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    btnName: {
      type: String,
      required: true
    },
    isClick: {
      type: Boolean,
      required: true
    },
    isFixed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    btnFun() {
      this.$emit("btnFun");
    },
    slotFun() {
      this.$emit("slotFun");
    },
    slotFunSecond() {
      this.$emit("slotFunSecond");
    }
  }
};
</script>

<style lang="scss" scoped>
$font-name: PingFangSC-Medium;
button {
  display: block;
  width: 622px;
  height: 98px;
  font-family: $font-name;
  font-size: 30px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 98px;
  border-radius: 6px;
}
.btn-height {
  margin: 88px auto 38px;
}
.disable-click {
  background: #bccffb;
  pointer-events: none;
  disabled: disabled;
}
.undisable-click {
  background: #5888f5;
}
.bottom-box {
  position: fixed;
  bottom: 0px;
  left: 0px;
  padding-top: 0.2rem;
  padding-bottom: 0.4rem;
  background: #ffffff;
  width: 100%;
  padding-left: 64px;
  z-index: 10001;
}
</style>
