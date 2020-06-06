import store from "../store";

export let isLogin = () => {
  let token = store.state.user.token;
  return token ? true : false;
};
