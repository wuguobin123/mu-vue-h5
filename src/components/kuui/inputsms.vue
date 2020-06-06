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
            @input="inputFun"
          />
        </div>
        <div
          @click="sendMsgCode"
          :class="[
            isClick && !isCountDown ? 'undisable-click' : 'disable-click'
          ]"
        >
          {{ btnName }}
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
    btnName: {
      type: String,
      required: false
    },
    isClick: {
      type: Boolean,
      required: false
    },
    isCountDown: {
      type: Boolean,
      required: false
    },
    keyName: {
      type: String,
      required: false
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
    inputFun() {
      this.$emit("inputFun", this.keyName);
    },
    sendMsgCode() {
      this.$emit("sendSms");
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
    div:first-child {
      width: 460px;
      overflow: hidden;
    }
    div:last-child {
      width: 160px;
      height: 54px;
      border-radius: 6px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      line-height: 54px;
    }
  }
}
article div:first-child {
  font-family: PingFangSC-Regular;
  font-size: 26px;
  color: #5b5e66;
  letter-spacing: 0;
}
article section {
  margin-top: 20px;
}
.disable-click {
  background: #bccffb;
  pointer-events: none;
  disabled: disabled;
}
.undisable-click {
  background: #5888f5;
}
</style>
