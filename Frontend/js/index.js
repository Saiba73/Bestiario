window.addEventListener('DOMContentLoaded', async () => {
  const gridContainer = document.querySelector('.monster-grid__container');
  const tabsContainer = document.querySelector('.tabs');
  const clases = new Set();
  let monstruos = [];

  try {
    const res = await fetch('http://localhost:5000/api/monstruos');
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Error al cargar');
    monstruos = json.data;

    // Renderiza cada tarjeta con enlace a detalles.html?id=...
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
            ${generarIconos(m)}
          </div>
        </a>
      `;
      // Inserta antes del botón “+”
      gridContainer.insertBefore(card, gridContainer.lastElementChild);
      clases.add(m.CLASSIFICACION);
    });

    // Crea un botón “All” y luego uno por cada clasificación única
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

  function generarIconos(m) {
    const icons = [];
    if (m.DEBILIDAD_FUEGO) icons.push('Fuego');
    if (m.DEBILIDAD_AGUA) icons.push('Agua');
    if (m.DEBILIDAD_HIELO) icons.push('Hielo');
    if (m.DEBILIDAD_ELECTRICIDAD) icons.push('Trueno');
    if (m.DEBILIDAD_DRAGON) icons.push('Dragón');
    return icons
      .map(el => `<img src="../img/Elementos/${el}.png" alt="${el}" class="monster-card__element-icon">`).join('');
  }

  function filtrar(clase) {
    document.querySelectorAll('.monster-card').forEach(card => {
      if (card.classList.contains('monster-card--add')) return; // siempre mostrar "+"
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
            ${generarIconos(m)}
          </div>
        </a>
      `;
      // Inserta antes del botón “+”
      gridContainer.insertBefore(card, gridContainer.lastElementChild);
      clases.add(m.CLASSIFICACION);
    });