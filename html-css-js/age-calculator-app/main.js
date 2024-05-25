window.onload = function () {
  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");
  const labels = document.getElementsByTagName("label");
  const error = document.getElementsByClassName("error");
  const submitButton = document.getElementById("submit");
  const spans = document.getElementsByTagName("span");

  const date = new Date();

  let currentDay = date.getDate();
  let currentMonth = date.getMonth() + 1; // getMonth returns 0-11, so add 1
  let currentYear = date.getFullYear();

  const typeOfError = [
    "",
    "This field is required",
    "Must be a valid month",
    "Must be a valid year",
    "Must be a valid day",
    "Must be a valid date",
  ];

  const errorState = (numberOfError, typeOfDate, errorMessage, color) => {
    error[numberOfError].innerHTML = errorMessage;
    labels[numberOfError].style.color = color;
    typeOfDate.style.borderColor = color;
  };

  const isLeapYear = (day, month, year) => {
    month = month - 1;
    fullDate = new Date(year, month, day);
    if (
      day == fullDate.getDate() &&
      month == fullDate.getMonth() &&
      year == fullDate.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const substractAge = () => {
    let newYear = currentYear - year.value;
    let newMonth = currentMonth - month.value;
    let newDay = currentDay - day.value;

    // If the current month is before the birth month
    if (newMonth < 0) {
      newYear--;
      newMonth += 12;
    }

    // If the current day is before the birth day
    if (newDay < 0) {
      newMonth--;
      let daysInPreviousMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
      newDay += daysInPreviousMonth;

      // If newMonth is negative after adjustment, adjust year and month again
      if (newMonth < 0) {
        newMonth += 12;
        newYear--;
      }
    }

    spans[0].innerHTML = newYear;
    spans[1].innerHTML = newMonth;
    spans[2].innerHTML = newDay;
  };

  const isDayCorrect = () => {
    let errorCase = "";
    if (day.value == "") {
      errorCase = "empty";
    } else if (day.value <= 0 || day.value > 31) {
      errorCase = "invalidDay";
    } else if (!isLeapYear(day.value, month.value, year.value)) {
      errorCase = "invalidDate";
    } else {
      errorCase = "valid";
    }

    switch (errorCase) {
      case "empty":
        errorState(0, day, typeOfError[1], "#ff5757");
        return false;
      case "invalidDay":
        errorState(0, day, typeOfError[4], "#ff5757");
        return false;
      case "invalidDate":
        errorState(0, day, typeOfError[5], "#ff5757");
        return false;
      case "valid":
        errorState(0, day, typeOfError[0], "");
        return true;
      default:
        return false;
    }
  };

  const isMonthCorrect = () => {
    let errorCase = "";
    if (month.value == "") {
      errorCase = "empty";
    } else if (month.value <= 0 || month.value > 12) {
      errorCase = "invalidMonth";
    } else if (!isLeapYear(day.value, month.value, year.value)) {
      errorCase = "invalidDate";
    } else {
      errorCase = "valid";
    }

    switch (errorCase) {
      case "empty":
        errorState(1, month, typeOfError[1], "#ff5757");
        return false;
      case "invalidMonth":
        errorState(1, month, typeOfError[2], "#ff5757");
        return false;
      case "invalidDate":
        errorState(1, month, typeOfError[5], "#ff5757");
        return false;
      case "valid":
        errorState(1, month, typeOfError[0], "");
        return true;
      default:
        return false;
    }
  };

  const isYearCorrect = () => {
    let errorCase = "";
    if (year.value == "") {
      errorCase = "empty";
    } else if (year.value > currentYear) {
      errorCase = "futureYear";
    } else if (!isLeapYear(day.value, month.value, year.value)) {
      errorCase = "invalidDate";
    } else if (year.value == currentYear && month.value > currentMonth) {
      errorCase = "futureMonth";
    } else if (year.value == currentYear && month.value == currentMonth && day.value > currentDay) {
      errorCase = "futureDay";
    } else {
      errorCase = "valid";
    }

    switch (errorCase) {
      case "empty":
        errorState(2, year, typeOfError[1], "#ff5757");
        return false;
      case "futureYear":
        errorState(3, year, typeOfError[4], "#ff5757");
        return false;
      case "invalidDate":
        errorState(2, year, typeOfError[5], "#ff5757");
        return false;
      case "futureMonth":
        errorState(1, year, typeOfError[3], "#ff5757");
        return false;
      case "futureDay":
        errorState(0, year, typeOfError[2], "#ff5757");
        return false;
      case "valid":
        errorState(2, year, typeOfError[0], "");
        return true;
      default:
        return false;
    }
  };

  submitButton.addEventListener("click", () => {
    const dayValid = isDayCorrect();
    const monthValid = isMonthCorrect();
    const yearValid = isYearCorrect();
    if (dayValid && monthValid && yearValid) {
      substractAge();
    }
  });
};
