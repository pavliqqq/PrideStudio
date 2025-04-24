async function login() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    const res = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('worker_id', data.worker_id);
      window.location.href = `worker.html?id=${data.worker_id}`
    } else {
      document.getElementById('error').innerText = data.message || 'Ошибка входа';
    }
  }