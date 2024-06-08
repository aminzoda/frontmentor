document.addEventListener('DOMContentLoaded', function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const chartBar = document.querySelector('.chart--bar');
            const tooltip = document.getElementById('tooltip');
            const maxAmount = Math.max(...data.map(item => item.amount));
            const currentDate = new Date();
            const currentDayIndex = currentDate.getDay() - 1; // getDay() returns 0 for Sunday

            data.forEach((item, index) => {
                const chart = document.createElement('div');
                chart.classList.add('chart');
                const height = item.amount / maxAmount * 100;
                const value = `<div class="chart-value ${index === currentDayIndex ? 'active' : ''}" style="height:${height}%"></div>`;

                chart.innerHTML = `
                  <div class="chart-wrapper">
                    ${value}
                  </div>
                  <div class="chart-title">${item.day}</div>
                `;

                chartBar.appendChild(chart);

                // Add event listener for hover
                chart.addEventListener('mouseenter', createChartHoverListener(item));
                chart.addEventListener('mouseleave', () => tooltip.classList.remove('active'));
            });

            function createChartHoverListener(item) {
                return (event) => {
                    const chartValueElement = event.currentTarget.querySelector('.chart-value');
                    const rect = chartValueElement.getBoundingClientRect();
                    const tooltipText = `$${item.amount}`;
                    tooltip.innerHTML = tooltipText;

                    // Temporarily make the tooltip visible to calculate its width
                    tooltip.classList.add('active');
                    const tooltipWidth = tooltip.offsetWidth;
                    const tooltipHeight = tooltip.offsetHeight;
                    tooltip.classList.remove('active');

                    tooltip.style.top = `${rect.top - tooltipHeight - 8}px`; // 1rem above the bar
                    tooltip.style.left = `${rect.left + rect.width / 2 - tooltipWidth / 2}px`;
                    tooltip.classList.add('active');
                };
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});
