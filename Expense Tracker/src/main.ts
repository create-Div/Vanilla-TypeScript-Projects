const moneyContainer = document.querySelector(
  ".money-container"
) as HTMLDivElement;
const balanceValue = document.querySelector(".balance") as HTMLSpanElement;
const incomeValue = document.querySelector(".income") as HTMLSpanElement;
const expenseValue = document.querySelector(".expense") as HTMLSpanElement;
const transactionsSection = document.querySelector(
  ".transactions"
) as HTMLDivElement;
const transactionForm = document.querySelector(
  ".transactions form"
) as HTMLFormElement;
const transactionInput = document.querySelector(
  "#transaction"
) as HTMLInputElement;
const amountInput = document.querySelector("#amount") as HTMLInputElement;
const submitButton = document.querySelector(
  ".transactions button"
) as HTMLButtonElement;
