function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const body = document.body;

  sidebar.classList.toggle("hidden");

  body.style.marginLeft = sidebar.classList.contains("hidden") ? "0" : "250px";
}


function loadSalesAnalytics() {
  const mockData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    salesTrend: [500, 700, 900, 850, 1000, 1200]
  };

  const ctx = document.getElementById("salesTrendChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: mockData.labels,
      datasets: [{
        label: "Resolved Tickets",
        data: mockData.salesTrend,
        borderColor: "#5bc0de",
        backgroundColor: "rgba(91, 192, 222, 0.2)",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Month"
          }
        },
        y: {
          title: {
            display: true,
            text: "Tickets Resolved"
          }
        }
      }
    }
  });
}

// Initialize data loading once the page is fully loaded
document.addEventListener("DOMContentLoaded", loadSalesAnalytics);
