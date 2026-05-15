(function () {
  const stage = document.getElementById("historyStage");
  const yearEl = document.getElementById("historyYear");
  const prevBtn = document.querySelector(".sec4-history .history-arrow.prev");
  const nextBtn = document.querySelector(".sec4-history .history-arrow.next");

  if (!stage || !yearEl || !prevBtn || !nextBtn) return;

  // 이미지 파일 리스트를 기반으로 경로와 이름을 정확히 매칭했습니다.
  const historyData = [
    { year: 2024, image: "./src/img/s4/2024빛초롱_수정.png" },
    { year: 2023, image: "./src/img/s4/2023빛초롱.png" },
    { year: 2022, image: "./src/img/s4/2022빛초롱.png" },
    { year: 2021, image: "./src/img/s4/2021빛초롱.png" },
    { year: 2020, image: "./src/img/s4/2020빛초롱.png" },
    { year: 2019, image: "./src/img/s4/2019빛초롱.png" },
    { year: 2018, image: "./src/img/s4/2018빛초롱.png" },
    { year: 2017, image: "./src/img/s4/2017빛초롱.png" },
    { year: 2016, image: "./src/img/s4/2016빛초롱.png" },
    { year: 2015, image: "./src/img/s4/2015빛초롱.png" },
    { year: 2014, image: "./src/img/s4/2014빛초롱.png" },
    { year: 2013, image: "./src/img/s4/2013빛초롱.png" },
    { year: 2012, image: "./src/img/s4/2012빛초롱.png" },
    { year: 2011, image: "./src/img/s4/2011빛초롱.png" },
    { year: 2010, image: "./src/img/s4/2010빛초롱.png" },
    { year: 2009, image: "./src/img/s4/2009빛초롱.png" }
  ];

  let currentIndex = 0;
  let isAnimating = false;
  const DURATION = 600;

  function createSlide(item, className = "") {
    const slide = document.createElement("div");
    slide.className = `history-slide ${className}`.trim();

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = `${item.year} 연혁 이미지`;

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
    updateYear(currentIndex);
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