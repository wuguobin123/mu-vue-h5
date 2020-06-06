import { multiply } from "../utils/tool";

export let calculate = {
  methods: {
    maxLoanMoneyUsable(accountsReceivable, amountUsable) {
      if (
        parseFloat(multiply(accountsReceivable, 0.8)) > parseFloat(amountUsable)
      ) {
        return amountUsable;
      } else {
        return multiply(accountsReceivable, 0.8);
      }
    }
  }
};
