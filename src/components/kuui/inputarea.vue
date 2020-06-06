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
          readonly="readonly"
        />
      </div>
    </article>
    <KuMask v-if="isVisible"></KuMask>
    <div class="area-panel">
      <nut-picker
        :is-visible="isVisible"
        title="请选择城市"
        :list-data="listData"
        :default-value-data="defaultValueData"
        @close="switchPicker('isVisible')"
        @confirm="setChooseValue"
        @choose="updateChooseValue"
        @close-update="closeUpdateChooseValue"
      ></nut-picker>
    </div>
  </div>
</template>

<script>
import area from "../../assets/data/area";
import provinces from "../../assets/data/province";
import city from "../../assets/data/city";
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
    }
  },
  data() {
    return {
      city: null,
      isVisible: false,
      data: city,
      dataSub: area,
      listData: [provinces],
      defaultValueData: null,
      fontSize: document.documentElement.style.fontSize
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
  created() {
    this.listData = [
      ...[this.listData[0]],
      this.data[this.listData[0][0]],
      this.dataSub[this.data[this.listData[0][0]][0]]
    ];
  },
  methods: {
    inputFun() {
      this.$emit("inputFun");
    },
    selectOption() {
      this.isVisible = true;
      document.documentElement.style.fontSize = 37.5 + "px";
    },
    switchPicker(param) {
      document.documentElement.style.fontSize = this.fontSize;
      this[`${param}`] = !this[`${param}`];
    },
    setChooseValue(chooseData) {
      this.$emit("menuFun");
      this.newValue = `${chooseData[0]}-${chooseData[1]}${
        chooseData[2] ? "-" + chooseData[2] : ""
      }`;
    },
    updateLinkage(self, value, index, chooseValue, cacheValueData) {
      if (!value) {
        return false;
      }
      switch (index) {
        case 1: {
          let i = this.listData[0].indexOf(value);
          this.listData.splice(index, 1, [...this.data[this.listData[0][i]]]);
          chooseValue = chooseValue ? chooseValue : this.listData[index][0];
          self && self.updateChooseValue(self, index, chooseValue);
          this.updateLinkage(
            self,
            chooseValue,
            2,
            cacheValueData && cacheValueData[2] ? cacheValueData[2] : null
          );
          break;
        }
        case 2: {
          let areaData = this.dataSub[value] ? this.dataSub[value] : [];
          this.listData.splice(index, 1, [...areaData]);
          chooseValue = chooseValue ? chooseValue : this.listData[index][0];
          self && self.updateChooseValue(self, index, chooseValue);
          break;
        }
      }
    },
    updateChooseValue(self, index, value) {
      index < 2 && this.updateLinkage(self, value, index + 1, null);
    },
    closeUpdateChooseValue(self, chooseData) {
      this.updateLinkage(self, chooseData[0], 1, chooseData[1], chooseData);
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
