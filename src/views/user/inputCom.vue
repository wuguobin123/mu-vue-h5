<template>
  <div>
    <!-- <ul>
      <KuInput
        v-for="item in formDatas"
        :key="item.index"
        :title="item.title"
        :typeVal="item.typeVal"
        :placeholderName="item.placeholderName"
        v-model="item.modelVal"
        @inputFun="monitorFun"
        @sendSms="sendSms"
      >
      </KuInput>
    </ul>-->
    <!-- <ul>
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
    </ul>-->
    <!-- <ul>
      <KuInputSelect
         v-for="item in formDatas"
        :key="item.index"
        :typeVal="item.typeVal"
        :placeholderName="item.placeholderName"
        v-model="item.modelVal"
        :keyName="item.keyName"
        :isReadonly="item.isReadOnly"
      ></KuInputSelect>
    </ul>-->
    <!-- <KuSelectDemo
     v-for="item in formDatas"
        :key="item.index"
        :typeVal="item.typeVal"
        :placeholderName="item.placeholderName"
        v-model="item.modelVal"
        :keyName="item.keyName"
        :isReadonly="item.isReadOnly"
        :title="item.title"
    
    ></KuSelectDemo>-->
    <!-- <KuSelectDemo
      v-for="item in formDatas"
      :key="item.index"
      :typeVal="item.typeVal"
      :placeholderName="item.placeholderName"
      v-model="item.modelVal"
      :keyName="item.keyName"
      :isReadonly="item.isReadOnly"
      :title="item.title"
      :menuItems="item.menuItems"
    ></KuSelectDemo>
    <kuButton
      @btnFun="login"
      btnName="登录"
      :isClick="true"
      :isFixed="false"
    ></kuButton>-->
    <!-- <nut-tabbar 
  @tab-switch="tabSwitch3" 
  :tabbar-list="tabList3" 
  :bottom="true"
>
    </nut-tabbar>-->
    <!-- <KuStatus
      :imgUrl="imgUrl"
      title="认证结果审核中"
      content="预计1个工作日内完成认证审核，审核结果将以短信通知"
    >
      <h4>请您提前准备以下影像信息</h4>
      <ul>
        <li>法人身份证正反面</li>
        <li>营业执照</li>
        <li>税务登记证</li>
        <li>企业联系人授权书</li>
      </ul>
    </KuStatus> -->
      <nut-slider class="my-range"
   v-model="val1" 
   :range="[45,90]"
   :showLabel="true" 
   :showRangeTxt="true" 

>

</nut-slider>
<span>{{val1}}</span>
  </div>
</template>

