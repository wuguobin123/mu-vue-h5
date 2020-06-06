<template>
  <div class="checkBoxGroup">
    <slot></slot>
  </div>
</template>
<script>
import { findComponentsDownward } from "../../utils/tool";
export default {
  name: "KuCheckboxGroup",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean, Array],
      default: null
    }
  },
  data() {
    return {
      currentValue: this.value,
      childrens: []
    };
  },
  mounted() {
    this.updateModel(true);
  },
  methods: {
    updateModel(update) {
      this.childrens = findComponentsDownward(this, "KuCheckbox");
      if (this.childrens) {
        const { value } = this;
        this.childrens.forEach(child => {
          child.model = value;
          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0;
            child.group = true;
          }
        });
      }
    },
    change(data) {
      this.currentValue = data;
      this.$emit("input", data);
      this.$emit("on-change", data);
    }
  },
  watch: {
    value() {
      this.updateModel(true);
    }
  }
};
</script>
