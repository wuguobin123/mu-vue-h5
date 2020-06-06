<template>
  <div>
    <router-view></router-view>
    <section class="btn-options">
      <router-link
        :to="item.href ? item.href : ''"
        v-for="item in btnOptions"
        :key="item.index"
      >
        <div
          :class="[item.isSelected ? 'selected-tab' : 'no-select-tab']"
          @click="chooseOption(item.index)"
        >
          <b>{{ item.btnName }}</b>
          <span v-show="item.isSelected"></span>
        </div>
      </router-link>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnOptions: [
        {
          index: 1,
          btnName: "融资产品",
          isSelected: true,
          href: "/userproduct/list"
        },
        {
          index: 2
        },
        {
          index: 3,
          btnName: "用户中心",
          isSelected: false,
          href: "/userproduct/center"
        }
      ]
    };
  },
  watch: {
    btnOptions: {
      handler(newValue) {
        this.btnOptions = newValue;
      },
      deep: true
    },
    $route(to) {
      let curUrl = to.path;
      this.selectedOption(curUrl);
    }
  },
  created() {
    let curUrl = this.$route.path;
    this.selectedOption(curUrl);
  },
  methods: {
    selectedOption(curUrl) {
      let results = this.btnOptions.map(item => {
        if (curUrl.indexOf(item.href) > -1) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
        return item;
      });
      this.btnOptions = results;
    },
    chooseOption(type) {
      if (type % 2 === 0) {
        return;
      }
      let results = this.btnOptions.map(item => {
        if (type === item.index) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
        return item;
      });
      this.btnOptions = results;
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-options {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  width: 750px;
  height: 97px;
  border-top: 1px solid #e1e2e6;
  position: fixed;
  left: 0px;
  bottom: 0px;
  background: #fff;
  font-family: PingFangSC-Medium;
  a:nth-child(odd) {
    div {
      width: 374px;
      line-height: 97px;

      position: relative;
    }
  }
  a:nth-child(even) {
    div {
      height: 40px;
      border-right: 2px solid #e1e2e6;
    }
  }
  span {
    display: inline-block;
    width: 60px;
    height: 6px;
    background: #5888f5;
    position: absolute;
    left: 50%;
    margin-left: -30px;
    bottom: 0px;
  }
  .selected-tab {
    color: #5888f5;
    font-size: 30px;
    letter-spacing: 0;
    text-align: center;
  }
  .no-select-tab {
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #bbc1d1;
    letter-spacing: 0;
    text-align: center;
  }
}
</style>
