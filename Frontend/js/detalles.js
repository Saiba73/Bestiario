window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return alert('ID de monstruo no especificado.');

  document.querySelector('.volver-btn').setAttribute("href", document.referrer)
  

  try {
    const res = await fetch(`http://localhost:5000/api/monstruos/${id}`);
    if (!res.ok) throw new Error('Monstruo no encontrado');
    const json = await res.json();
    const m = json.data;

    //Selecciona los nodos
    const imgEl = document.querySelector('.detalle__img');
    const iconEl = document.querySelector('.detalle__icono');

    //Asigna las URLs que vinieron de la API
    imgEl.src  = m.IMAGEN;
    iconEl.src = m.ICONO;

    // Imagen y estrellas
    document.querySelector('.detalle__img').src = m.IMAGEN;
    document.querySelector('.detalle__estrellas').textContent =
      '★'.repeat(m.DIFICULTAD) + '☆'.repeat(5 - m.DIFICULTAD);

    // Título e ícono
    document.querySelector('.detalle__icono').src = m.ICONO;
    document.querySelector('.detalle__nombre').textContent = m.NOMBRE;

    // Descripción
    document.querySelector('.detalle__descripcion').innerHTML = `
      <p><strong>${m.CLASSIFICACION}</strong></p>
      <p>${m.DESCRIPCION}</p>
    `;

    // Elementos (íconos de debilidades)
    const elems = ['Fuego','Agua','Hielo','Trueno','Dragón']
      .filter(e => m[`DEBILIDAD_${e.toUpperCase()}`]);
    document.querySelector('.detalle__elementos').innerHTML = elems
      .map(el => `<img src="../img/Elementos/${el}.png" alt="${el}" class="detalle__elemento-icono">`)
      .join('');

    // Hábitats y debilidades agrupados
    const grupos = document.querySelectorAll('.detalle__grupo');
    const habs = [];
    if (m.LLANOS_VENTOSOS) habs.push('Windward Plains');
    if (m.BOSQUE_ESCARLATA) habs.push('Scarlet Forest');
    if (m.CUENCA_OLEOSA) habs.push('Oilwell Basin');
    if (m.ACANTILADOS_ESPINAHELADA) habs.push('Icehard Cliffs');
    if (m.RUINAS_WYVERIA) habs.push('Ruins of Wyveria');
    grupos[0].innerHTML = `<strong>Hábitats:</strong> ${habs.map(h=>`<span class="detalle__tag">${h}</span>`).join(' ')}`;

    grupos[1].innerHTML = `<strong>Debilidades:</strong> ${elems.map(d=>`<span class="detalle__tag">${d}</span>`).join(' ')}`;

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
    //   const del = await fetch(`http://localhost:5000/api/monstruos/${id}`, { method: 'DELETE' });
    //   if (del.ok) return window.location.href = 'index.html';
    //   alert('Error al borrar');
    // });

    // // Editar
    // document.querySelector('.detalle__boton-editar a').href = `agregar.html?id=${id}`;
