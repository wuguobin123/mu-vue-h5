<template>
  <div class="wrapper">
    <div class="accountEntry">
      <p class="title">请选择本次融资应收账款条目</p>
      <KuCheckboxGroup v-model="checkValue" @on-change="getChange">
        <KuCell v-for="item in formDatas" :key="item.index">
          <div slot="action">
            <KuCheckbox :label="item.value">{{ item.time }}</KuCheckbox>
          </div>
          <div slot="desc" class="money">
            <nut-price
              :price="item.money"
              :needSymbol="false"
              :thousands="true"
            />元
          </div>
        </KuCell>
      </KuCheckboxGroup>
      <KuCell :label="'预计本次最高可融资'" class="tips">
        <div slot="desc" class="money">
          <nut-price
            :price="maxMoney"
            :needSymbol="false"
            :thousands="true"
          />元
        </div>
      </KuCell>
      <kuButton
        @btnFun="handleSubmit"
        btnName="下一步"
        :isClick="isClickForBtn"
        :isFixed="false"
      ></kuButton>
    </div>
    <div class="accountEmpty" style="display:none">
      <img src="../../assets/imgs/collection-icon.png" class="applyStatus" />
      <p class="applyResult">
        当前不存在可抵押的应收账款，<br />
        如有疑问请联系相关工作人员
      </p>
    </div>
  </div>
</template>

<script>
import { calculate } from "../../mixins/calculate";
import { add } from "../../utils/tool";
import KuCell from "../../components/kuui/cell";
import KuCheckboxGroup from "../../components/kuui/checkboxgroup";
import KuCheckbox from "../../components/kuui/checkbox";
import KuButton from "../../components/kuui/button";
export default {
  components: {
    KuCell,
    KuCheckbox,
    KuCheckboxGroup,
    KuButton
  },
  mixins: [calculate],
  data() {
    return {
      checkValue: [],
      isClickForBtn: false,
      maxMoney: 0,
      formDatas: [
        {
          index: 0,
          value: "1",
          time: "2020年3月",
          money: 1000
        },
        {
          index: 1,
          value: "2",
          time: "2020年3月",
          money: 500
        }
      ]
    };
  },
  watch: {
    checkValue(val) {
      if (val.length > 0) {
        this.isClickForBtn = true;
      } else {
        this.isClickForBtn = false;
      }
    }
  },
  computed: {},
  methods: {
    getChange(selectedItems) {
      this.calculateMaxMoney(selectedItems);
    },
    calculateMaxMoney(selectedItems) {
      let reuslts = this.formDatas.filter(item => {
        let res = selectedItems.filter(num => {
          return item.value === num;
        });
        return res.length > 0;
      });
      let sum = 0;
      if (reuslts && reuslts.length > 0) {
        reuslts.forEach(item => {
          sum = add(sum, item.money);
        });
        this.maxMoney = this.maxLoanMoneyUsable(sum, 1000);
      } else {
        this.maxMoney = 0;
      }
    },
    handleSubmit() {
      //todo 提交选中的应收账款
      this.$router.push({
        path: "/loan/confirm"
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
$font-name: PingFangSC-Medium;
.wrapper {
  padding: 98px 30px 0;
  .title {
    font-size: 28px;
    color: #303236;
    letter-spacing: 0;
    font-family: $font-name;
    margin-bottom: 38px;
  }
  /deep/.tips {
    margin-top: 38px;
    .nut-cell-title {
      font-size: 24px;
      color: #898d99;
      letter-spacing: 0;
    }
    .nut-cell-desc .money {
      font-size: 28px;
      letter-spacing: 0;
      text-align: right;
      span {
        color: #ff5d5d;
      }
    }
  }
  .accountEmpty {
    padding-top: 30px;
    .applyStatus {
      display: block;
      width: 120px;
      height: 120px;
      margin: 0 auto 58px;
    }
    .applyResult {
      font-size: 30px;
      color: #303236;
      letter-spacing: 0;
      text-align: center;
      line-height: 46px;
    }
  }
}
</style>
