const usersKey = 'tourgenUsers';

function getUsers() {
  return JSON.parse(localStorage.getItem(usersKey) || '[]');
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const identifier = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const user = getUsers().find((account) =>
    account.email.toLowerCase() === identifier || account.name.toLowerCase() === identifier
  );

  if (!user || user.password !== password) {
    alert('Invalid email/username or password. Please create an account first.');
    return;
  }

  sessionStorage.setItem('tourgenCurrentUser', JSON.stringify({
    name: user.name,
    email: user.email,
    role: user.role
  }));
  window.location.href = 'home.html';
});

document.getElementById('forgotPassword').addEventListener('click', function (event) {
  event.preventDefault();
  const email = prompt('Enter the email address used for your account:');
  if (!email) return;

  const users = getUsers();
  const userIndex = users.findIndex((account) => account.email.toLowerCase() === email.trim().toLowerCase());
  if (userIndex === -1) {
    alert('No account found with that email address.');
    return;
  }

  const newPassword = prompt('Enter your new password:');
  if (!newPassword || newPassword.trim().length < 4) {
    alert('Password must be at least 4 characters long.');
    return;
  }

  users[userIndex].password = newPassword;
  localStorage.setItem(usersKey, JSON.stringify(users));
  alert('Password reset successfully. You can now login.');
});