const balanceValue = document.querySelector(".balance") as HTMLSpanElement;
const incomeValue = document.querySelector(".income") as HTMLSpanElement;
const expenseValue = document.querySelector(".expense") as HTMLSpanElement;
const historySection = document.querySelector(".history") as HTMLDivElement;

const transactionForm = document.querySelector(
  ".transactions form"
) as HTMLFormElement;
const transactionInput = document.querySelector(
  "#transaction"
) as HTMLInputElement;

let balanceTotal = 0;
let incomeTotal = 0;
let expenseTotal = 0;

function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

function createTransaction(text: string, value: number) {
  const transactionEl = document.createElement("div");
  const formattedAmount =
    value < 0 ? `-${formatCurrency(Math.abs(value))}` : formatCurrency(value);
  transactionEl.innerHTML = `<span>${text}</span> <span>${formattedAmount}</span>`;
  transactionEl.classList.add("transaction");
  if (value < 0) {
    transactionEl.classList.add("transaction--expense");
  } else if (value > 0) {
    transactionEl.classList.add("transaction--income");
  }
  historySection.append(transactionEl);
  transactionForm.reset();
  transactionInput.focus();
}

function getValues(e: SubmitEvent) {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const formData = new FormData(form);
  const transaction = formData.get("transaction");
  const rawAmount = formData.get("amount");

  if (typeof transaction !== "string" || transaction.trim() === "") {
    return;
  }

  if (typeof rawAmount !== "string" || rawAmount.trim() === "") {
    return;
  }

  const amount = Number(rawAmount);
  if (Number.isNaN(amount)) {
    return;
  }

  const trimmedTransaction = transaction.trim();

  updateBalance(amount);
  updateIncomeAndExpense(amount);
  createTransaction(trimmedTransaction, amount);
}

function sumExpenses(amount: number) {
  expenseTotal += Math.abs(amount);
  expenseValue.textContent = formatCurrency(expenseTotal);
}
function sumIncome(amount: number) {
  incomeTotal += amount;
  incomeValue.textContent = formatCurrency(incomeTotal);
}

function updateIncomeAndExpense(amount: number) {
  if (amount < 0) {
    sumExpenses(amount);
  } else if (amount > 0) {
    sumIncome(amount);
  }
}

function updateBalance(amount: number) {
  balanceTotal += amount;
  balanceValue.textContent = formatCurrency(balanceTotal);
}

transactionForm.addEventListener("submit", getValues);
