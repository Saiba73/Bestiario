window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return alert('ID de monstruo no especificado.');

  // Botón de volver usa el referrer
  document.querySelector('.volver-btn').setAttribute("href", document.referrer);

  try {
    const res = await fetch(`http://localhost:5000/api/monstruos/${id}`);
    if (!res.ok) throw new Error('Monstruo no encontrado');
    const json = await res.json();
    const m = json.data;

    // Imagen e ícono
    document.querySelector('.detalle__img').src = m.IMAGEN;
    document.querySelector('.detalle__icono').src = m.ICONO;

    // Dificultad (estrellas)
    document.querySelector('.detalle__estrellas').textContent =
      '★'.repeat(m.DIFICULTAD) + '☆'.repeat(5 - m.DIFICULTAD);

    // Elementos y debilidades
    // const elementosDisponibles = ['Fuego', 'Agua', 'Hielo', 'Trueno', 'Dragon'];
    // const elementosAfines = elementosDisponibles.filter(e => m[`ELEMENTO_${e.toUpperCase()}`]);
    // const elementosDebiles = elementosDisponibles.filter(e => m[`DEBILIDAD_${e.toUpperCase()}`]);


    // Mostrar nombre + elementos afines en la misma fila
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


    // Elementos afines (junto al nombre)
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

    // Añade íconos al lado del nombre del hábitat
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

    // Debilidades en grupo con ícono + nombre
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
});

 // // Borrar
    // document.querySelector('.detalle__boton-borrar').addEventListener('click', async () => {
    //   if (!confirm('¿Borrar este monstruo?')) return;
    //   const del = await fetch(http://localhost:5000/api/monstruos/${id}, { method: 'DELETE' });
    //   if (del.ok) return window.location.href = 'index.html';
    //   alert('Error al borrar');
    // });

    // // Editar
    // document.querySelector('.detalle__boton-editar a').href = agregar.html?id=${id};
