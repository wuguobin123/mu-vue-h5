<template>
  <div>
    <article>
      <div>{{ title }}</div>
      <div @click="selectOption">
        <input
          :type="typeVal"
          :placeholder="placeholderName"
          :maxlength="typeVal && typeVal === 'tel' ? maxLength : ''"
          v-model="newValue"
          @input="inputFun"
          readonly="true"
        />
      </div>
    </article>
    <KuMask v-if="isVisible"></KuMask>
    <div class="area-panel">
      <nut-actionsheet
        :is-visible="isVisible"
        @close="switchActionSheet"
        :menu-items="menuItems"
        @choose="chooseItem"
      ></nut-actionsheet>
    </div>
  </div>
</template>

<script>
import KuMask from "./mask";
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
    isReadonly: {
      type: Boolean,
      required: false
    },
    keyName: {
      type: String,
      required: false
    },
    menuItems: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      sex: "请选择",
      isVisible: false
    };
  },
  components: {
    KuMask
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
  created() {},
  methods: {
    inputFun() {
      this.$emit("inputFun");
    },

    switchActionSheet() {
      this.isVisible = !this.isVisible;
    },

    chooseItem(itemParams) {
      this.newValue = itemParams.name;
      this.$emit("menuFun");
    },

    selectOption() {
      this.isVisible = true;
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
  div:last-child {
    background: url(../../assets/imgs/go-icon.png) no-repeat;
    background-position: right;
    background-size: 30px 30px;
    padding-right: 40px;
    line-height: 0px;
    margin-top: 20px;
  }
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
}
article div:first-child {
  font-family: PingFangSC-Regular;
  font-size: 26px;
  color: #5b5e66;
  letter-spacing: 0;
}
.area-panel {
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  z-index: 10002;
}
input {
  pointer-events: none;
}
</style>
