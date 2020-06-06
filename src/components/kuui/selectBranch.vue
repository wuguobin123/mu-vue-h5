<template>
  <div class="wrapper">
    <div class="form-item">
      <label class="form-item-label">{{ title }}</label>
      <div class="cell" @click="showSelectBranch">
        <span class="cell-extra text-overflow" v-if="branchName">{{
          branchName
        }}</span>
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
      <div class="searchform">
        <div class="searchInput">
          <i class="searchInco"></i>
          <input type="text" class="input" v-model="keyWord" />
          <i class="clearable" v-if="keyWord" @click="keyWord = null"></i>
          <button type="button" class="button" @click="handleSearch">
            搜索
          </button>
        </div>
      </div>
      <div class="searchList" v-if="result && result.length > 0">
        <nut-cell
          v-for="item in result"
          :key="item.id"
          @click-cell="handleSelect(item)"
        >
          <span slot="title">{{ item.branchName }}</span>
          <span slot="sub-title">{{ item.code }}</span>
        </nut-cell>
      </div>
      <p class="empty" v-else>如无法选择准确的网点，建议尝试选择同城任一网点</p>
    </nut-popup>
  </div>
</template>
<script>
import { setTitle } from "../../utils/tool";
export default {
  name: "KuSelectBranch",
  components: {},
  props: {
    value: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "开户网点"
    },
    placeholder: {
      type: String,
      default: "请选择开户网点"
    }
  },
  data() {
    return {
      showPopup: false,
      branchName: this.value,
      result: [
        {
          id: "0",
          branchName: "中国工商银行股份有限公司三里屯分行",
          code: "102331000014"
        },
        {
          id: "1",
          branchName: "中国工商银行股份有限公司浙江省分行",
          code: "102331000014"
        },
        {
          id: "2",
          branchName: "中国工商银行股份有限公司北京分行",
          code: "102331000014"
        },
        {
          id: "3",
          branchName: "中国工商银行股份有限公司上地支行",
          code: "102331000014"
        },
        {
          id: "4",
          branchName: "中国工商银行股份有限公司通州支行",
          code: "102331000014"
        },
        {
          id: "5",
          branchName: "中国工商银行股份有限公司王府井支行",
          code: "102331000014"
        },
        {
          id: "6",
          branchName: "中国工商银行股份有限公司南苑支行",
          code: "102331000014"
        },
        {
          id: "7",
          branchName: "中国工商银行股份有限公司南中轴线路支行",
          code: "102331000014"
        },
        {
          id: "8",
          branchName: "中国工商银行股份有限公司北京市分行营业部",
          code: "102331000014"
        },
        {
          id: "9",
          branchName: "中国工商银行股份有限公司北京安定门支行",
          code: "102331000014"
        },
        {
          id: "10",
          branchName: "中国工商银行股份有限公司北京菜市口支行",
          code: "102331000014"
        }
      ],
      pageTitle: "选择分支行",
      tempTitle: "",
      keyWord: "",
      loading: null
    };
  },
  watch: {},
  computed: {},
  methods: {
    showSelectBranch() {
      this.tempTitle = document.title;
      this.showPopup = true;
      setTitle(this.pageTitle);
    },
    handleSelect(data) {
      this.branchName = data.branchName;
      this.$emit("input", this.branchName);
      this.showPopup = false;
      this.keyWord = "";
      setTitle(this.tempTitle);
      this.$emit("on-change", data);
    },
    handleSearch() {
      this.loading = this.$toast.loading("加载中...");
      setTimeout(() => {
        this.loading.hide();
        this.result = this.result.filter(item => {
          return item.branchName.indexOf(this.keyWord) > -1;
        });
      }, 1000);
    }
  },
  created() {},
  mounted() {}
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
    color: #5b5e66;
    letter-spacing: 0;
    line-height: 26px;
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
      display: flex;
      background: #f6f6f7;
      border-radius: 8px;
      padding: 15px 20px;
      justify-content: space-between;
      align-items: center;
      .input {
        flex: 1;
        height: 26px;
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
    }
  }
  .searchList {
    padding: 110px 30px 0;
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
