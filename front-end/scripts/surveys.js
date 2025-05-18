function toggleSidebar() {
      const sidebar = document.getElementById("sidebar");
      const body = document.body;

      sidebar.classList.toggle("hidden");

      body.style.marginLeft = sidebar.classList.contains("hidden") ? "0" : "250px";
    }
