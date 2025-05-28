 function toggleOtherCategory() {
      const categorySelect = document.getElementById('category');
      const otherDiv = document.getElementById('otherCategoryDiv');
      if (categorySelect.value === 'Other') {
        otherDiv.style.display = 'block';
        document.getElementById('otherCategory').setAttribute('required', 'required');
      } else {
        otherDiv.style.display = 'none';
        document.getElementById('otherCategory').removeAttribute('required');
        document.getElementById('otherCategory').value = '';
      }
    }

    function showModal() {
      alert('Ticket submitted successfully!');
    }

    (function () {
      'use strict';
      const form = document.getElementById('ticketForm');
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity()) {
          showModal();
          form.reset();
          toggleOtherCategory();
          form.classList.remove('was-validated');
        } else {
          form.classList.add('was-validated');
        }
      }, false);
    })();