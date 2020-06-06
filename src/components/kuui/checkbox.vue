<template>
  <label class="ku-checkbox">
    <input
      v-if="group"
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :value="label"
      v-model="model"
      @change="change"
    />
    <input
      v-else
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :checked="currentValue"
      @change="change"
    />
    <slot
      ><span v-if="showSlot">{{ label }}</span></slot
    >
  </label>
</template>
<script>
/**
 * name	  checkbox的name属性	String	-
 * label  只在组合使用时有效。指定当前选项的 value 值，组合会自动判断是否选中   String | Number | Boolean
 * value 	必填项，只在单独使用时有效。可以使用 v-model 双向绑定数据   Boolean
 * disabled	是否禁用	Boolean	false
 * @on-change	只在单独使用时有效。在选项状态发生改变时触发，通过修改外部的数据改变时不会触发
 */
import { findComponentUpward } from "../../utils/tool";
export default {
  name: "KuCheckbox",
  props: {
    name: {
      type: String
    },
    label: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      model: [],
      group: false,
      showSlot: true,
      currentValue: this.value,
      parent: findComponentUpward(this, "KuCheckboxGroup")
    };
  },
  mounted() {
    this.parent = findComponentUpward(this, "KuCheckboxGroup");
    if (this.parent) {
      this.group = true;
    }
    if (this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
      this.showSlot = this.$slots.default !== undefined;
    }
  },
  methods: {
    change(event) {
      if (this.disabled) {
        return false;
      }
      const checked = event.target.checked;
      this.currentValue = checked;
      const value = checked ? this.trueValue : this.falseValue;
      this.$emit("input", value);
      if (this.group) {
        this.parent.change(this.model);
      } else {
        this.$emit("on-change", value);
      }
    },
    updateModel() {
      this.currentValue = this.value === this.trueValue;
    }
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        throw "Value should be trueValue or falseValue.";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.ku-checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 30px;
  color: #5b5e66;
  input {
    position: relative;
    width: 30px;
    height: 30px;
    border: 1px solid #dadada;
    border-radius: 50%;
    background-size: cover;
    outline: 0;
    opacity: 1;
    vertical-align: middle;
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 20px;
    &:checked {
      background-image: url("../../assets/imgs/checked-icon.png");
      background-size: 100%;
      border: none;
    }
    &:disabled {
      background-color: #dadada;
      border-color: #f6f6f6;
      box-shadow: none;
      &:checked {
        background-image: url("../../assets/imgs/checked-disabled.png");
        background-size: 100%;
        border: none;
      }
    }
  }
}
</style>
