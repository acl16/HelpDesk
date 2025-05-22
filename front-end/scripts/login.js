document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      window.location.href = data.redirectTo;
    } else {
      alert('Invalid credentials!');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Something went wrong.');
  });
});
