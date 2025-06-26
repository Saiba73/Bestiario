document.querySelector('form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const clasificacion = document.getElementById('clasificacion').value.trim();
  const dificultad = document.getElementById('dificultad').selectedIndex + 1; // 1 a 5
  const desc = document.getElementById('desc').value.trim();
  const tip1 = document.getElementById('tip1').value.trim();
  const tip2 = document.getElementById('tip2').value.trim();

  const image = document.getElementById('imageURL').value.trim();
  const icon = document.getElementById('iconURL').value.trim();

  const habitat = {
    LLANOS_VENTOSOS: document.getElementById('habWindward').checked,
    BOSQUE_ESCARLATA: document.getElementById('habScarlet').checked,
    CUENCA_OLEOSA: document.getElementById('habOilwell').checked,
    ACANTILADOS_ESPINAHELADA: document.getElementById('habIcehard').checked
  };

  const debilidades = {
    DEBILIDAD_FUEGO: document.getElementById('debFuego').checked ? 1 : 0,
    DEBILIDAD_AGUA: document.getElementById('debAgua').checked ? 1 : 0,
    DEBILIDAD_HIELO: document.getElementById('debHielo').checked ? 1 : 0,
    DEBILIDAD_ELECTRICIDAD: document.getElementById('debTrueno').checked ? 1 : 0,
    DEBILIDAD_DRAGON: document.getElementById('debDragon').checked ? 1 : 0
  };

  const monstruo = {
    NOMBRE: name,
    CLASSIFICACION: clasificacion,
    DIFICULTAD: dificultad,
    DESCRIPCION: desc,
    CONSEJO: `${tip1} ${tip2}`.trim(),
    IMAGEN: image,
    ICONO: icon,
    ...habitat,
    ...debilidades
  };

  try {
    const res = await fetch("http://localhost:5000/api/monstruos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(monstruo)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Monstruo creado exitosamente");
      window.location.href = "index.html";
    } else {
      alert("Error: " + data.message);
    }
  } catch (err) {
    console.error("Error enviando monstruo:", err.message);
    alert("Error del servidor");
  }
});