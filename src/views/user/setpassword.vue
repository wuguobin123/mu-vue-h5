<template>
  <div class="login-layout">
    <h2>设置密码</h2>
    <p>您的密码必须至少6个字符，其中包含数字、大写字母和小写字母。</p>
    <ul>
      <KuInputClear
        v-for="item in formDatas"
        :key="item.index"
        :typeVal="item.typeVal"
        :placeholderName="item.placeholderName"
        v-model="item.modelVal"
        @inputFun="monitorInput"
        @focusFun="handleClearIconWhenFocus"
        @blurFun="handleClearIconWhenBlur"
        @clearFun="clearInput"
        :keyName="item.keyName"
        :clearFlag="item.clearShowFlag"
      ></KuInputClear>
    </ul>
    <KuButton btnName="确定" :isClick="isClick" @btnFun="submitInfo"></KuButton>
    <KuDialog
      @confirmFun="okFun"
      :isVisible="dialogShowFlag"
      title="设置成功！请继续完成企业身份认证"
      btnTxt="确定"
    >
    </KuDialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import KuButton from "../../components/kuui/button";
import KuInputClear from "../../components/kuui/inputclear";
import { validateForm, validateFormIsNull } from "../../utils/tool";
import { register, setPwd } from "../../services/user";
import KuDialog from "../../components/kuui/dialog";
export default {
  components: {
    KuButton,
    KuInputClear,
    KuDialog
  },
  data() {
    return {
      formDatas: [
        {
          index: 0,
          placeholderName: "请输入密码",
          modelVal: "",
          keyName: "password",
          reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\w]{6,20}$/,
          errorTip: "请输入合法的密码",
          typeVal: "password",
          clearShowFlag: false
        },
        {
          index: 1,
          placeholderName: "请输入确认密码",
          modelVal: "",
          keyName: "confirmPassword",
          reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\w]{6,20}$/,
          errorTip: "请输入合法的密码",
          typeVal: "password",
          clearShowFlag: false
        }
      ],
      isClick: false,
      dialogShowFlag: false
    };
  },
  created() {},
  computed: {
    ...mapState("user", {
      phone: state => state.phone
    })
  },
  methods: {
    ...mapActions("user", ["setStateDatas"]),
    monitorInput(keyName) {
      let item = this.getForm(keyName);
      this.resetForms();
      if (item.modelVal) {
        item.clearShowFlag = true;
      }
      this.btnStatus();
    },
    btnStatus() {
      let result = validateFormIsNull(this.formDatas);
      this.isClick = result ? true : false;
    },
    getForm(keyName) {
      let formDatas = this.formDatas;
      let items = formDatas.filter(item => {
        return item.keyName === keyName;
      });
      return items && items[0];
    },
    resetForms() {
      let formDatas = this.formDatas;
      formDatas.forEach(item => {
        item.clearShowFlag = false;
      });
    },
    handleClearIconWhenFocus(keyName) {
      let item = this.getForm(keyName);
      this.resetForms();
      if (item.modelVal) {
        item.clearShowFlag = true;
      }
    },
    handleClearIconWhenBlur() {
      this.resetForms();
    },
    clearInput(keyName) {
      let item = this.getForm(keyName);
      this.resetForms();
      if (item.modelVal) {
        item.modelVal = "";
        item.clearShowFlag = false;
      }
      this.btnStatus();
    },
    submitInfo() {
      let error = validateForm(this.formDatas);
      if (error) {
        this.$toast.text(error);
        return;
      }
      let password = this.formDatas[0]["modelVal"];
      let passwordAgain = this.formDatas[1]["modelVal"];
      if (password !== passwordAgain) {
        this.$toast.text("两次输入的密码不一致");
        return;
      }
      let from = this.$route.query.from;
      if ("register" === from) {
        this.register(password);
      } else {
        this.setpassword(password);
      }
    },
    register(password) {
      let params = {};
      params["password"] = password;
      params["mobileNum"] = this.phone;
      register(params).then(res => {
        if ("0" === res.code) {
          this.$toast.text("注册成功");
          this.setStateDatas({
            token: res.data,
            phone: this.phone
          });
          this.dialogShowFlag = true;
        }
      });
    },
    setpassword(password) {
      setPwd({ password }).then(res => {
        if ("0" === res.code) {
          this.$router.push({
            path: "/certificate/account"
          });
        }
      });
    },
    okFun() {
      this.$router.push({
        path: "/certificate/account"
      });
      this.dialogShowFlag = false;
    }
  }
};
</script>

<style scoped lang="scss">
$font-name: PingFangSC-Medium;
.login-layout {
  padding: 20px 64px 0px;
  span {
    display: inline-block;
    width: 70px;
    height: 70px;
    background: red;
    margin: 18px 0px;
  }
  h2 {
    margin-top: 119px;
    font-family: $font-name;
    font-size: 54px;
    color: #303236;
    letter-spacing: 0;
  }

  p {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #303236;
    letter-spacing: 0;
    margin: 20px 0px 90px 0px;
    line-height: 45px;
  }
}
</style>
