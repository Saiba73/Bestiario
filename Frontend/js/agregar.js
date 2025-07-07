document.querySelector('form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const clasificacion = document.getElementById('clasificacion').value.trim();
  const dificultad = document.getElementById('dificultad').selectedIndex + 1; // 1 a 5
  const desc = document.getElementById('desc').value.trim();
  const tip1 = document.getElementById('tip1').value.trim();
  //const tip2 = document.getElementById('tip2').value.trim();

  const imagenURL = document.getElementById('imagen').value.trim();
  const iconoURL = document.getElementById('icono').value.trim();


  const habitat = {
    LLANOS_VENTOSOS: document.getElementById('habWindward').checked,
    BOSQUE_ESCARLATA: document.getElementById('habScarlet').checked,
    CUENCA_OLEOSA: document.getElementById('habOilwell').checked,
    ACANTILADOS_ESPINAHELADA: document.getElementById('habIcehard').checked
  };

    const elementos = {
    ELEMENTO_FUEGO: document.getElementById('elemFuego').checked ? 1 : 0,
    ELEMENTO_AGUA: document.getElementById('elemAgua').checked ? 1 : 0,
    ELEMENTO_HIELO: document.getElementById('elemHielo').checked ? 1 : 0,
    ELEMENTO_ELECTRICIDAD: document.getElementById('elemTrueno').checked ? 1 : 0,
    ELEMENTO_DRAGON: document.getElementById('elemDragon').checked ? 1 : 0
  };

  const debilidades = {
    DEBILIDAD_FUEGO: document.getElementById('debFuego').checked ? 1 : 0,
    DEBILIDAD_AGUA: document.getElementById('debAgua').checked ? 1 : 0,
    DEBILIDAD_HIELO: document.getElementById('debHielo').checked ? 1 : 0,
    DEBILIDAD_ELECTRICIDAD: document.getElementById('debTrueno').checked ? 1 : 0,
    DEBILIDAD_DRAGON: document.getElementById('debDragon').checked ? 1 : 0
  };

  const monstruo = {
    NOMBRE: nombre,
    CLASSIFICACION: clasificacion,
    DIFICULTAD: dificultad,
    DESCRIPCION: desc,
    CONSEJO: tip1.trim(),
    IMAGEN: imagenURL,
    ICONO: iconoURL,
    ...habitat,
    ...elementos,
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
      alert("No se pudo crear el monstruo: " + data.message);
    }
  } catch (err) {
    console.error("Error enviando monstruo:", err.message);
    alert("Error del servidor");
  }
});