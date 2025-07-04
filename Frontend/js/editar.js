window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return alert('ID de monstruo no especificado.');

  try {
    
    const res = await fetch(`http://localhost:5000/api/monstruos/${id}`);
    if (!res.ok) throw new Error('Monstruo no encontrado');

    const responseJson = await res.json();
    const monstruo = responseJson.data;

    console.log("Monstruo:", monstruo);
    console.log(monstruo.NOMBRE);

    document.getElementById('nombre').value = monstruo.NOMBRE;
    document.getElementById('clasificacion').value = monstruo.CLASSIFICACION;
    document.getElementById('imagen').value = monstruo.IMAGEN;
    document.getElementById('icono').value = monstruo.ICONO;
    document.getElementById('desc').value = monstruo.DESCRIPCION;
    document.getElementById('tip1').value = monstruo.CONSEJO;

    document.getElementById('dificultad').selectedIndex = monstruo.DIFICULTAD - 1;

    document.getElementById('debFuego').checked = monstruo.DEBILIDAD_FUEGO == 1;
    document.getElementById('debAgua').checked = monstruo.DEBILIDAD_AGUA == 1;
    document.getElementById('debTrueno').checked = monstruo.DEBILIDAD_ELECTRICIDAD == 1;
    document.getElementById('debHielo').checked = monstruo.DEBILIDAD_HIELO == 1;
    document.getElementById('debDragon').checked = monstruo.DEBILIDAD_DRAGON == 1;

    document.getElementById('habWindward').checked = monstruo.LLANOS_VENTOSOS == true;
    document.getElementById('habScarlet').checked = monstruo.BOSQUE_ESCARLATA == true;
    document.getElementById('habOilwell').checked = monstruo.CUENCA_OLEOSA == true;
    document.getElementById('habIcehard').checked = monstruo.ACANTILADOS_ESPINAHELADA == true;

  } catch (error) {
    alert(`Error del servidor: ${error.message}`);
    console.log(error.message)
  }

  //Aqui se guardan los datos en la base de datos

  document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const nombre = document.getElementById('nombre').value.trim();
    const clasificacion = document.getElementById('clasificacion').value.trim();
    const dificultad = document.getElementById('dificultad').selectedIndex + 1;
    const desc = document.getElementById('desc').value.trim();
    const tip1 = document.getElementById('tip1').value.trim();
  
    const imagenURL = document.getElementById('imagen').value.trim();
    const iconoURL = document.getElementById('icono').value.trim();
  
  
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
      NOMBRE: nombre,
      CLASSIFICACION: clasificacion,
      DIFICULTAD: dificultad,
      DESCRIPCION: desc,
      CONSEJO: tip1.trim(),
      IMAGEN: imagenURL,
      ICONO: iconoURL,
      ...habitat,
      ...debilidades
    };
  
    try {
      const res = await fetch(`http://localhost:5000/api/monstruos/${id}`, {
        method: "put",
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
  
 
});

