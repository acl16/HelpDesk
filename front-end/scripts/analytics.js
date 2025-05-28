function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const body = document.body;
    sidebar.classList.toggle("hidden");
    body.style.marginLeft = sidebar.classList.contains("hidden") ? "0" : "250px";
  }

  window.addEventListener('DOMContentLoaded', () => {
    const lineCtx = document.getElementById('ticketsLineChart').getContext('2d');
    const donutCtx = document.getElementById('ticketsDonutChart').getContext('2d');
    
    const lineChart = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Resolved Tickets',
          data: [],
          fill: true,
          backgroundColor: lineCtx.createLinearGradient(0, 0, 0, 400),
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
            beginAtZero: true,
            title: { display: true, text: 'Tickets Resolved' }
          },
          x: {
            title: { display: true, text: 'Month' }
          }
        }
      }
    });

    // Create empty Donut Chart (to be updated later)
    const donutChart = new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Resolved', 'Pending', 'SLA'],
        datasets: [{
          label: 'Tickets Status',
          data: [],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(250, 204, 21, 0.8)',
            'rgba(14, 165, 233, 0.8)'
          ],
          borderColor: '#fff',
          borderWidth: 2,
          hoverOffset: 0
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

    document.getElementById('total').textContent = 0;
    document.getElementById('pending').textContent = 0;
    document.getElementById('resolved').textContent = 0;
    document.getElementById('sla').textContent = 0;

  });
