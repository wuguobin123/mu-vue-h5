<template>
  <div>
    <KuActionsheet title="用户服务协议" :isShow="isShowPro">
      <ProtocolContent></ProtocolContent>
      <template v-slot:button>
        <kuButton
          @btnFun="agreeProtocol"
          btnName="已阅读并同意"
          :isClick="true"
          :isFixed="true"
        ></kuButton>
      </template>
    </KuActionsheet>
  </div>
</template>

<script>
import ProtocolContent from "./protocol";
import KuActionsheet from "../../components/kuui/actionsheet";
import KuButton from "../../components/kuui/button";
import { accountState, agreeRegistration } from "../../services/user";
export default {
  data() {
    return {
      accountStateRes: null,
      isShowPro: false
    };
  },
  components: {
    ProtocolContent,
    KuActionsheet,
    KuButton
  },
  created() {
    this.getAccountState();
  },
  methods: {
    getAccountState() {
      accountState().then(res => {
        if ("0" === res.code) {
          this.accountStateHandle(res.data);
        }
      });
    },
    agreeProtocol() {
      agreeRegistration().then(res => {
        let { code } = res;
        if ("0" === code) {
          this.isShowPro = false;
          this.getAccountState();
        }
      });
    },
    accountStateHandle(accountStateRes) {
      let { agreeRegistration, hasPwd, auditState } = accountStateRes;
      if (2 === agreeRegistration) {
        //显示协议弹窗
        this.isShowPro = true;
        return;
      }
      if (1 === agreeRegistration && 2 === hasPwd) {
        //跳转设置密码页
        this.$router.push({
          path: "/user/setpassword",
          query: {
            from: "login"
          }
        });
        return;
      }
      if (1 === agreeRegistration && 1 === hasPwd) {
        if (1 === auditState) {
          // 跳转到身份认证
          this.$router.push({
            path: "/certificate/account"
          });
        } else if (3 === auditState) {
          //跳转到产品页
          this.$router.push({
            path: "/userproduct/list"
          });
        } else if (2 === auditState || 4 === auditState) {
          //跳转到个人中心页
          this.$router.push({
            path: "/userproduct/center"
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
