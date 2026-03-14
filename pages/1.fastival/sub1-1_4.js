(function () {
  const stage = document.getElementById("historyStage");
  const yearEl = document.getElementById("historyYear");
  const prevBtn = document.querySelector(".sec4-history .history-arrow.prev");
  const nextBtn = document.querySelector(".sec4-history .history-arrow.next");

  if (!stage || !yearEl || !prevBtn || !nextBtn) return;

  const historyData = [
    { year: 2024, image: "./src/img/s4/2024빛초롱_수정.png" },
    { year: 2023, image: "./src/img/s4/2023빛초롱.png" },
    { year: 2022, image: "./src/img/s4/2022빛초롱.png" },
    { year: 2021, image: "./src/img/s4/2021빛초롱.png" },
    { year: 2020, image: "./src/img/s4/2020빛초롱.png" },
    { year: 2014, image: "./src/img/s4/2014빛초롱.png" } // 캡처본에 있는 2014년 예시
  ];

  let currentIndex = 0;
  let isAnimating = false;
  const DURATION = 800;

  function createSlide(item, className = "") {
    const slide = document.createElement("div");
    slide.className = `history-slide ${className}`.trim();

    // 사진처럼 흰색 박스 안에 이미지 하나만 들어가는 구조
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

    setTimeout(() => {
      if (currentSlide) {
        currentSlide.classList.remove("active");
        currentSlide.classList.add(direction === "next" ? "exit-next" : "exit-prev");
      }
      nextSlide.classList.add("active");
      updateYear(nextIndex);
    }, 50);

    setTimeout(() => {
      if (currentSlide) currentSlide.remove();
      nextSlide.classList.remove("enter-next", "enter-prev");
      currentIndex = nextIndex;
      isAnimating = false;
    }, DURATION);
  }

  nextBtn.addEventListener("click", () => moveSlide("next"));
  prevBtn.addEventListener("click", () => moveSlide("prev"));

  renderInitial();
})();