window.addEventListener('DOMContentLoaded', async () => {
  const grid = document.querySelector('.monster-grid');
  const tabs = document.querySelector('.tabs');
  const clases = new Set();

  try {
    const res = await fetch('http://localhost:5000/api/monstruos');
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Error al obtener monstruos');
    }

    const monstruos = data.data;

    monstruos.forEach(monstruo => {
      // Crear tarjeta de monstruo
      const card = document.createElement('div');
      card.className = 'monster-card';

      // Enlace a detalles.html con id
      card.innerHTML = `
        <a href="detalles.html?id=${monstruo._id}">
          <img src="${monstruo.ICONO}" alt="Ícono de monstruo">
          <h5>${monstruo.NOMBRE}</h5>
          <div class="elementos">
            ${generarIconos(monstruo)}
          </div>
        </a>
      `;

      grid.insertBefore(card, grid.lastElementChild); // Antes del botón "+"
      clases.add(monstruo.CLASSIFICACION);
    });

    // Crear botones de filtros por clasificación
    clases.forEach(cl => {
      if (![...tabs.children].some(btn => btn.textContent === cl)) {
        const btn = document.createElement('button');
        btn.textContent = cl;
        btn.addEventListener('click', () => filtrarPorClase(cl));
        tabs.appendChild(btn);
      }
    });

    // Botón "All"
    tabs.querySelector('button')?.addEventListener('click', () => {
      document.querySelectorAll('.monster-card').forEach(c => {
        c.style.display = 'block';
      });
    });

  } catch (err) {
    console.error('Error cargando monstruos:', err.message);
  }

  function generarIconos(monstruo) {
    const iconos = [];
    if (monstruo.DEBILIDAD_FUEGO) iconos.push('Fuego');
    if (monstruo.DEBILIDAD_AGUA) iconos.push('Agua');
    if (monstruo.DEBILIDAD_HIELO) iconos.push('Hielo');
    if (monstruo.DEBILIDAD_ELECTRICIDAD) iconos.push('Trueno');
    if (monstruo.DEBILIDAD_DRAGON) iconos.push('Dragón');

    return iconos.map(el => `<img src="../img/${el}.png" alt="${el}" class="elemento-icono">`).join('');
  }

  function filtrarPorClase(clase) {
    document.querySelectorAll('.monster-card').forEach(card => {
      const nombre = card.querySelector('h5').textContent;
      const coincide = monstruos.find(m => m.NOMBRE === nombre && m.CLASSIFICACION === clase);
      card.style.display = coincide ? 'block' : 'none';
    });
  }
});