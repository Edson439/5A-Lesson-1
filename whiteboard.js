  const canvas = document.getElementById('whiteboardCanvas');
  const ctx = canvas.getContext('2d');
  const colorPicker = document.getElementById('colorPicker');
  const brushSize = document.getElementById('brushSize');
  const clearBoard = document.getElementById('clearBoard');

  let painting = false;



  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('load', resizeCanvas);

canvas.addEventListener('mousedown', (e) => {
  painting = true;

  const rect = canvas.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
});
canvas.addEventListener('mouseup', () => {
  painting = false;
  ctx.beginPath();
});
canvas.addEventListener('mouseleave', () => {
  painting = false;
  ctx.beginPath();
});
  canvas.addEventListener('mousemove', draw);

let lastX = 0;
let lastY = 0;

function draw(e) {
  if (!painting) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.strokeStyle = colorPicker.value;
  ctx.lineWidth = brushSize.value;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
}
  

  clearBoard.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width;
  canvas.height = rect.height;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}
document.getElementById('menuWhiteboard').addEventListener('click', () => {
  setTimeout(() => resizeCanvas(), 50); // Espera un poco para asegurar que el DOM ya lo muestra
});
