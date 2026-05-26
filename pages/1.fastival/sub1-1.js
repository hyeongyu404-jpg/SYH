
const slider = document.getElementById('socialSlider');
const track = document.getElementById('socialTrack');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const cards = document.querySelectorAll('.social-card');

const gap = 24;

let cardWidth = 0;
let visibleCards = 0;
let maxIndex = 0;

let currentIndex = 0;
let isDragging = false;
let startX = 0;
let startTranslate = 0;
let currentTranslate = 0;
let moved = false;

function calculateSlider() {
  if (!cards.length) return;

  cardWidth = cards[0].offsetWidth + gap;
  visibleCards = Math.floor((slider.offsetWidth + gap) / cardWidth);
  maxIndex = Math.max(0, cards.length - visibleCards);
}

function updateButtons() {
  if (currentIndex <= 0) {
    prevBtn.classList.add('disabled');
  } else {
    prevBtn.classList.remove('disabled');
  }

  if (currentIndex >= maxIndex) {
    nextBtn.classList.add('disabled');
  } else {
    nextBtn.classList.remove('disabled');
  }
}

function updateSlider() {
  currentTranslate = -(currentIndex * cardWidth);
  track.style.transform = `translateX(${currentTranslate}px)`;
  updateButtons();
}

prevBtn.addEventListener('click', () => {
  if (currentIndex <= 0) return;
  currentIndex -= 1;
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  if (currentIndex >= maxIndex) return;
  currentIndex += 1;
  updateSlider();
});

slider.addEventListener('mousedown', (e) => {
  isDragging = true;
  moved = false;
  slider.classList.add('dragging');
  startX = e.clientX;
  startTranslate = currentTranslate;
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const diff = e.clientX - startX;
  if (Math.abs(diff) > 5) moved = true;

  currentTranslate = startTranslate + diff;
  track.style.transform = `translateX(${currentTranslate}px)`;
});

window.addEventListener('mouseup', () => {
  if (!isDragging) return;

  isDragging = false;
  slider.classList.remove('dragging');

  const snappedIndex = Math.round(Math.abs(currentTranslate) / cardWidth);
  currentIndex = Math.min(Math.max(snappedIndex, 0), maxIndex);
  updateSlider();
});

cards.forEach((card) => {
  card.addEventListener('click', (e) => {
    if (moved) {
      e.preventDefault();
    }
  });
});

window.addEventListener('resize', () => {
  calculateSlider();
  currentIndex = Math.min(currentIndex, maxIndex);
  updateSlider();
});

window.addEventListener('load', () => {
  calculateSlider();
  updateSlider();
});


// sec4
const historyData = [
  { year: 2024, image: "./pages/1.fastival/src/img/s4/2024빛초롱_수정.png" },
  { year: 2023, image: "./pages/1.fastival/src/img/s4/2023빛초롱.png" },
  { year: 2022, image: "./pages/1.fastival/src/img/s4/2022빛초롱.png" },
  { year: 2021, image: "./pages/1.fastival/src/img/s4/2021빛초롱.png" },
  { year: 2020, image: "./pages/1.fastival/src/img/s4/2020빛초롱.png" },
  { year: 2019, image: "./pages/1.fastival/src/img/s4/2019빛초롱.png" },
  { year: 2018, image: "./pages/1.fastival/src/img/s4/2018빛초롱.png" },
  { year: 2017, image: "./pages/1.fastival/src/img/s4/2017빛초롱.png" },
  { year: 2016, image: "./pages/1.fastival/src/img/s4/2016빛초롱.png" },
  { year: 2015, image: "./pages/1.fastival/src/img/s4/2015빛초롱.png" },
  { year: 2014, image: "./pages/1.fastival/src/img/s4/2014빛초롱.png" },
  { year: 2013, image: "./pages/1.fastival/src/img/s4/2013빛초롱.png" },
  { year: 2012, image: "./pages/1.fastival/src/img/s4/2012빛초롱.png" },
  { year: 2011, image: "./pages/1.fastival/src/img/s4/2011빛초롱.png" },
  { year: 2010, image: "./pages/1.fastival/src/img/s4/2010빛초롱.png" },
  { year: 2009, image: "./pages/1.fastival/src/img/s4/2009빛초롱.png" }
];
const stage = document.getElementById("historyStage");
const yearEl = document.getElementById("historyYear");
const prevBtn = document.querySelector(".history-arrow.prev");
const nextBtn = document.querySelector(".history-arrow.next");

let currentIndex = 0;
let isAnimating = false;
const DURATION = 700;

function createSlide(item, className = "") {
  const slide = document.createElement("div");
  slide.className = `history-slide ${className}`.trim();

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = `${item.year} 행사 연혁`;

  slide.appendChild(img);
  return slide;
}

function updateYear(index) {
  yearEl.textContent = historyData[index].year;
  yearEl.classList.remove("is-changing");
  void yearEl.offsetWidth;
  yearEl.classList.add("is-changing");
}

function renderInitial() {
  stage.innerHTML = "";

  const firstSlide = createSlide(historyData[currentIndex], "active");
  stage.appendChild(firstSlide);
  yearEl.textContent = historyData[currentIndex].year;
}

function moveSlide(direction) {
  if (isAnimating) return;
  isAnimating = true;

  const currentSlide = stage.querySelector(".history-slide.active");
  let nextIndex;

  if (direction === "next") {
    nextIndex = currentIndex === historyData.length - 1 ? 0 : currentIndex + 1;
  } else {
    nextIndex = currentIndex === 0 ? historyData.length - 1 : currentIndex - 1;
  }

  const nextSlide = createSlide(
    historyData[nextIndex],
    direction === "next" ? "enter-next" : "enter-prev"
  );

  stage.appendChild(nextSlide);

  requestAnimationFrame(() => {
    nextSlide.classList.add("active");

    if (currentSlide) {
      currentSlide.classList.remove("active");
      currentSlide.classList.add(direction === "next" ? "exit-next" : "exit-prev");
    }

    updateYear(nextIndex);
  });

  setTimeout(() => {
    if (currentSlide && currentSlide.parentNode) {
      currentSlide.remove();
    }

    nextSlide.classList.remove("enter-next", "enter-prev");
    nextSlide.classList.add("active");

    currentIndex = nextIndex;
    isAnimating = false;
  }, DURATION);
}

nextBtn.addEventListener("click", () => moveSlide("next"));
prevBtn.addEventListener("click", () => moveSlide("prev"));

renderInitial();