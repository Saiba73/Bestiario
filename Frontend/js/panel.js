window.addEventListener('DOMContentLoaded', async () => {
  const lista = document.querySelector('.panel__list');
  const addBtn = document.querySelector('.panel__add');
  const tabs = document.querySelector('.tabs__container');
  const clases = new Set();

  try {
    const res = await fetch("/api/monstruos");
    const data = await res.json();
    const monstruos = data.data || [];

    // Renderizado
    monstruos.forEach(m => {
      const item = document.createElement('div');
      item.className = 'panel__item';
      item.setAttribute('data-id', m._id);
      item.innerHTML = `
        <img src="${m.ICONO}" alt="Ícono" class="panel__icon">
        <span class="panel__name">${m.NOMBRE}</span>
        <span class="panel__class">${m.CLASSIFICACION}</span>
        <div class="panel__actions">
          <button class="panel__edit-button" data-id="${m._id}">Editar</button>
          <button class="panel__delete-button" data-id="${m._id}">Borrar</button>
        </div>
      `;
      lista.insertBefore(item, addBtn);
      clases.add(m.CLASSIFICACION);
    });

    // Limpiar y crear tabs
    tabs.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = 'tabs__button';
    allBtn.textContent = 'All';
    allBtn.addEventListener('click', () => filtrar('All'));
    tabs.appendChild(allBtn);

    clases.forEach(cl => {
      const btn = document.createElement('button');
      btn.className = 'tabs__button';
      btn.textContent = cl;
      btn.addEventListener('click', () => filtrar(cl));
      tabs.appendChild(btn);
    });

    // Función para filtrar por clase
    function filtrar(clase) {
      document.querySelectorAll('.panel__item').forEach(card => {
        const textoClase = card.querySelector('.panel__class')?.textContent;
        card.style.display = (clase === 'All' || textoClase === clase) ? 'flex' : 'none';
      });
    }

    // Click en editar
    lista.addEventListener('click', (e) => {
      if (e.target.classList.contains("panel__edit-button")) {
        const item = e.target.closest('.panel__item');
        if (item) {
          const id = item.dataset.id;
          window.location.href = `../html/editar.html?id=${id}`;
        }
      }
    });

    // Click en detalles
    lista.addEventListener('click', (e) => {
      const item = e.target.closest('.panel__item');
      if (item && !e.target.classList.contains('panel__edit-button') && !e.target.classList.contains('panel__delete-button')) {
        const id = item.dataset.id;
        window.location.href = `../html/detalles.html?id=${id}`;
      }
    });

    // Click en borrar
    lista.addEventListener("click", async (e) => {
      if (e.target.classList.contains("panel__delete-button")) {
        const id = e.target.dataset.id;
        if (confirm("¿Estás seguro de borrar este monstruo?")) {
          try {
            const res = await fetch(`http://localhost:5000/api/monstruos/${id}`, {
              method: "DELETE"
            });

            if (res.ok) {
              alert("Monstruo eliminado correctamente");
              e.target.closest(".panel__item")?.remove();
            } else {
              const data = await res.json();
              alert("Error: " + data.message);
            }
          } catch (err) {
            console.error("Error eliminando monstruo:", err.message);
          }
        }
      }
    });

  } catch (err) {
    console.error("Error al obtener monstruos:", err.message);
    alert("Error al cargar los datos del servidor");
  }

  // Cerrar sesión
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '../html/index.html';
  });
});
