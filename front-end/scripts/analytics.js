function toggleSidebar() {
      const sidebar = document.getElementById("sidebar");
      const body = document.body;
      sidebar.classList.toggle("hidden");
      body.style.marginLeft = sidebar.classList.contains("hidden") ? "0" : "250px";
    }

    window.addEventListener('DOMContentLoaded', () => {
      // Line chart gradient
      const lineCtx = document.getElementById('ticketsLineChart').getContext('2d');
      const gradient = lineCtx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');

      // Line Chart
      new Chart(lineCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Resolved Tickets',
            data: [500, 700, 950, 900, 1050, 1200],
            fill: true,
            backgroundColor: gradient,
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.3
          }]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              beginAtZero: false,
              title: { display: true, text: 'Tickets Resolved' }
            },
            x: {
              title: { display: true, text: 'Month' }
            }
          }
        }
      });

  // Donut Chart
const donutCtx = document.getElementById('ticketsDonutChart').getContext('2d');
new Chart(donutCtx, {
  type: 'doughnut',
  data: {
    labels: ['Resolved', 'Pending', 'SLA'],
    datasets: [{
      label: 'Tickets Status',
      data: [1200, 400, 150],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',  // green
        'rgba(250, 204, 21, 0.8)', // yellow
        'rgba(14, 165, 233, 0.8)'  // blue for SLA
      ],
      borderColor: '#fff',
      borderWidth: 2,
      hoverOffset: 0   // <-- This disables the "movement" on hover
    }]
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 14, weight: '600' },
          color: '#212529',
          padding: 20,
          boxWidth: 20,
          boxHeight: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    }
  }
});

// Update metrics
document.getElementById('total').textContent = 1750;
document.getElementById('pending').textContent = 400;
document.getElementById('resolved').textContent = 1200;
document.getElementById('sla').textContent = "150";  // changed to a count, not percent

      // Update the metric numbers dynamically
      document.getElementById('total').textContent = 1750;
      document.getElementById('pending').textContent = 400;
      document.getElementById('resolved').textContent = 1200;
      document.getElementById('sla').textContent = "96%";
    });