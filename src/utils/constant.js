//1:待提交，2：审核中，3：审核通过，4：审核未通过
export let getAccountStateText = stateValue => {
  let text = "";
  switch (stateValue) {
    case 1:
      text = "待提交";
      break;
    case 2:
      text = "审核中";
      break;
    case 3:
      text = "审核通过";
      break;
    case 4:
      text = "审核未通过";
      break;
    default:
      text = "";
      break;
  }
  return text;
};
