// Toggles the sidebar visibility and adjusts body margin
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const body = document.body;

  sidebar.classList.toggle("hidden");

  // Update margin based on sidebar state
  body.style.marginLeft = sidebar.classList.contains("hidden") ? "0" : "250px";
}

// Loads ticket data into the dashboard
function loadDashboard() {
  // Count total tickets
  const total = ticketData.length;
  // Count pending tickets
  const pending = ticketData.filter(t => t.status === "Pending").length;
   // Count resolved tickets
  const resolved = ticketData.filter(t => t.status === "Resolved").length;

  // Display summary counts
  document.getElementById("total").textContent = total;
  document.getElementById("pending").textContent = pending;
  document.getElementById("resolved").textContent = resolved;

  // Add each ticket as a new row in the table
  const tbody = document.getElementById("ticketBody");
  ticketData.forEach(ticket => {
    tbody.innerHTML += `
      <tr>
        <td>${ticket.id}</td>
        <td>${ticket.title}</td>
        <td>${ticket.status}</td>
        <td>${ticket.priority}</td>
        <td><button class="btn btn-info btn-sm">View</button></td>
      </tr>
    `;
  });
}

// Run dashboard setup when page loads
document.addEventListener("DOMContentLoaded", loadDashboard);
