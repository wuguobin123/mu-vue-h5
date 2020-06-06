<template>
  <div class="wrapper">
    <template v-if="code == 10002">
      <img src="../../assets/imgs/result-icon.png" class="statusIco" />
      <p class="applyStatus">融资申请审核通过，请您确认融资信息</p>
    </template>
    <template v-if="code == 10001">
      <img src="../../assets/imgs/clock-icon.png" class="statusIco" />
      <p class="applyStatus">融资申请审核中，请您耐心等待</p>
    </template>
    <template v-if="code == 10003">
      <img src="../../assets/imgs/clock-icon.png" class="statusIco" />
      <p class="applyStatus">未在申请时效内完成流程，申请已过期</p>
    </template>
    <div class="process">
      <h3 class="title">融资申请流程：</h3>
      <ul class="timeline">
        <li>
          <div class="examine">
            <i></i>
            <h4>融资申请审核</h4>
          </div>
        </li>
        <li>
          <div class="confirm">
            <i></i>
            <h4>融资信息确认</h4>
          </div>
        </li>
        <li>
          <div class="loan">
            <i></i>
            <h4>款项发放</h4>
          </div>
        </li>
      </ul>
    </div>
    <template v-if="code != 10003">
      <h3 class="title">应收账款信息：</h3>
      <KuCell :label="'2020年3月'">
        <div slot="desc">
          <nut-price :price="1010" :needSymbol="false" :thousands="true" />
        </div>
      </KuCell>
      <KuCell :label="'2020年4月'">
        <div slot="desc">
          <nut-price :price="1010" :needSymbol="false" :thousands="true" />
        </div>
      </KuCell>
    </template>
    <kuButton
      v-if="code == 10002"
      @btnFun="handleSubmit"
      btnName="确认融资信息"
      :isClick="isClickForBtn"
      :isFixed="true"
    ></kuButton>
  </div>
</template>

<script>
/**@params  code
 * 10001: 审核中
 * 10002: 审核通过，请您确认融资信息
 * 10003: 申请已过期
 */
import KuCell from "../../components/kuui/cell";
import KuButton from "../../components/kuui/button";
export default {
  components: {
    KuCell,
    KuButton
  },
  props: {},
  data() {
    return {
      code: "",
      isClickForBtn: true
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSubmit() {}
  },
  created() {
    this.code = this.$route.params.code;
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 105px 64px 120px;
  .statusIco {
    display: block;
    width: 105px;
    height: 105px;
    margin: 0 auto 66px;
  }
  .applyStatus {
    font-size: 30px;
    color: #303236;
    letter-spacing: 0;
    text-align: center;
  }
  .process {
    margin-top: 108px;
    margin-bottom: 58px;
  }
  .title {
    font-size: 28px;
    color: #303236;
    letter-spacing: 0;
    padding-bottom: 38px;
  }
  .timeline {
    display: flex;
    justify-content: center;
    li {
      display: flex;
      justify-content: center;
      &::after {
        content: "";
        width: 54px;
        height: 2px;
        background: #4f82f9;
        position: relative;
        top: 20px;
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
      i {
        display: inline-block;
        width: 50px;
        height: 50px;
        margin-bottom: 18px;
      }
      div {
        text-align: center;
      }
      .examine i {
        background: url("../../assets/imgs/examine-icon.png");
        background-size: 100%;
      }
      .confirm i {
        background: url("../../assets/imgs/confirm-icon.png");
        background-size: 100%;
      }
      .loan i {
        background: url("../../assets/imgs/loan-icon.png");
        background-size: 100%;
      }
      h4 {
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #303136;
        letter-spacing: 0;
        text-align: center;
      }
    }
  }
}
</style>
