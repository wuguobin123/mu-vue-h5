import request from "../utils/request";

export let saveUserOperatorType = async params => {
  return (
    await request({
      url: "/supplychain/userAudit/saveUserOperatorType",
      method: "POST",
      data: params
    })
  ).data;
};

export let getUserOperator = async () => {
  return (
    await request({
      url: "/supplychain/userAudit/getUserOperator",
      method: "GET"
    })
  ).data;
};

export let getUserOperatorType = async () => {
  return (
    await request({
      url: "/supplychain/userAudit/getUserOperatorType",
      method: "GET"
    })
  ).data;
};

export let getUserAuditInfo = async () => {
  return (
    await request({
      url: "/supplychain/userAudit/getUserAuditInfo",
      method: "GET"
    })
  ).data;
};

export let getUserEnterprise = async () => {
  return (
    await request({
      url: "/supplychain/userAudit/getUserEnterprise",
      method: "GET"
    })
  ).data;
};

export let getUserEnterpriseLegal = async () => {
  return (
    await request({
      url: "/supplychain/userAudit/getUserEnterpriseLegal",
      method: "GET"
    })
  ).data;
};

export let saveUserEnterprise = async params => {
  return (
    await request({
      url: "/supplychain/userAudit/saveUserEnterprise",
      method: "POST",
      data: params
    })
  ).data;
};

export let saveUserEnterpriseLegal = async params => {
  return (
    await request({
      url: "/supplychain/userAudit/saveUserEnterpriseLegal",
      method: "POST",
      data: params
    })
  ).data;
};

export let saveUserOperator = async params => {
  return (
    await request({
      url: "/supplychain/userAudit/saveUserOperator",
      method: "POST",
      data: params
    })
  ).data;
};

export let getIdentityAuthInfoResp = async params => {
  return (
    await request({
      url: "/supplychain/userAudit/getIdentityAuthInfoResp",
      method: "GET",
      data: params
    })
  ).data;
};

export let userAuditSubmit = async params => {
  return (
    await request({
      url: "/supplychain/userAudit/userAuditSubmit",
      method: "POST",
      data: params
    })
  ).data;
};
