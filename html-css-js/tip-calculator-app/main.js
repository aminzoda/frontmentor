document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.getElementById("bill-input");
  const customTipInput = document.querySelector(".custom-tip-input");
  const numberOfPeopleInput = document.getElementById("number-of-people-input");
  const tipAmountValue = document.querySelector(".tip-amount-value");
  const totalValue = document.querySelector(".total-value");
  const btnReset = document.querySelector(".btn-reset"); // Corrected class name
  const selectTipBtns = document.querySelectorAll(".select-tip-percentage");

  btnReset.addEventListener("click", (event) => {
    // Reset the inputs and value
    billInput.value = "0";
    customTipInput.value = "";
    numberOfPeopleInput.value = "1"; // Assuming "1" is the intended default value
    tipAmountValue.innerHTML = "$0";
    totalValue.innerHTML = "$0";

    // Reset the tip percentage btns
    selectTipBtns.forEach((tipBtn) => {
      tipBtn.classList.remove("active");
    });

    // Set 15% as the default tip percentage
    selectTipBtns[2].classList.add("active");
  });

  // Make the tip percentage btns clickable
  selectTipBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      selectTipBtns.forEach((tipBtn) => {
        tipBtn.classList.remove("active");
      });

      if (event.target.classList.contains("custom-tip-input")) {
        event.target.parentElement.classList.add("active");
      } else {
        event.target.classList.add("active");
      }

      calculateTip();
    });
  });

  const calculateTip = () => {
    const billValue = parseFloat(billInput.value);
    const numberOfPeople = parseFloat(numberOfPeopleInput.value);
    const customTipActive = document.querySelector(".select-tip-custom.active");
    let tipPercentage = parseInt(
      document.querySelector(".select-tip-percentage.active").dataset.percentage
    );

    if (customTipActive) {
      tipPercentage = parseFloat(
        document.querySelector(".custom-tip-input").value
      );
    }
    const totalAmount = parseFloat((tipPercentage / 100) * billValue).toFixed(
      2
    );
    const tipAmount = parseFloat(totalAmount / numberOfPeople);

    tipAmountValue.innerHTML = `$${tipAmount}`;
    totalValue.innerHTML = `$${totalAmount}`;
  };

  billInput.addEventListener("keyup", (event) => {
    calculateTip();
  });
  customTipInput.addEventListener("keyup", (event) => {
    calculateTip();
  });
  numberOfPeopleInput.addEventListener("keyup", (event) => {
    calculateTip();
  });
});
