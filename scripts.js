const arrowUp = document.querySelector('.arrow.up');
const arrowDown = document.querySelector('.arrow.down');
const introSound = new Audio("audios/intro.mp3");
introSound.loop = false;
introSound.volume = 0.3;
let introPlayed = false;
let introFadeInterval = null;
let introStopTimeout = null;

function clearIntroTimers() {
  if (introFadeInterval) {
    clearInterval(introFadeInterval);
    introFadeInterval = null;
  }

  if (introStopTimeout) {
    clearTimeout(introStopTimeout);
    introStopTimeout = null;
  }
}

function fadeOutIntroSound(callback) {
  clearIntroTimers();

  introFadeInterval = setInterval(() => {
    if (introSound.volume > 0.05) {
      introSound.volume -= 0.05;
    } else {
      clearInterval(introFadeInterval);
      introFadeInterval = null;
      introSound.pause();
      introSound.currentTime = 0;
      introSound.volume = 0.3;
      if (callback) callback();
    }
  }, 100);
}

function playPracticeIntro() {
  clearIntroTimers();

  introSound.pause();
  introSound.currentTime = 0;
  introSound.volume = 0;

  introSound.play().catch(() => {});

  let vol = 0;
  introFadeInterval = setInterval(() => {
    if (vol < 0.3) {
      vol += 0.02;
      introSound.volume = Math.min(vol, 0.3);
    } else {
      clearInterval(introFadeInterval);
      introFadeInterval = null;
    }
  }, 100);

  introStopTimeout = setTimeout(() => {
    fadeOutIntroSound();
  }, 5000);
}
// Hover: cambia iconos a version _2.png
document.querySelectorAll('.menu-item').forEach(item => {
  const img = item.querySelector('img');
  if (!img) return;

  const originalSrc = img.getAttribute('src');
  const hoverSrc = originalSrc.replace('.png', '_2.png');

  item.addEventListener('mouseenter', () => img.setAttribute('src', hoverSrc));
  item.addEventListener('mouseleave', () => {
    if (!item.classList.contains('active')) img.setAttribute('src', originalSrc);
  });
});

// Botones del menu
const menuVocabulary = document.getElementById('menuVocabulary');
const menuReading = document.getElementById('menuReading');
const menuPractice = document.getElementById('menuPractice');
const menuColorChart = document.getElementById('menuColorChart');
const menuWhiteboard = document.getElementById('menuWhiteboard');
const menuStudent = document.getElementById('menuStudent');

// Navegacion por secciones
menuVocabulary.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('vocabulary');
});

menuReading.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('reading');
});

menuPractice.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('practice');
});

menuColorChart.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('colorChart');
});

menuWhiteboard.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('whiteboard');
});


menuStudent.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('student');
});


function showSection(sectionToShow) {

  const sections = [
    'vocabularyContent',
    'readingContent',
    'practiceContent',
    'colorChartContent',
    'whiteboardContent',
    'studentContent'
  ];

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

const arrows = document.querySelector('.arrows');
const helpBtn = document.getElementById("practiceHelpFloat");

if (helpBtn) {
  helpBtn.style.display = "none";
}
if (
  sectionToShow === 'colorChart' ||
  sectionToShow === 'student' ||
  sectionToShow === 'whiteboard' ||
  sectionToShow === 'practice' ||
  sectionToShow === 'vocabulary'
) {
    arrows.style.display = 'none';
  } else {
    arrows.style.display = 'flex';
  }

  const activeContent = document.getElementById(sectionToShow + 'Content');
  if (activeContent) {
    activeContent.style.display = 'block';
  }

  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.remove('active');
    const img = item.querySelector('img');
    if (img) {
      img.setAttribute('src', img.getAttribute('src').replace('_2.png', '.png'));
    }
  });

  const activeMenu = document.getElementById('menu' + capitalize(sectionToShow));
  if (activeMenu) {
    activeMenu.classList.add('active');
    const img = activeMenu.querySelector('img');
    if (img) {
      img.setAttribute('src', img.getAttribute('src').replace('.png', '_2.png'));
    }
  }

  document.querySelectorAll('.mobile-item').forEach(item => {
    item.classList.remove('active');
    const img = item.querySelector('img');
    if (img) {
      img.setAttribute('src', img.getAttribute('src').replace('_2.png', '.png'));
    }
  });

  const activeMobile = document.getElementById('mobile' + capitalize(sectionToShow));
  if (activeMobile) {
    activeMobile.classList.add('active');
    const img = activeMobile.querySelector('img');
    if (img) {
      img.setAttribute('src', img.getAttribute('src').replace('.png', '_2.png'));
    }
  }

  generateDotsFor(sectionToShow);

  // AUDIO SOLO EN PRACTICE
  // AUDIO SOLO EN PRACTICE
  if (sectionToShow === 'practice') {
    if (!introPlayed) {
      playPracticeIntro();
      introPlayed = true;
    }
  } else {
    fadeOutIntroSound();
    introPlayed = false;
  }
}

