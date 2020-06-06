<template>
  <div class="kucell">
    <nut-cell
      :title="label"
      :desc="desc"
      :show-icon="false"
      @click-cell="clickEvnt"
    >
      <slot slot="avatar" name="action"></slot>
      <slot slot="desc" name="desc"></slot>
    </nut-cell>
  </div>
</template>

<script>
/**
 * 和NUTUI Cell 列表项API一致
 */
export default {
  name: "ku-cell",
  props: {
    label: {
      type: String,
      default: ""
    },
    desc: {
      type: String,
      default: ""
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickEvnt() {
      this.$emit("click-cell");
    }
  }
};
</script>

<style lang="scss" scoped>
$font-name: PingFangSC-Medium;
.kucell {
  position: relative;
  border-bottom: 1px solid #eff1f5;
}
/deep/ .nut-cell {
  .nut-cell-box {
    min-height: 108px;
    height: 108px;
  }
  .nut-cell-desc {
    font-size: 30px;
    color: #303236;
    letter-spacing: 0;
    text-align: right;
  }
  &:only-of-type {
    //background-position: left bottom;
    background: none;
  }
  .nut-cell-title {
    font-size: 30px;
    color: #5b5e66;
    letter-spacing: 0;
  }
}
</style>
