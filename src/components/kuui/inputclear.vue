<template>
  <div>
    <li>
      <div>
        <input
          :type="typeVal"
          :placeholder="placeholderName"
          v-model="newValue"
          @input="monitorInput"
          @focus="handleClearIconWhenFocus"
          @blur="handleClearIconWhenBlur"
        />
      </div>
      <div class="clear-icon" @mousedown="clearAccount" v-if="clearFlag">
        <img :src="require('../../assets/imgs/clear-icon.png')" />
      </div>
    </li>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    typeVal: {
      type: String,
      default: "text"
    },
    placeholderName: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    keyName: {
      type: String,
      required: false
    },
    clearFlag: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    newValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    monitorInput() {
      this.$emit("inputFun", this.keyName);
    },
    handleClearIconWhenFocus() {
      this.$emit("focusFun", this.keyName);
    },
    handleClearIconWhenBlur() {
      this.$emit("blurFun", this.keyName);
    },
    clearAccount() {
      this.$emit("clearFun", this.keyName);
    }
  }
};
</script>

<style lang="scss" scoped>
$font-name: PingFangSC-Medium;
li {
  width: 622px;
  border-bottom: 2px solid #dfe1e4;
  height: 134px;
  display: -webkit-flex;
  display: flex;
  align-items: flex-end;
  input {
    width: 500px;
    height: 42px;
    font-family: DINAlternate-Bold;
    font-size: 34px;
    color: #303236;
    letter-spacing: 0;
  }
  ::placeholder {
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #c8cbd1;
    letter-spacing: 0;
  }
}
li > div {
  margin-bottom: 5px;
  overflow: hidden;
}
li {
  div:first-child {
    width: 595px;
    overflow: hidden;
  }
  div:last-child {
    img {
      width: 26px;
      height: 26px;
    }
  }
}
</style>
