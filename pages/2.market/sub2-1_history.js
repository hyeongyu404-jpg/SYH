(function () {
  // 1. 필요한 요소 선택
  const stage = document.getElementById("historyStage");
  const yearEl = document.getElementById("historyYear");
  const prevBtn = document.querySelector(".sec4-history .history-arrow.prev");
  const nextBtn = document.querySelector(".sec4-history .history-arrow.next");

  // 요소가 없으면 실행 중단
  if (!stage || !yearEl || !prevBtn || !nextBtn) return;

  // 2. 이미지 데이터 설정 (이미지 파일명과 경로를 확인해 주세요)
  const historyData = [
    { year: 2024, image: "./src/img/sub2-1/imgi_54_2024광화문.png" },
    { year: 2023, image: "./src/img/sub2-1/imgi_55_2023광화문.png" },
    { year: 2022, image: "./src/img/sub2-1/imgi_56_2022광화문.png" }
  ];

  let currentIndex = 0;
  let isAnimating = false;
  const DURATION = 600; // 애니메이션 지속 시간 (ms)

  // 3. 슬라이드 요소 생성 함수
  function createSlide(item, className = "") {
    const slide = document.createElement("div");
    slide.className = `history-slide ${className}`.trim();

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = `${item.year} 광화문 마켓 연혁`;

    slide.appendChild(img);
    return slide;
  }

  // 4. 연도 텍스트 업데이트 및 애니메이션 효과
  function updateYear(index) {
    yearEl.textContent = historyData[index].year;
    yearEl.classList.remove("is-changing");
    void yearEl.offsetWidth; // Reflow 발생시켜 애니메이션 재시작
    yearEl.classList.add("is-changing");
  }

  // 5. 초기 화면 렌더링
  function renderInitial() {
    stage.innerHTML = "";
    const firstSlide = createSlide(historyData[currentIndex], "active");
    stage.appendChild(firstSlide);
    updateYear(currentIndex);
  }

  // 6. 슬라이드 이동 핵심 로직
  function moveSlide(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const currentSlide = stage.querySelector(".history-slide.active");
    let nextIndex;

    // 인덱스 계산 (순환 구조)
    if (direction === "next") {
      nextIndex = currentIndex === historyData.length - 1 ? 0 : currentIndex + 1;
    } else {
      nextIndex = currentIndex === 0 ? historyData.length - 1 : currentIndex - 1;
    }

    // 새 슬라이드 생성 및 삽입
    const nextSlide = createSlide(
      historyData[nextIndex],
      direction === "next" ? "enter-next" : "enter-prev"
    );
    stage.appendChild(nextSlide);

    // 클래스 교체를 통한 애니메이션 실행
    setTimeout(() => {
      if (currentSlide) {
        currentSlide.classList.remove("active");
        currentSlide.classList.add(direction === "next" ? "exit-next" : "exit-prev");
      }
      nextSlide.classList.add("active");
      updateYear(nextIndex);
    }, 50);

    // 애니메이션 종료 후 정리
    setTimeout(() => {
      if (currentSlide) currentSlide.remove();
      nextSlide.classList.remove("enter-next", "enter-prev");
      currentIndex = nextIndex;
      isAnimating = false;
    }, DURATION);
  }

  // 7. 이벤트 리스너 등록
  nextBtn.addEventListener("click", () => moveSlide("next"));
  prevBtn.addEventListener("click", () => moveSlide("prev"));

  // 초기화 실행
  renderInitial();
})();