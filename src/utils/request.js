import axios from "axios";
import store from "../store";
import apiUrl from "../config/baseUrl";
import router from "../router";
import { Toast } from "@nutui/nutui";
import Vue from "../main";

axios.defaults.timeout = 10000;
axios.defaults.baseURL = apiUrl;

axios.interceptors.request.use(config => {
  config.headers.common["token"] = store.state.user.token;
  return config;
});

function request(options) {
  let loading = Toast.loading("加载中...");
  return axios(options)
    .then(res => {
      loading.hide();
      const { msg } = res.data;
      if (res.data.code && res.data.code !== "0") {
        Toast.text(msg);
      }
      return res;
    })
    .catch(error => {
      loading.hide();
      if (error.response && error.response.status === 401) {
        Vue.$dialog({
          title: "当前用户登录信息已失效，请重新登录",
          okBtnTxt: "重新登录",
          closeBtn: false,
          onOkBtn() {
            if (window.location.pathname !== "/user/login") {
              localStorage.setItem(
                "loginInfo",
                JSON.stringify({
                  status: false,
                  token: ""
                })
              );
              router.replace({
                path: "/user/login",
                query: {
                  redirect: window.location.href
                }
              });
            }
            this.close();
          }
        });
      } else if (error.response && error.response.status === 404) {
        Toast.text("该请求不存在");
      } else {
        Toast.text("网络异常");
      }
      return Promise.reject(error);
    });
}

export default request;
