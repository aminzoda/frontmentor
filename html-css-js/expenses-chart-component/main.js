const dataPromise = fetch("data.json")
  .then((response) => response.json())
  .catch((error) => console.log(error));

let chartBar = document.querySelector(".chart--bar");
let tooltip = document.getElementById("tooltip");

dataPromise.then((data) => {
  data.forEach((item) => {
    let chart = document.createElement("div");
    chart.classList.add("chart");
    const height = item.amount / 0.4;
    let value = "";
    if (item.day == "wed") {
      value = `<div class="chart-value active" style="--height:${height}px"></div>`;
    } else {
      value = `<div class="chart-value" style="--height:${height}px"></div>`;
    }

    chart.innerHTML = `
      <div class="chart-wrapper">
        ${value}
      </div>
      <div class="chart-title">${item.day}</div>
    `;

    chartBar.appendChild(chart);

    // Add event listener for click
    chart.addEventListener("click", createChartClickListener(item));
  });
});

function createChartClickListener(item) {
  return (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const tooltipText = `$${item.amount}`;
    tooltip.innerHTML = tooltipText;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 2}px`;
    tooltip.style.left = `${
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2
    }px`;
    tooltip.classList.add("active");
  };
}

// Hide the tooltip when clicking anywhere outside the bars
document.addEventListener("click", (event) => {
  if (!event.target.closest(".chart")) {
    tooltip.classList.remove("active");
  }
});
