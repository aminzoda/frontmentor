// const dayInput = document.getElementById("day");
// const monthInput = document.getElementById("month");
// const yearInput = document.getElementById("year");
// const dayError = document.getElementById("day-error");
// const monthError = document.getElementById("month-error");
// const yearError = document.getElementById("year-error");
// const form = document.getElementById("age-form");
// const yearSpan = document.getElementById("years");
// const monthSpan = document.getElementById("months");
// const daySpan = document.getElementById("days");

// const date = new Date();
// const currentDay = date.getDate();
// const currentMonth = date.getMonth() + 1;
// const currentYear = date.getFullYear();

// const errorMessages = {
//     required: "This field is required",
//     invalidMonth: "Must be a valid month",
//     invalidYear: "Must be a valid year",
//     invalidDay: "Must be a valid day",
//     invalidDate: "Must be a valid date",
// };

// function setErrorState(input, errorElement, message) {
//     errorElement.textContent = message;
//     input.classList.add("input-error");
// }

// function clearErrorState(input, errorElement) {
//     errorElement.textContent = "";
//     input.classList.remove("input-error");
// }

// function isValidDate(day, month, year) {
//     const date = new Date(year, month - 1, day);
//     return date.getDate() === parseInt(day) &&
//         date.getMonth() === month - 1 &&
//         date.getFullYear() === parseInt(year);
// }

// function validateDay() {
//     const day = dayInput.value;
//     const month = monthInput.value;
//     const year = yearInput.value;
//     if (!day) {
//         setErrorState(dayInput, dayError, errorMessages.required);
//         return false;
//     } else if (day <= 0 || day > 31) {
//         setErrorState(dayInput, dayError, errorMessages.invalidDay);
//         return false;
//     } else if (month && year && !isValidDate(day, month, year)) {
//         setErrorState(dayInput, dayError, errorMessages.invalidDate);
//         return false;
//     } else {
//         clearErrorState(dayInput, dayError);
//         return true;
//     }
// }

// function validateMonth() {
//     const day = dayInput.value;
//     const month = monthInput.value;
//     const year = yearInput.value;
//     if (!month) {
//         setErrorState(monthInput, monthError, errorMessages.required);
//         return false;
//     } else if (month <= 0 || month > 12) {
//         setErrorState(monthInput, monthError, errorMessages.invalidMonth);
//         return false;
//     } else if (day && year && !isValidDate(day, month, year)) {
//         setErrorState(monthInput, monthError, errorMessages.invalidDate);
//         return false;
//     } else {
//         clearErrorState(monthInput, monthError);
//         return true;
//     }
// }

// function validateYear() {
//     const day = dayInput.value;
//     const month = monthInput.value;
//     const year = yearInput.value;
//     if (!year) {
//         setErrorState(yearInput, yearError, errorMessages.required);
//         return false;
//     } else if (year > currentYear) {
//         setErrorState(yearInput, yearError, errorMessages.invalidYear);
//         return false;
//     } else if (month && day && !isValidDate(day, month, year)) {
//         setErrorState(yearInput, yearError, errorMessages.invalidDate);
//         return false;
//     } else if (year === currentYear && month > currentMonth) {
//         setErrorState(yearInput, yearError, errorMessages.invalidYear);
//         return false;
//     } else if (year === currentYear && month === currentMonth && day > currentDay) {
//         setErrorState(yearInput, yearError, errorMessages.invalidYear);
//         return false;
//     } else {
//         clearErrorState(yearInput, yearError);
//         return true;
//     }
// }

// function handleSubmit(event) {
//     event.preventDefault();
//     const yearValid = validateYear();
//     const monthValid = validateMonth();
//     const dayValid = validateDay();

//     if (dayValid && monthValid && yearValid) {
//         const {newYear, newMonth, newDay} = calculateAge(dayInput.value, monthInput.value, yearInput.value);
//         yearSpan.textContent = newYear.toString();
//         monthSpan.textContent = newMonth.toString();
//         daySpan.textContent = newDay.toString();
//     }
// }

// function calculateAge(day, month, year) {
//     let newYear = currentYear - year;
//     let newMonth = currentMonth - month;
//     let newDay = currentDay - day;

//     if (newMonth < 0) {
//         newYear--;
//         newMonth += 12;
//     }

//     if (newDay < 0) {
//         newMonth--;
//         const daysInPreviousMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
//         newDay += daysInPreviousMonth;
//         if (newMonth < 0) {
//             newMonth += 12;
//             newYear--;
//         }
//     }

//     return {newYear, newMonth, newDay};
// }

// form.addEventListener("submit", handleSubmit);

// dayInput.addEventListener("blur", validateDay);
// monthInput.addEventListener("blur", validateMonth);
// yearInput.addEventListener("blur", validateYear);

const form = document.getElementById('age-form');
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const dayError = document.getElementById('day-error');
const monthError = document.getElementById('month-error');
const yearError = document.getElementById('year-error');
const yearsOutput = document.getElementById('years');
const monthsOutput = document.getElementById('months');
const daysOutput = document.getElementById('days');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    clearErrors();

    if (isValidDate(day, month, year)) {
        const birthDate = new Date(year, month - 1, day);
        const age = calculateAge(birthDate);

        yearsOutput.textContent = age.years;
        monthsOutput.textContent = age.months;
        daysOutput.textContent = age.days;
    } else {
        showErrors(day, month, year);
    }
});

function clearErrors() {
    dayError.textContent = '';
    monthError.textContent = '';
    yearError.textContent = '';
}

function showErrors(day, month, year) {
    if (isNaN(day) || day < 1 || day > 31) {
        dayError.textContent = 'Invalid day';
    }
    if (isNaN(month) || month < 1 || month > 12) {
        monthError.textContent = 'Invalid month';
    }
    if (isNaN(year) || year > new Date().getFullYear()) {
        yearError.textContent = 'Invalid year';
    }
}

function isValidDate(day, month, year) {
    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() + 1 === month && date.getFullYear() === year;
}

function calculateAge(birthDate) {
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return {years, months, days};
}
