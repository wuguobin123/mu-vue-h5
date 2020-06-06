<template>
  <div class="wrapper" v-if="reFresh">
    <div class="form-item">
      <label class="form-item-label">{{ title }}</label>
      <div class="cell" @click="showSelectBank">
        <span class="cell-extra text-overflow" v-if="bankName">
          {{ bankName }}
        </span>
        <span class="placeholder" v-else>{{ placeholder }}</span>
        <i class="cell-arrow"></i>
      </div>
    </div>
    <nut-popup
      v-model="showPopup"
      position="right"
      class="searchWrap"
      get-container="body"
      :style="{ width: '100%', height: '100%' }"
    >
      <div class="searchList" v-if="result && result.length > 0">
        <nut-cell
          v-for="bank in result"
          :key="bank.id"
          @click-cell="handleSelect(bank)"
        >
          <div slot="avatar" class="bank-logo">
            <img
              :src="
                'https://kfqh5.kutianxia.com/kfq/static/bank/' +
                  bank.bankCode +
                  '.png'
              "
              alt
            />
          </div>
          <span slot="title">{{ bank.bankName }}</span>
        </nut-cell>
      </div>
      <p class="empty" v-else>没有搜到您的银行</p>
    </nut-popup>
  </div>
</template>

<script>
import { setTitle } from "../../utils/tool";
export default {
  name: "KuSelectBank",
  components: {},
  props: {
    value: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "开户行"
    },
    placeholder: {
      type: String,
      default: "请选择开户行"
    },
    banks: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      showPopup: false,
      bankName: this.value,
      result: null,
      pageTitle: "选择开户行",
      tempTitle: "",
      keyWord: "",
      loading: null,
      reFresh: true
    };
  },
  watch: {
    result() {
      this.reFresh = false;
      this.$nextTick(() => {
        this.reFresh = true;
      });
    }
  },
  computed: {},
  created() {
    this.result = this.banks;
  },
  methods: {
    showSelectBank() {
      this.tempTitle = document.title;
      this.showPopup = true;
      setTitle(this.pageTitle);
    },
    handleSelect(data) {
      this.bankName = data.bankName;
      this.showPopup = false;
      this.keyWord = "";
      setTitle(this.tempTitle);
      this.$emit("input", this.bankName);
      this.$emit("on-change", data);
    },
    handleSearch() {
      this.loading = this.$toast.loading("加载中...");
      setTimeout(() => {
        this.loading.hide();
        this.result = this.result.filter(item => {
          return item.bankName.indexOf(this.keyWord) > -1;
        });
      }, 1000);
    }
  },
  mounted() {
    // console.log(defaultBanks);
  }
};
</script>
<style lang="scss" scoped>
$font-name: PingFangSC-Medium;
/deep/ .popup-box {
  z-index: 100002;
}
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal !important;
  word-break: normal !important;
}
.wrapper {
  height: 108px;
  margin-bottom: 28px;
  line-height: 0px;
  .form-item-label {
    font-size: 26px;
    line-height: 26px;
    color: #5b5e66;
    letter-spacing: 0;
  }
  .cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dfe1e4;
    padding: 15px 0 20px;
    .cell-extra {
      flex: 1;
      height: 42px;
      font-family: PingFangSC-Regular;
      font-size: 30px;
      color: #303236;
      letter-spacing: 0;
      line-height: 42px;
    }
    .placeholder {
      flex: 1;
      height: 42px;
      font-size: 30px;
      color: #c8cbd1;
      letter-spacing: 0;
      line-height: 42px;
    }
    .cell-arrow {
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url("../../assets/imgs/arrow.png");
      background-size: 100%;
    }
  }
}
.searchWrap {
  background: #fff;
  .searchform {
    position: fixed;
    width: 100%;
    padding: 20px 30px;
    background: #fff;
    box-sizing: border-box;
    .searchInco {
      display: inline-block;
      width: 46px;
      height: 46px;
      background: url("../../assets/imgs/search.png");
      background-size: 100%;
    }
    .searchInput {
      position: relative;
      display: flex;
      background: #f6f6f7;
      border-radius: 8px;
      padding: 15px 20px;
      justify-content: space-between;
      align-items: center;
      .input {
        flex: 1;
        padding: 12px 60px 12px 20px;
        background: #f6f6f7;
        font-size: 30px;
        text-align: left;
      }
      .button {
        width: 88px;
        height: 50px;
        background: #5888f5;
        border-radius: 6px;
        border-radius: 6px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #ffffff;
        text-align: center;
      }
      .clearable {
        display: inline-block;
        width: 30px;
        height: 30px;
        background: url("../../assets/imgs/clear-icon.png");
        background-size: 100%;
        position: absolute;
        right: 130px;
      }
    }
  }
  .searchList {
    padding: 20px 30px 0;
    /deep/.nut-cell {
      border-bottom: 1px solid #eff1f5;
      background: none;
      .nut-cell-box {
        padding: 18px 0;
        background: none;
      }
      .nut-cell-title {
        font-size: 26px;
        color: #5b5e66;
      }
      .nut-cell-sub-title {
        font-size: 22px;
        color: #929599;
        letter-spacing: 0;
      }
    }
    .bank-logo {
      width: 50px;
      height: 50px;
      padding-right: 20px;
      img {
        width: 100%;
      }
    }
  }
  .empty {
    width: 100%;
    font-size: 24px;
    color: #898d99;
    letter-spacing: 0;
    text-align: center;
    margin: 20px 0;
    padding-top: 120px;
  }
}
</style>
