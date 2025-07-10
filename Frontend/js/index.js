window.addEventListener('DOMContentLoaded', async () => {
  const gridContainer = document.querySelector('.monster-grid__container');
  const tabsContainer = document.querySelector('.tabs__container');
  const clases = new Set();
  //Manejar inicio de sesión
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const authControls = document.getElementById('auth-controls');
  const addButton = document.getElementById('add-button');
  let monstruos = [];

  // Mostrar botones según el estado de sesión
  if (isLoggedIn) {
    authControls.innerHTML = `
      <a href="panel.html" class="header__admin-btn">Administrar</a>
      <a href="#" id="logout-btn" class="header__admin-btn">Cerrar sesión</a>
    `;
    addButton.classList.remove('d-none'); // Mostrar el botón "+"
  } else {
    authControls.innerHTML = `
      <a href="login.html" class="header__admin-btn">Iniciar Sesión</a>
    `;
    addButton.classList.add('d-none'); // Ocultar el botón "+"
  }

  // Logout
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    location.reload();
  });

  try {
    const res = await fetch('http://localhost:5000/api/monstruos');
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Error al cargar');
    monstruos = json.data;

    // Renderizar monstruos
    monstruos.forEach(m => {
      const card = document.createElement('div');
      card.className = 'monster-card';
      card.innerHTML = `
        <a href="detalles.html?id=${m._id}" class="monster-card__link">
          <img
            src="${m.ICONO}"
            alt="Ícono de ${m.NOMBRE}"
            class="monster-card__icon"
          >
          <h5 class="monster-card__name">${m.NOMBRE}</h5>
          <div class="monster-card__clasificacion">${m.CLASSIFICACION}</div>
          <div class="monster-card__elements">
            ${generarIconosElementos(m)}
          </div>
        </a>
      `;
      // Inserta antes del botón "+"
      gridContainer.insertBefore(card, gridContainer.lastElementChild);
      clases.add(m.CLASSIFICACION);
    });

    // Tabs dinámicos
    tabsContainer.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.textContent = 'All';
    allBtn.className = 'tabs__button';
    allBtn.addEventListener('click', () => filtrar('All'));
    tabsContainer.appendChild(allBtn);

    clases.forEach(cl => {
      const btn = document.createElement('button');
      btn.textContent = cl;
      btn.className = 'tabs__button';
      btn.addEventListener('click', () => filtrar(cl));
      tabsContainer.appendChild(btn);
    });

  } catch (err) {
    console.error(err);
    alert('No se pudieron cargar los monstruos.');
  }

  function generarIconosElementos(m) {
    const icons = [];
    if (m.ELEMENTO_FUEGO) icons.push('Fuego');
    if (m.ELEMENTO_AGUA) icons.push('Agua');
    if (m.ELEMENTO_HIELO) icons.push('Hielo');
    if (m.ELEMENTO_ELECTRICIDAD) icons.push('Trueno');
    if (m.ELEMENTO_DRAGON) icons.push('Dragon');
    return icons
      .map(el => `<img src="../img/Elementos/${el}.png" alt="${el}" class="monster-card__element-icon">`)
      .join('');
  }

  function filtrar(clase) {
    document.querySelectorAll('.monster-card').forEach(card => {
      if (card.classList.contains('monster-card--add')) return;
      const textoClase = card.querySelector('.monster-card__clasificacion').textContent;
      card.style.display = (clase === 'All' || textoClase === clase) ? 'block' : 'none';
    });
  }
});


monstruos.forEach(m => {
      const card = document.createElement('div');
      card.className = 'monster-card';
      card.innerHTML = `
        <a href="detalles.html?id=${m._id}" class="monster-card__link">
          <img
            src="${m.ICONO}"
            alt="Ícono de ${m.NOMBRE}"
            class="monster-card__icon"
          >
          <h5 class="monster-card__name">${m.NOMBRE}</h5>
          <div class="monster-card__clasificacion">${m.CLASSIFICACION}</div>
          <div class="monster-card__elements">
            ${generarIconosElementos(m)}
          </div>
        </a>
      `;
      gridContainer.insertBefore(card, gridContainer.lastElementChild);
      clases.add(m.CLASSIFICACION);
    });
