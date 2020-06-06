<template>
  <div>
    <article>
      <div>{{ title }}</div>
      <section>
        <div>
          <input
            :type="typeVal"
            :placeholder="placeholderName"
            :maxlength="typeVal && typeVal === 'tel' ? maxLength : ''"
            v-model="newValue"
            @input="monitorInput"
            @focus="handleClearIconWhenFocus"
            @blur="handleClearIconWhenBlur"
            :readonly="isReadonly"
          />
        </div>
        <div
          class="clear-icon"
          @mousedown="clearAccount"
          v-if="clearFlag && !isReadonly"
        >
          <img :src="require('../../assets/imgs/clear-icon.png')" />
        </div>
      </section>
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
    placeholderName: {
      type: String,
      required: false
    },
    maxLength: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    typeVal: {
      type: String,
      required: false
    },
    clearFlag: {
      type: Boolean,
      required: false
    },
    keyName: {
      type: String,
      required: false
    },
    isReadonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    newValue: {
      get: function() {
        return this.value;
      },
      set: function(value) {
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
article {
  width: 622px;
  height: 108px;
  border-bottom: 2px solid #dfe1e4;
  margin-bottom: 28px;
  input {
    width: 500px;
    height: 42px;
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #303236;
    letter-spacing: 0;
  }
  ::placeholder {
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #c8cbd1;
    letter-spacing: 0;
  }
  section {
    display: flex;
    display: -webkit-flex;
  }
  section {
    margin-top: 20px;
    div:first-child {
      width: 595px;
      overflow: hidden;
    }
    div:last-child {
      img {
        width: 26px;
        height: 26px;
        margin-bottom: 15px;
      }
    }
  }
}
article div:first-child {
  font-family: PingFangSC-Regular;
  font-size: 26px;
  color: #5b5e66;
  letter-spacing: 0;
}
</style>
