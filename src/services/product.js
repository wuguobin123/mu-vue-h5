import request from "../utils/request";

export let getProducts = async () => {
  return (
    await request({
      url: "/supplychain/product/getList",
      method: "POST"
    })
  ).data;
};

export let getProductDetail = async params => {
  return (
    await request({
      url: "/supplychain/product/detail",
      method: "GET",
      params
    })
  ).data;
};
