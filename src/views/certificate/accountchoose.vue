<template>
  <div class="outer-layout">
    <p>请确认企业法人是否是本账户的操作人</p>
    <section>
      <div
        v-for="item in items"
        :key="item.index"
        @click="selectAccount(item.index)"
        :class="[item.isSelected ? 'selected' : '']"
      >
        {{ item.btnName }}
      </div>
    </section>
    <KuButton
      btnName="下一步"
      :isClick="true"
      :isFixed="true"
      @btnFun="certificate"
    >
      <p class="intro">
        产品申请各环节需要使用操作人相关信息做验证，请谨慎选择
      </p>
    </KuButton>
  </div>
</template>

<script>
import KuButton from "../../components/kuui/button";
import {
  saveUserOperatorType,
  getUserOperatorType
} from "../../services/certificate";
export default {
  data() {
    return {
      items: [
        {
          index: 1,
          btnName: "是",
          isSelected: true
        },
        {
          index: 2,
          btnName: "否",
          isSelected: false
        }
      ]
    };
  },
  components: {
    KuButton
  },
  created() {
    this.initAccountType();
  },
  methods: {
    initAccountType() {
      getUserOperatorType().then(res => {
        let { code, data } = res;
        if ("0" === code) {
          if (data) {
            this.selectAccount(data);
          }
        }
      });
    },
    certificate() {
      let items = this.items;
      let results = items.filter(item => {
        return item.isSelected;
      });
      let index = results.length > 0 && results[0]["index"];
      saveUserOperatorType({ operatorType: index }).then(res => {
        let { code } = res;
        if ("0" === code) {
          this.$router.push({
            path: "/certificate/infolist"
          });
        }
      });
    },
    selectAccount(index) {
      let items = this.items;
      items.forEach(item => {
        item.isSelected = false;
      });
      items[index - 1]["isSelected"] = true;
    }
  }
};
</script>

<style lang="scss" scoped>
$font-name: PingFangSC-Medium;
.outer-layout {
  padding: 394px 64px 0px 64px;
  p {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #303236;
    letter-spacing: 0;
    margin-bottom: 38px;
  }
  section {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    div {
      width: 292px;
      height: 82px;
      border-radius: 6px;
      font-family: PingFangSC-Medium;
      font-size: 30px;

      letter-spacing: 0;
      text-align: center;
      line-height: 82px;
    }
    div {
      border: 2px solid #c8cbd1;
      color: #c8cbd1;
    }
  }
  .selected {
    border: 2px solid #5888f5;
    color: #5888f5;
  }
  .intro {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #666666;
  }
}
</style>
