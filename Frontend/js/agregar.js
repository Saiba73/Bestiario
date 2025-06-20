document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const iconInput = document.getElementById('icon');
  const iconFile = iconInput.files[0];
  const iconURL = iconFile ? URL.createObjectURL(iconFile) : 'ruta/por/defecto.png';
  
  const name = document.getElementById('name').value.trim();
  const clasificacion = document.getElementById('clasificacion').value.trim();
  const dificultad = document.getElementById('dificultad').value;
  const desc = document.getElementById('desc').value;
  const tip1 = document.getElementById('tip1').value;
  const tip2 = document.getElementById('tip2').value;

  // Simula la carga de imagen y icono
  const image = 'img/default.png';
  const icon = 'img/default_icon.png';

  const elementos = [];
  document.querySelectorAll('#elFuego, #debAgua, #debHielo, #debTrueno, #debDragon').forEach(e => {
    if (e.checked) elementos.push(e.nextElementSibling.innerText);
  });

  const debilidades = [];
  document.querySelectorAll('#debFuego, #debAgua, #debHielo, #debTrueno, #debDragon').forEach(e => {
    if (e.checked) debilidades.push(e.nextElementSibling.innerText);
  });

  const habitat = [];
  document.querySelectorAll('#habWindward, #habScarlet, #habOilwell, #habIcehard, #habRuins').forEach(e => {
    if (e.checked) habitat.push(e.nextElementSibling.innerText);
  });

  const monstruo = {
    id: Date.now(),
    name,
    clasificacion,
    dificultad,
    desc,
    tip1,
    tip2,
    image,
    icon,
    elementos,
    debilidades,
    habitat
  };

  const monstruos = JSON.parse(localStorage.getItem('monstruos')) || [];
  monstruos.push(monstruo);
  localStorage.setItem('monstruos', JSON.stringify(monstruos));

  window.location.href = 'index.html';
});
