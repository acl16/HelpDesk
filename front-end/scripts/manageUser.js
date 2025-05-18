// Toggle the sidebar visibility
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
  document.body.style.marginLeft = sidebar.classList.contains("hidden") ? "0" : "250px";
}

// Fetch and render all users from the backend
async function loadUsers() {
  try {
    const res = new Promise((resolve) => {
      setTimeout(() => resolve(mockUsers), 500);
    });
    const users = await res;
    renderUserTable(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
}

// Display users in the table
function renderUserTable(users) {
  const tbody = document.getElementById("userTableBody");
  tbody.innerHTML = "";

  if (users.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5'>No users found</td></tr>";
  }

  users.forEach(user => {
    tbody.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.status}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Load users when the page is ready
document.addEventListener("DOMContentLoaded", loadUsers);
