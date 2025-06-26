window.addEventListener('DOMContentLoaded', async () => {
  const lista = document.querySelector('.lista');
  const tabs = document.querySelector('.tabs');
  const clases = new Set();

  try {
    const res = await fetch("http://localhost:5000/api/monstruos");
    const data = await res.json();
    const monstruos = data.data || [];

    monstruos.forEach(m => {
      const item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = `
        <img src="${m.ICONO}" alt="Ícono" class="icono">
        <span class="nombre">${m.NOMBRE}</span>
        <span class="clase">${m.CLASSIFICACION}</span>
        <div class="acciones">
          <button class="editar" data-id="${m._id}">Editar</button>
          <button class="borrar" data-id="${m._id}">Borrar</button>
        </div>
      `;
      lista.appendChild(item);
      clases.add(m.CLASSIFICACION);
    });

    clases.forEach(cl => {
      if (!Array.from(tabs.children).some(btn => btn.textContent === cl)) {
        const btn = document.createElement('button');
        btn.textContent = cl;
        tabs.appendChild(btn);
      }
    });

    // Eventos para los botones "Borrar"
    lista.addEventListener("click", async (e) => {
      if (e.target.classList.contains("borrar")) {
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