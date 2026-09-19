const usersKey = 'tourgenUsers';

function getUsers() {
  return JSON.parse(localStorage.getItem(usersKey) || '[]');
}

document.getElementById('signupForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const role = document.getElementById('role').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const users = getUsers();

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  if (password.length < 4) {
    alert('Password must be at least 4 characters long.');
    return;
  }

  if (users.some((user) => user.email.toLowerCase() === email)) {
    alert('An account with this email already exists.');
    return;
  }

  users.push({ name, email, role, password });
  localStorage.setItem(usersKey, JSON.stringify(users));
  alert('Account created successfully. Please login.');
  window.location.href = 'login.html';
});
