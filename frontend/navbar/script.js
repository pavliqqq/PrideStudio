export async function loadNavbar() {
  const response = await fetch("/navbar.html");
  const navbarHtml = await response.text();
  document.getElementById("navbar").innerHTML = navbarHtml;

  // Дождёмся, пока DOM вставится
  await new Promise(resolve => setTimeout(resolve, 0));

  const token = localStorage.getItem('token');

  const logoutButton = document.getElementById('logout-button');
  const navLinks = document.getElementById('nav_links');

  if (logoutButton) {
    logoutButton.style.display = token ? 'inline-block' : 'none';
    logoutButton.addEventListener('click', logout);
  }

  if (navLinks) navLinks.style.display = token ? 'inline-block' : 'none';
}


async function logout() {
  const token = localStorage.getItem('token');
  if (!token) return;

  const res = await fetch('http://localhost:8000/api/logout', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token
    },
  });

  if (res.ok) {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  } else {
    alert('Ошибка при выходе');
  }
}
