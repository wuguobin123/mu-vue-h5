const state = JSON.parse(localStorage.getItem("loginInfo"))
  ? JSON.parse(localStorage.getItem("loginInfo"))
  : {
      token: "",
      phone: ""
    };

const actions = {
  setStateDatas({ commit }, payload) {
    commit("changeLoginStatus", payload);
  }
};

const mutations = {
  changeLoginStatus(state, payload) {
    state.token = payload.token;
    state.phone = payload.phone;
    localStorage.setItem("loginInfo", JSON.stringify(state));
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
