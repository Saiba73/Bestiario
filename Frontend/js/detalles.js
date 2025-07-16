window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return alert('ID de monstruo no especificado.');

  // Boton de volver
  document.querySelector('.volver-btn').setAttribute("href", document.referrer);

  try {
    const res = await fetch(`/api/monstruos/${id}`);
    if (!res.ok) throw new Error('Monstruo no encontrado');
    const json = await res.json();
    const m = json.data;

    // Imagen y icono
    document.querySelector('.detalle__img').src = m.IMAGEN;
    document.querySelector('.detalle__icono').src = m.ICONO;

    // Dificultad (estrellas)
    document.querySelector('.detalle__estrellas').textContent =
      '★'.repeat(m.DIFICULTAD) + '☆'.repeat(5 - m.DIFICULTAD);

    // Mostrar nombre y elementos afines en la misma fila
    const nombreContenedor = document.querySelector('.detalle__nombre');
    nombreContenedor.innerHTML = '';

    // Nombre del monstruo
    const nombreTexto = document.createElement('span');
    nombreTexto.textContent = m.NOMBRE;
    nombreTexto.classList.add('detalle__nombre-texto');
    nombreContenedor.appendChild(nombreTexto);

    const elem = [];
    if (m.ELEMENTO_FUEGO) elem.push('Fuego');
    if (m.ELEMENTO_AGUA) elem.push('Agua');
    if (m.ELEMENTO_HIELO) elem.push('Hielo');
    if (m.ELEMENTO_ELECTRICIDAD) elem.push('Trueno');
    if (m.ELEMENTO_DRAGON) elem.push('Dragon');


    // agregar Elementos afines
    elem.forEach(el => {
      const elDiv = document.createElement('div');
      elDiv.classList.add('detalle__elemento');
      elDiv.innerHTML = `
        <img src="../img/Elementos/${el}.png" alt="${el}" class="detalle__elemento-icono">
        <span>${el}</span>
      `;
      nombreContenedor.appendChild(elDiv);
    });

    // Descripción
    document.querySelector('.detalle__descripcion').innerHTML = `
      <p><strong>${m.CLASSIFICACION}</strong></p>
      <p>${m.DESCRIPCION}</p>
    `;

    // Hábitats
    const habs = [];
    if (m.LLANOS_VENTOSOS) habs.push('Windward Plains');
    if (m.BOSQUE_ESCARLATA) habs.push('Scarlet Forest');
    if (m.CUENCA_OLEOSA) habs.push('Oilwell Basin');
    if (m.ACANTILADOS_ESPINAHELADA) habs.push('Icehard Cliffs');
    if (m.RUINAS_WYVERIA) habs.push('Ruins of Wyveria');

    // Agrega Habitats
    const grupos = document.querySelectorAll('.detalle__grupo');
    grupos[0].innerHTML = `<strong>Hábitats:</strong> ${habs.map(h => `
      <span class="detalle__tag">
        <img src="../img/Ubicaciones/${h}.png" alt="${h}" class="detalle__elemento-icono" style="vertical-align: middle; width: 20px; height: 20px; margin-right: 4px;">
        ${h}
      </span>
    `).join('')}`;


    const debs = [];
    if (m.DEBILIDAD_FUEGO) debs.push('Fuego');
    if (m.DEBILIDAD_AGUA) debs.push('Agua');
    if (m.DEBILIDAD_HIELO) debs.push('Hielo');
    if (m.DEBILIDAD_ELECTRICIDAD) debs.push('Trueno');
    if (m.DEBILIDAD_DRAGON) debs.push('Dragon');

    // Agregar Debilidades
    grupos[1].innerHTML = `<strong>Debilidades:</strong> ${debs.map(d => `
      <span class="detalle__tag">
        <img src="../img/Elementos/${d}.png" alt="${d}" class="detalle__elemento-icono" style="vertical-align: middle; width: 20px; height: 20px; margin-right: 4px;">
        ${d}
      </span>
    `).join('')}`;

    // Tips
    document.querySelector('.detalle__tips').innerHTML = `
      <strong>Tips de caza:</strong>
      <p>${m.CONSEJO}</p>
    `;

  } catch (err) {
    console.error(err);
    alert('No se pudo cargar el detalle.');
  }

  // Mostrar botones de edición si hay sesión
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const deleteButton = document.getElementById('detalle__boton-borrar');
  const editButton = document.getElementById('detalle__boton-editar');

  if (isLoggedIn) {
    deleteButton.style.display = 'inline-block';
    editButton.style.display = 'inline-block';

    // Evento borrar
    deleteButton.addEventListener('click', async () => {
      if (!confirm('¿Borrar este monstruo?')) return;
      try {
        const res = await fetch(`/api/monstruos/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          alert('Monstruo eliminado');
          window.location.href = 'index.html';
        } else {
          const err = await res.json();
          alert('Error al borrar: ' + err.message);
        }
      } catch (err) {
        alert('Error al borrar');
        console.error(err);
      }
    });

    // Evento editar
    editButton.addEventListener('click', () => {
      window.location.href = `editar.html?id=${id}`;
    });
  }
});