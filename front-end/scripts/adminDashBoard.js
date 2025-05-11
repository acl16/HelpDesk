// Toggles the sidebar visibility and adjusts body margin
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const body = document.body;

  sidebar.classList.toggle("hidden");

  body.style.marginLeft = sidebar.classList.contains("hidden") ? "0" : "250px";
}

// Loads ticket data into the dashboard
function loadDashboard() {
  const total = ticketData.length;
  const pending = ticketData.filter(t => t.status === "Pending").length;
  const resolved = ticketData.filter(t => t.status === "Resolved").length;

  document.getElementById("total").textContent = total;
  document.getElementById("pending").textContent = pending;
  document.getElementById("resolved").textContent = resolved;

  const tbody = document.getElementById("ticketBody");
  ticketData.forEach(ticket => {
    tbody.innerHTML += `
      <tr>
        <td>${ticket.id}</td>
        <td>${ticket.title}</td>
        <td>${ticket.status}</td>
        <td>${ticket.priority}</td>
        <td><button class="btn btn-sm view-btn">View</button></td>
      </tr>
    `;
  });
}

document.addEventListener("DOMContentLoaded", loadDashboard);
