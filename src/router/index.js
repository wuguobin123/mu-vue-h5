import Vue from "vue";
import VueRouter from "vue-router";
import { isLogin } from "../utils/authority";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/user/login",
    meta: {
      title: "供应链金融"
    }
  },
  {
    path: "/user",
    name: "user",
    component: { render: h => h("router-view") },
    children: [
      {
        path: "/user/login",
        name: "login",
        meta: {
          title: "登录"
        },
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        meta: {
          title: "注册"
        },
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/register.vue")
      },
      {
        path: "/user/setpassword",
        name: "setpassword",
        meta: {
          title: "密码设置"
        },
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/setpassword.vue")
      },
      {
        path: "/user/input",
        name: "input",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/inputCom.vue")
      }
    ]
  },
  {
    path: "/certificate",
    name: "certificate",
    component: { render: h => h("router-view") },
    children: [
      {
        path: "/certificate/account",
        name: "account",
        meta: {
          title: "账户选择"
        },
        component: () =>
          import(
            /* webpackChunkName: "certificate" */ "../views/certificate/accountchoose.vue"
          )
      },
      {
        path: "/certificate/verify",
        name: "verify",
        meta: {
          title: "审核中"
        },
        component: () =>
          import(
            /* webpackChunkName: "certificate" */ "../views/certificate/auditbefore.vue"
          )
      },
      {
        path: "/certificate/audit",
        name: "audit",
        meta: {
          title: "审核中"
        },
        component: () =>
          import(
            /* webpackChunkName: "certificate" */ "../views/certificate/auditing.vue"
          )
      },
      {
        path: "/certificate/company",
        name: "company",
        meta: {
          title: "企业信息"
        },
        component: () =>
          import(
            /* webpackChunkName: "certificate" */ "../views/certificate/companyinfo.vue"
          )
      },
      {
        path: "/certificate/face",
        name: "face",
        meta: {
          title: "人脸识别"
        },
        component: () =>
          import(
            /* webpackChunkName: "certificate" */ "../views/certificate/faceidentify.vue"
          )
      },
      {
        path: "/certificate/infolist",
        name: "infolist",
        meta: {
          title: "信息列表"
        },
        component: () =>
          import(
            /* webpackChunkName: "certificate" */ "../views/certificate/infolist.vue"
          )
      },
      {
        path: "/certificate/legal",
        name: "legal",
        meta: {
          title: "法人信息"
        },
        component: () =>
          import(
            /* webpackChunkName: "certificate" */ "../views/certificate/legalpersoninfo.vue"
          )
      },
      {
        path: "/certificate/operator",
        name: "operator",
        meta: {
          title: "操作人信息"
        },
        component: () =>
          import(
            /* webpackChunkName: "certificate" */ "../views/certificate/operatorinfo.vue"
          )
      }
    ]
  },
  {
    path: "/loan",
    name: "finance",
    component: { render: h => h("router-view") },
    children: [
      {
        path: "/loan/open",
        name: "open",
        meta: {
          title: "开通企业电子账户"
        },
        component: () =>
          import(/* webpackChunkName: "loan" */ "../views/loan/openaccount.vue")
      },
      {
        path: "/loan/amount",
        name: "amount",
        meta: {
          title: "开通企业电子账户"
        },
        component: () =>
          import(/* webpackChunkName: "loan" */ "../views/loan/amount.vue")
      },
      {
        path: "/loan/result",
        name: "loanresult",
        meta: {
          title: "开通结果"
        },
        component: () =>
          import(/* webpackChunkName: "loan" */ "../views/loan/openresult.vue")
      },
      {
        path: "/loan/apply",
        name: "apply",
        meta: {
          title: "融资申请"
        },
        component: () =>
          import(/* webpackChunkName: "loan" */ "../views/loan/loanapply.vue")
      },
      {
        path: "/loan/audit/:code",
        name: "loanaudit",
        meta: {
          title: "融资记录"
        },
        component: () =>
          import(/* webpackChunkName: "loan" */ "../views/loan/audit.vue")
      },
      {
        path: "/loan/confirm",
        name: "confirm",
        meta: {
          title: "确认融资信息"
        },
        component: () =>
          import(/* webpackChunkName: "loan" */ "../views/loan/confirm.vue")
      },
      {
        path: "/loan/applyresult",
        name: "applyresult",
        meta: {
          title: "融资申请"
        },
        component: () =>
          import(/* webpackChunkName: "loan" */ "../views/loan/applyresult.vue")
      },
      {
        path: "/loan/detail/:type",
        name: "loandetail",
        meta: {
          title: "融资详情"
        },
        component: () =>
          import(/* webpackChunkName: "loan" */ "../views/loan/loandetail.vue")
      },
      {
        path: "/loan/record",
        name: "record",
        meta: {
          title: "融资记录"
        },
        component: () =>
          import(/* webpackChunkName: "loan" */ "../views/loan/loanrecord.vue")
      }
    ]
  },
  {
    path: "/userproduct",
    name: "userproduct",
    redirect: "/userproduct/list",
    component: resolve => require(["../views/product/index.vue"], resolve),
    children: [
      {
        path: "/userproduct/list",
        name: "list",
        meta: {
          title: "产品列表"
        },
        component: () =>
          import(
            /* webpackChunkName: "userproduct" */ "../views/product/productlist.vue"
          )
      },
      {
        path: "/userproduct/center",
        name: "center",
        meta: {
          title: "个人中心"
        },
        component: () =>
          import(
            /* webpackChunkName: "userproduct" */ "../views/user/usercenter.vue"
          )
      }
    ]
  },
  {
    path: "/product",
    name: "product",
    component: { render: h => h("router-view") },
    children: [
      {
        path: "/product/detail",
        name: "detail",
        meta: {
          title: "产品详情"
        },
        component: () =>
          import(
            /* webpackChunkName: "product" */ "../views/product/productdetail.vue"
          )
      },
      {
        path: "/product/myproduct",
        name: "myproduct",
        meta: {
          title: "用户产品"
        },
        component: () =>
          import(
            /* webpackChunkName: "product" */ "../views/product/productuser.vue"
          )
      },
      {
        path: "/product/empty",
        name: "empty",
        meta: {
          title: "产品维护中"
        },
        component: () =>
          import(
            /* webpackChunkName: "product" */ "../views/product/productempty.vue"
          )
      }
    ]
  },
  {
    path: "/credit",
    name: "credit",
    component: { render: h => h("router-view") },
    children: [
      {
        path: "/credit/bankinfo",
        name: "bankinfo",
        meta: {
          title: "申请人信息"
        },
        component: () =>
          import(
            /* webpackChunkName: "credit" */ "../views/credit/bankinfo.vue"
          )
      },
      {
        path: "/credit/accountinfo",
        name: "accountinfo",
        meta: {
          title: "账户信息"
        },
        component: () =>
          import(
            /* webpackChunkName: "credit" */ "../views/credit/accountinfo.vue"
          )
      },
      {
        path: "/credit/result",
        name: "result",
        meta: {
          title: "授信结果"
        },
        component: () =>
          import(/* webpackChunkName: "credit" */ "../views/credit/result.vue")
      },
      {
        path: "/credit/success",
        name: "success",
        meta: {
          title: "账户成功"
        },
        component: () =>
          import(/* webpackChunkName: "credit" */ "../views/credit/success.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (
    !isLogin() &&
    to.path !== "/user/login" &&
    to.path.indexOf("/user/register") < 0 &&
    to.path.indexOf("/user/setpassword")
  ) {
    next({
      path: "/user/login"
    });
  } else {
    next();
  }
});

export default router;
