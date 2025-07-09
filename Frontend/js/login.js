document.getElementById('login-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('user').value.trim();
  const password = document.getElementById('pass').value.trim();

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (data.success) {
      localStorage.setItem('isLoggedIn', 'true');
      // Redirige al panel de administración
      window.location.href = 'panel.html';
    } else {
      alert(data.message || 'Credenciales inválidas');
    }
  } catch (err) {
    console.error('Error en login:', err);
    alert('Error del servidor');
  }
});