const vocabRevealState = {}; // Guarda los índices revelados por tarjeta
let currentSlideIndex = 0;

function toggleImage(el) {
  const card = el.closest('.vocab-card');
  const circles = card.querySelectorAll('.circle');

  // Lee los índices a revelar desde data-reveal
  const revealAttr = el.getAttribute('data-reveal');
  const revealIndices = revealAttr ? revealAttr.split(',').map(Number) : [];
  const cardIndex = Array.from(document.querySelectorAll('.vocab-card')).indexOf(card);

  // Inicializa estado
  if (!vocabRevealState[cardIndex]) {
    vocabRevealState[cardIndex] = new Set();
  }

  const revealedSet = vocabRevealState[cardIndex];
  const revealedCount = revealedSet.size;

  const groupStart = Math.min(...revealIndices);
  const groupEnd = Math.max(...revealIndices);
  const allGroupRevealed = revealIndices.every(idx => circles[idx]?.classList.contains('revealed'));

  // REVELAR
  if (!allGroupRevealed) {
    if (groupStart !== revealedCount) return; // Debe ir en orden

    revealIndices.forEach(idx => {
      revealedSet.add(idx);
      circles[idx]?.classList.add('revealed');
    });

  // OCULTAR
  } else {
    if (groupEnd !== revealedCount - 1) return; // Solo puede ocultarse el último grupo

    revealIndices.forEach(idx => {
      revealedSet.delete(idx);
      circles[idx]?.classList.remove('revealed');
    });
  }

  // Mostrar u ocultar imagen final
  const finalImage = card.querySelector('.final-image');
  if (revealedSet.size === circles.length) {
    if (finalImage) finalImage.style.display = 'block';
  } else {
    if (finalImage) finalImage.style.display = 'none';
  }
}




function resetImageReveal() {
  const card = document.querySelector('.vocab-card.active');
  if (!card) return;

  card.querySelectorAll('.circle').forEach(c => c.classList.remove('revealed'));
}
											   
function adjustGridColumns() {
  document.querySelectorAll('.containermov').forEach(container => {
    const totalCircles = container.querySelectorAll('.circle').length;
    const columns = Math.min(totalCircles, 6);
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    container.style.gap = '10px';
  });
}

  // Seccion del Color Chart
  const chartIcons = document.querySelectorAll('.chart-icon');
  const selectedIconsContainer = document.getElementById('selectedIcons');
  const clearIconsBtn = document.getElementById('clearIconsBtn');
  const enterLineBtn = document.getElementById('enterLineBtn');

enterLineBtn.addEventListener('click', () => {
  const lineBreaks = selectedIconsContainer.querySelectorAll('.line-break').length;

  if (lineBreaks >= 4) {
    return;
  }

  const spacer = document.createElement('div');
  spacer.classList.add('line-break');
  selectedIconsContainer.appendChild(spacer);
});
chartIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const totalIcons = selectedIconsContainer.querySelectorAll('img').length;

    if (totalIcons >= 30) {
      return;
    }

    const clone = icon.cloneNode(true);
    selectedIconsContainer.appendChild(clone);
  });
});

  clearIconsBtn.addEventListener('click', () => {
    selectedIconsContainer.innerHTML = '';
  });

document.getElementById('clearIconsBtn').addEventListener('click', () => {
  selectedIconsContainer.innerHTML = '';
});

document.getElementById('undoIconBtn').addEventListener('click', () => {
  const icons = selectedIconsContainer.querySelectorAll('img');
  if (icons.length > 0) {
    selectedIconsContainer.removeChild(icons[icons.length - 1]);
  }
});
  function playAudio(file) {
    const audio = new Audio(file);
    audio.play();
  }