<script>
// import KuInput from "../../components/kuui/inputsms";
// import kuButton from "../../components/kuui/button";
// import KuInputClear from "../../components/kuui/inputclear";
// import KuInputSelect from "../../components/kuui/inputselect";
// // import KuSelectDemo from "../../components/kuui/inputarea";
// import KuSelectDemo from "../../components/kuui/inputsheet";
// import { formHandle } from "../../mixins/formhandle";
// import KuStatus from "../../components/kuui/status";
export default {
  // mixins: [formHandle],
  components: {
    // KuInput,
    // kuButton,
    // KuInputClear,
    // KuInputSelect,
    // KuSelectDemo
    // KuStatus
  },
  data() {
    return {
      imgUrl: "audit-icon.png",
       val1: 50,
      tabList3: [
        {
          tabTitle: "主页",
          curr: true,
          icon:
            "http://img13.360buyimg.com/uba/jfs/t1/29316/38/1115/3203/5c0f3d61E35d0c7da/9e557f2cb5c9dab6.jpg",
          activeIcon:
            "http://img20.360buyimg.com/uba/jfs/t1/9996/36/8646/4833/5c0f3d61E7c1b7e0f/c98ad61124172e93.jpg",
          href: "/userproduct/detail"
        },
        {
          tabTitle: "分类",
          curr: false,
          icon:
            "http://img12.360buyimg.com/uba/jfs/t1/25443/23/1062/4600/5c0f3d61E2e9f1360/c9b3421fe18614e2.jpg",
          activeIcon:
            "http://img20.360buyimg.com/uba/jfs/t1/19241/12/1048/8309/5c0f3d61E17ed5a56/c3af0964cade47f8.jpg",
          href: "/userproduct/center"
        },
        {
          tabTitle: "发现",
          curr: false,
          icon:
            "http://img13.360buyimg.com/uba/jfs/t1/10361/35/4713/4643/5c0f3d62E437a3c94/273fd0fb90798f03.jpg",
          activeIcon:
            "http://img14.360buyimg.com/uba/jfs/t1/26604/35/1073/7896/5c0f3d61Eb9f5f184/5f01c938abe4216d.jpg",
          href: "###"
        },
        {
          tabTitle: "购物车",
          curr: false,
          num: 2,
          icon:
            "http://img11.360buyimg.com/uba/jfs/t1/14848/18/1066/3723/5c0f41bdE9f2a38fe/e6ed6768717297fb.jpg",
          activeIcon:
            "http://img30.360buyimg.com/uba/jfs/t1/17538/16/1070/6214/5c0f41bdE4bc9a1db/74cf978e5015454b.jpg",
          href: "###"
        },
        {
          tabTitle: "我的",
          curr: false,
          icon:
            "http://img20.360buyimg.com/uba/jfs/t1/20004/20/1045/3620/5c0f3d61Eaaec1670/9e59db63983b7b9f.jpg",
          activeIcon:
            "http://img14.360buyimg.com/uba/jfs/t1/23967/14/1072/6714/5c0f3d61E0ad8991e/8f741953f6e38f15.jpg",
          href: "###"
        }
      ],
      formDatas: [
        {
          index: 0,
          title: "创建用户名",
          placeholderName: "用户名（4到20位字母和数字组合）",
          modelVal: "",
          keyName: "username",
          reg: /^(?=.*[a-z])[\w]{4,20}$/,
          errorTip: "请输入合法的用户名",
          typeVal: "text",
          clearShowFlag: false,
          isReadOnly: true,
          menuItems: [
            {
              name: "男",
              value: 0
            },
            {
              name: "女",
              value: 1
            },
            {
              name: "宝宝",
              value: "可爱"
            }
          ]
        },
        {
          index: 1,
          title: "企业名称",
          placeholderName: "企业名称（4到30位字符）",
          modelVal: "",
          keyName: "companyName",
          reg: /^.{4,30}$/,
          errorTip: "请输入合法的企业名称",
          typeVal: "text",
          clearShowFlag: false,
          isReadOnly: true
        }
      ]
    };
  },
  created() {
    /* eslint-disable */
    // this.loading = this.$toast.loading('加载中...');
    /* eslint-disable */
  },
  methods: {
    tabSwitch3: function(value, index) {
      console.log(index);
    },
    test() {
      console.log(this.formDatas);
    },
    monitorFun() {
      console.log(1111);
    },
    sendSms() {
      alert("send msg");
    },
    login() {
      // this.loading.hide();
    },
    monitorInput(keyName) {
      let item = this.getForm(keyName);
      this.resetForms();
      if (item.modelVal) {
        item.clearShowFlag = true;
      }
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
    }
  }
};
</script>

<style lang="scss" scoped>
$font-name: PingFangSC-Regular;
h4 {
  font-family: $font-name;
  font-size: 28px;
  color: #303236;
  letter-spacing: 0;
  margin: 130px 0px 47px 0px;
  span {
    font-family: $font-name;
    font-size: 28px;
    color: #5888f5;
    letter-spacing: 0;
    text-align: center;
    line-height: 40px;
    text-decoration: underline;
  }
}
ul li {
  font-family: $font-name;
  font-size: 26px;
  color: #5b5e66;
  letter-spacing: 0;
  margin-bottom: 18px;
  position: relative;
  padding-left: 20px;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 30%;
    display: table;
    width: 10px;
    height: 10px;
    background: #5888f5;
    border-radius: 50%;
  }
}
/deep/.my-range {
  margin-top: 70px;
}
</style>
