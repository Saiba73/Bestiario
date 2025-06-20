window.addEventListener('DOMContentLoaded', () => {
  const monstruos = JSON.parse(localStorage.getItem('monstruos')) || [];
  const grid = document.querySelector('.monster-grid');
  const tabs = document.querySelector('.tabs');
  const clases = new Set();

  monstruos.forEach(m => {
    const card = document.createElement('div');
    card.className = 'monster-card';
    card.innerHTML = `
      <img src="../${m.icon}" alt="Ícono de monstruo">
      <h5>${m.name}</h5>
      <div class="elementos">
        ${m.elementos.map(el => `<img src="../img/${el}.png" alt="${el}" class="elemento-icono">`).join('')}
      </div>
    `;
    grid.insertBefore(card, grid.lastElementChild); // Antes del botón "+"
    clases.add(m.clasificacion);
  });

  clases.forEach(cl => {
    if (!Array.from(tabs.children).some(btn => btn.textContent === cl)) {
      const btn = document.createElement('button');
      btn.textContent = cl;
      tabs.appendChild(btn);
    }
  });
});
