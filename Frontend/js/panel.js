window.addEventListener('DOMContentLoaded', async () => {
  const lista = document.querySelector('.panel__list');
  const addBtn = document.querySelector('.panel__add');
  const tabs = document.querySelector('.tabs__container');
  const clases = new Set();

  try {
    const res = await fetch("http://localhost:5000/api/monstruos");
    const data = await res.json();
    const monstruos = data.data || [];

    monstruos.forEach(m => {
      const item = document.createElement('div');
      item.className = 'panel__item';
      item.setAttribute('data-id', m._id); // <== nuevo atributo para redirigr
      item.innerHTML = `
        <img src="${m.ICONO}" alt="Ícono" class="panel__icon">
        <span class="panel__name">${m.NOMBRE}</span>
        <span class="panel__class">${m.CLASSIFICACION}</span>
        <div class="panel__actions">
          <button class="panel__edit-button" data-id="${m._id}">Editar</button>
          <button class="panel__delete-button" data-id="${m._id}">Borrar</button>
        </div>
      `;
      // Insertar antes del botón de agregar
      lista.insertBefore(item, addBtn);
      clases.add(m.CLASSIFICACION);
    });

    // Crear tabs dinámicos por clase
    clases.forEach(cl => {
      if (!Array.from(tabs.children).some(btn => btn.textContent === cl)) {
        const btn = document.createElement('button');
        btn.className = 'tabs__button';
        btn.textContent = cl;
        tabs.appendChild(btn);
      }
    });

    // Click en el item para ir a la página de detalles
    lista.addEventListener('click', (e) => {
      const item = e.target.closest('.panel__item');
      if (item && !e.target.classList.contains('panel__edit-button') && !e.target.classList.contains('panel__delete-button')) {
        const id = item.dataset.id;
        window.location.href = `../html/detalles.html?id=${id}`;
      }
    });

    // Eventos para los botones "Borrar"
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
              e.target.closest(".item").remove();
            } else {
              const data = await res.json();
              alert("Error: " + data.message);
            }
          } catch (err) {
            console.error("Error eliminando monstruo:", err.message);
          }
        }
      }

      // Si haces la parte de "Editar", también puedes usar dataset.id
    });

  } catch (err) {
    console.error("Error al obtener monstruos:", err.message);
    alert("Error al cargar los datos del servidor");
  }
});