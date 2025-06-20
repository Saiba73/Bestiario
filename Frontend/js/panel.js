window.addEventListener('DOMContentLoaded', () => {
  const monstruos = JSON.parse(localStorage.getItem('monstruos')) || [];
  const lista = document.querySelector('.lista');
  const tabs = document.querySelector('.tabs');
  const clases = new Set();

  monstruos.forEach(m => {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
      <img src="../${m.icon}" alt="Ícono" class="icono">
      <span class="nombre">${m.name}</span>
      <span class="clase">${m.clasificacion}</span>
      <div class="acciones">
        <button class="editar">Editar</button>
        <button class="borrar">Borrar</button>
      </div>
    `;
    lista.appendChild(item);
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
