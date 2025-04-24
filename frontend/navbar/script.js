async function logout() {
    const token = localStorage.getItem('token');
    if (!token) return;


    const res = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
      });
  
      const data = await res.json();
  
      if (res.ok) {
        localStorage.removeItem('token');
        window.location.href = 'index.html'
      } else {
        alert('Ошибка при выходе');
      }
}