document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.getElementById("bill-input");
  const customTipInput = document.querySelector(".custom-tip-input");
  const numberOfPeopleInput = document.getElementById("number-of-people-input");
  const tipAmountValue = document.querySelector(".tip-amount-value");
  const totalValue = document.querySelector(".total-value");
  const btnReset = document.querySelector(".btn-reset");
  const selectTipBtns = document.querySelectorAll(".select-tip-percentage");

  const INITIAL_BILL = "0";
  const INITIAL_PEOPLE = "1";
  const INITIAL_TIP = 15;

  const resetInputs = () => {
    billInput.value = INITIAL_BILL;
    customTipInput.value = "";
    numberOfPeopleInput.value = INITIAL_PEOPLE;
    tipAmountValue.innerHTML = "$0";
    totalValue.innerHTML = "$0";
    resetTipButtons();
    setDefaultTip();
  };

  const resetTipButtons = () => {
    selectTipBtns.forEach((btn) => btn.classList.remove("active"));
  };

  const setDefaultTip = () => {
    selectTipBtns.forEach((btn) => {
      if (parseInt(btn.dataset.percentage) === INITIAL_TIP) {
        btn.classList.add("active");
      }
    });
  };

  const calculateTip = () => {
    const billValue = parseFloat(billInput.value) || 0;
    const numberOfPeople = parseFloat(numberOfPeopleInput.value) || 1;
    const activeTipBtn = document.querySelector(
      ".select-tip-percentage.active"
    );
    let tipPercentage = activeTipBtn
      ? parseFloat(activeTipBtn.dataset.percentage)
      : parseFloat(customTipInput.value) || 0;

    // Calculate the tip amount
    const tipAmount = ((billValue * tipPercentage) / 100).toFixed(2);

    // Calculate the total amount to be paid
    const totalAmount = (parseFloat(billValue) + parseFloat(tipAmount)).toFixed(
      2
    );

    // Calculate the tip amount per person
    const tipPerPerson = (tipAmount / numberOfPeople).toFixed(2);

    // Calculate the total amount per person
    const totalPerPerson = (totalAmount / numberOfPeople).toFixed(2);

    tipAmountValue.innerHTML = `$${tipPerPerson}`;
    totalValue.innerHTML = `$${totalPerPerson}`;
  };

  const activateTipButton = (event) => {
    resetTipButtons();
    const target = event.target.closest(".select-tip-percentage");
    if (target) target.classList.add("active");
    calculateTip();
  };

  const setupEventListeners = () => {
    btnReset.addEventListener("click", resetInputs);
    selectTipBtns.forEach((btn) =>
      btn.addEventListener("click", activateTipButton)
    );
    [billInput, customTipInput, numberOfPeopleInput].forEach((input) =>
      input.addEventListener("input", calculateTip)
    );
  };

  // Initialize
  const init = () => {
    resetInputs();
    calculateTip();
    setupEventListeners();
  };

  init();
});
