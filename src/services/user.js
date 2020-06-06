import request from "../utils/request";

export let sendSmsCodeForReg = async params => {
  return (
    await request({
      url: "/supplychain/account/sendSmsCodeForReg",
      method: "POST",
      data: params
    })
  ).data;
};

export let validateSmsCodeForReg = async params => {
  return (
    await request({
      url: "supplychain/account/validateSmsCodeForReg",
      method: "POST",
      data: params
    })
  ).data;
};

export let register = async params => {
  return (
    await request({
      url: "/supplychain/account/reg",
      method: "POST",
      data: params
    })
  ).data;
};

export let sendSmsCodeForLogin = async params => {
  return (
    await request({
      url: "/supplychain/account/sendSmsCodeForLogin",
      method: "POST",
      data: params
    })
  ).data;
};

export let loginWithSmsCode = async params => {
  return (
    await request({
      url: "/supplychain/account/loginWithSmsCode",
      method: "POST",
      data: params
    })
  ).data;
};

export let loginWithPwd = async params => {
  return (
    await request({
      url: "/supplychain/account/loginWithPwd",
      method: "POST",
      data: params
    })
  ).data;
};

export let setPwd = async params => {
  return (
    await request({
      url: "supplychain/account/setPwd",
      method: "POST",
      data: params
    })
  ).data;
};

export let accountState = async () => {
  return (
    await request({
      url: "supplychain/account/accountState",
      method: "GET"
    })
  ).data;
};

export let agreeRegistration = async params => {
  return (
    await request({
      url: "supplychain/account/agreeRegistration",
      method: "POST",
      data: params
    })
  ).data;
};

export let coreEnterpriseNoCheck = async params => {
  return (
    await request({
      url: "supplychain/account/coreEnterpriseNoCheck",
      method: "GET",
      params
    })
  ).data;
};

export let faceValidate = async (params, type) => {
  return (
    await request({
      url: "supplychain/account/faceValidate?identityType=" + type,
      method: "POST",
      data: params,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  ).data;
};
