<template>
  <div v-if="isVisible">
    <KuMask></KuMask>
    <div class="dialog-box">
      <div class="title">{{ title }}</div>
      <div class="modal-footer">
        <div class="cancelBtn" v-if="showCancel" @click="cancelFun">取消</div>
        <div @click="confirmFun">{{ btnTxt }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import KuMask from "./mask";
export default {
  data() {
    return {};
  },
  components: {
    KuMask
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    btnTxt: {
      type: String,
      default: ""
    },
    showCancel: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    confirmFun() {
      this.$emit("confirmFun");
    },
    cancelFun() {
      this.$emit("cancelFun");
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-box {
  width: 600px;
  height: 330px;
  background: #ffffff;
  border-radius: 6px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 10000;
  .title {
    height: 239px;
    border-bottom: 2px solid #f2f2f2;
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #262121;
    letter-spacing: 0;
    text-align: center;
    line-height: 239px;
  }
  .modal-footer {
    display: flex;
    width: 100%;
    height: 89px;
    div {
      width: 50%;
      font-family: PingFangSC-Medium;
      font-size: 28px;
      color: #262121;
      letter-spacing: 0;
      text-align: center;
      line-height: 89px;
    }
    .cancelBtn {
      font-size: 28px;
      color: #666666;
      letter-spacing: 0;
      text-align: center;
    }
  }
}
</style>
