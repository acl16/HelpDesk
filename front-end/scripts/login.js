document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const data = { email, password };

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (response.ok) {
      window.location.href = '/user-dashboard';
    } else {
      alert('Invalid credentials!');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Something went wrong.');
  });
});
