import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Dialog,
  Picker,
  Switch,
  Button,
  Tabbar,
  Toast,
  Tab,
  TabPanel,
  Icon,
  Cell,
  Noticebar,
  Menu,
  Actionsheet,
  TextInput,
  Price,
  Popup,
  SearchBar,
  slider
} from "@nutui/nutui";
import "./assets/rem";
Dialog.install(Vue);
Picker.install(Vue);
Switch.install(Vue);
Button.install(Vue);
Tabbar.install(Vue);
Toast.install(Vue);
Tab.install(Vue);
TabPanel.install(Vue);
Icon.install(Vue);
Cell.install(Vue);
Noticebar.install(Vue);
Menu.install(Vue);
Actionsheet.install(Vue);
TextInput.install(Vue);
Price.install(Vue);
Popup.install(Vue);
SearchBar.install(Vue);
slider.install(Vue);

Vue.config.productionTip = false;

let vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export default vue;
