document.addEventListener('DOMContentLoaded', () => {
  const ticketBody = document.getElementById('ticketBody');
  const searchInput = document.getElementById('searchInput');
  const totalCount = document.getElementById('total');
  const pendingCount = document.getElementById('pending');
  const resolvedCount = document.getElementById('resolved');
  const slaCount = document.getElementById('sla');

  // Fetch all tickets for admin
  fetch('/api/admin/tickets', {
    method: 'GET',
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        alert('Failed to load tickets.');
        return;
      }

      const tickets = data.tickets;
      let pending = 0;
      let resolved = 0;

      // Display tickets in table
      tickets.forEach(ticket => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${ticket.ticket_id}</td>
          <td>${ticket.category}</td>
          <td>${ticket.status}</td>
          <td>${ticket.priority}</td>
          <td><button class="btn btn-sm btn-outline-primary" onclick="alert('Feature coming soon')">View</button></td>
        `;
        ticketBody.appendChild(row);

        // Count pending and resolved
        const status = ticket.status.toLowerCase();
        if (status === 'pending' || status === 'open') pending++;
        if (status === 'resolved' || status === 'closed') resolved++;
      });

      // Update dashboard counters
      totalCount.textContent = tickets.length;
      pendingCount.textContent = pending;
      resolvedCount.textContent = resolved;
      slaCount.textContent = tickets.length; // Optional: adjust if only some have SLA
    })
    .catch(error => {
      console.error('Error fetching tickets:', error);
      alert('Error fetching ticket data.');
    });

  // Live search
  searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('#ticketBody tr');

    rows.forEach(row => {
      const match = row.textContent.toLowerCase().includes(keyword);
      row.style.display = match ? '' : 'none';
    });
  });
});