// Funcion para capitalizar primera letra
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Tarjetas por sección
const sectionCards = {
  vocabulary: {
    container: document.getElementById('vocabularyContent'),
    get cards() {
      return document.querySelectorAll('#vocabularyContent .vocab-card');
    },
    index: 0
  },
  reading: {
    container: document.getElementById('readingContent'),
    get cards() {
      return document.querySelectorAll('#readingContent .vocab-card');
    },
    index: 0
  },
  practice: {
    container: document.getElementById('practiceContent'),
    get cards() {
      return document.querySelectorAll('#practiceContent .vocab-card');
    },
    index: 0
  },
  colorChart: {
    container: document.getElementById('colorChartContent'),
    get cards() {
      return document.querySelectorAll('#colorChartContent .vocab-card');
    },
    index: 0
  },
  student: {
    container: document.getElementById('studentContent'),
    get cards() {
      return document.querySelectorAll('#studentContent .vocab-card');
    },
    index: 0
  }
};
// Mostrar tarjeta activa
function showCard(section) {
  const s = sectionCards[section];
  if (!s) return;

  s.cards.forEach((card, i) => {
    card.classList.toggle('active', i === s.index);
  });
}

const dotsContainer = document.getElementById('dotsContainer');

function generateDotsFor(section) {
  if (!dotsContainer) return;

  dotsContainer.innerHTML = '';

  if (section === 'student' || section === 'practice' || section === 'whiteboard' || section === 'vocabulary') {
    dotsContainer.style.display = 'none';
    return;
  } else {
    dotsContainer.style.display = 'flex';
  }

  let items = [];

  if (sectionCards[section]) {
    items = sectionCards[section].cards;
  }

  items.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');

    if (sectionCards[section] && index === sectionCards[section].index) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', () => {
      sectionCards[section].index = index;
      showCard(section);
      generateDotsFor(section);
    });

    dotsContainer.appendChild(dot);
  });
}

function getActiveSection() {
  const sections = {
    vocabulary: 'vocabularyContent',
    reading: 'readingContent',
    practice: 'practiceContent',
    colorChart: 'colorChartContent',
    whiteboard: 'whiteboardContent',
    student: 'studentContent'
  };

  for (let key in sections) {
    const el = document.getElementById(sections[key]);
    if (el && el.style.display === 'block') return key;
  }

  return 'vocabulary';
}

// Flechas
arrowUp.addEventListener('click', () => {
  const section = getActiveSection();

  if (sectionCards[section]) {
    const sec = sectionCards[section];

    if (['vocabulary', 'reading', 'practice'].includes(section)) {
      if (sec.index > 0) {
        sec.index--;
        showCard(section);
        generateDotsFor(section);
      }
    } else {
      sec.index = (sec.index - 1 + sec.cards.length) % sec.cards.length;
      showCard(section);
      generateDotsFor(section);
    }
  }
});

arrowDown.addEventListener('click', () => {
  const section = getActiveSection();

  if (sectionCards[section]) {
    const sec = sectionCards[section];

    if (['vocabulary', 'reading', 'practice'].includes(section)) {
      if (sec.index < sec.cards.length - 1) {
        sec.index++;
        showCard(section);
        generateDotsFor(section);
      }
    } else {
      sec.index = (sec.index + 1) % sec.cards.length;
      showCard(section);
      generateDotsFor(section);
    }
  }
});

let isSoundActive = false; // Estado inicial: apagado

const toggleSoundBtn = document.getElementById('toggleSoundBtn');

if (toggleSoundBtn) {
  toggleSoundBtn.classList.remove('sound-active');
  const icon = toggleSoundBtn.querySelector('i');
  if (icon) icon.textContent = 'volume_off';

  toggleSoundBtn.addEventListener('click', () => {
    isSoundActive = !isSoundActive;

    toggleSoundBtn.classList.toggle('sound-active', isSoundActive);
    const icon = toggleSoundBtn.querySelector('i');
    if (icon) {
      icon.textContent = isSoundActive ? 'volume_up' : 'volume_off';
    }
  });
}

// Escucha solo los íconos en el Color Chart
document.querySelectorAll('#colorChartContent .chart-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const colorChart = document.getElementById('colorChartContent');
    if (!colorChart || colorChart.style.display === 'none') return;
    if (!isSoundActive) return;

    const soundNumber = icon.getAttribute('data-sound').padStart(2, '0');
    const audio = new Audio(`CC/sounds/CC${soundNumber}.mp3`);
    audio.play();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  showSection('vocabulary');
});