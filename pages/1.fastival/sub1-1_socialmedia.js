(function () {
  const slider = document.getElementById('socialSlider');
  const track = document.getElementById('socialTrack');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const cards = document.querySelectorAll('.social-card');

  if (!slider || !track || !prevBtn || !nextBtn) return;

  const gap = 24;
  let cardWidth = 0;
  let visibleWidth = 0;
  let maxIndex = 0;
  let currentIndex = 0;

  // 드래그 관련 변수
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  let moved = false;

  // 1. 초기화 함수
  function init() {
    if (!cards.length) return;
    
    const rect = cards[0].getBoundingClientRect();
    cardWidth = rect.width + gap; 
    visibleWidth = slider.offsetWidth;
    
    // 화면에 보이는 카드 개수 계산 및 maxIndex 설정
    const visibleCount = Math.round((visibleWidth + gap) / cardWidth);
    maxIndex = Math.max(0, cards.length - visibleCount);
    
    // 리사이즈 시 인덱스 유효성 검사
    currentIndex = Math.min(currentIndex, maxIndex);
    
    updateSlider(false);
  }

  // 2. 슬라이더 이동 실행
  function updateSlider(withTransition = true) {
    track.style.transition = withTransition ? 'transform 0.35s ease' : 'none';
    
    currentTranslate = -(currentIndex * cardWidth);
    
    // 슬라이더 범위 끝 제한 (여백 방지)
    const maxTranslate = -((cards.length * cardWidth) - gap - visibleWidth);
    if (currentTranslate < maxTranslate) currentTranslate = maxTranslate;
    
    setSliderPosition();
    prevTranslate = currentTranslate; 
    updateButtons();
  }

  function setSliderPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  // 3. 버튼 상태 업데이트
  function updateButtons() {
    currentIndex <= 0 ? prevBtn.classList.add('disabled') : prevBtn.classList.remove('disabled');
    currentIndex >= maxIndex ? nextBtn.classList.add('disabled') : nextBtn.classList.remove('disabled');
  }

  // 4. 드래그 함수 (즉각 반응 및 스냅 로직 강화)
  function dragStart(e) {
    if (e.button !== 0) return; // 왼쪽 클릭만 허용

    isDragging = true;
    moved = false;
    startX = e.clientX;
    
    track.style.transition = 'none';
    prevTranslate = currentTranslate; // 현재 위치에서 드래그 시작
    
    slider.classList.add('dragging');
    animationID = requestAnimationFrame(animation);
  }

  function dragAction(e) {
    if (!isDragging) return;

    const currentX = e.clientX;
    const diff = currentX - startX;
    
    if (Math.abs(diff) > 2) moved = true; // 2px 이상 움직이면 드래그 상태
    
    currentTranslate = prevTranslate + diff;
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);
    slider.classList.remove('dragging');

    // [개선된 로직] 드래그가 끝난 지점에서 가장 가까운 카드 인덱스 계산
    const movedBy = currentTranslate - prevTranslate;
    const exactIndex = Math.abs(currentTranslate) / cardWidth;
    
    let targetIndex = currentIndex;

    // 일정 거리(50px) 이상 밀었을 때 방향에 따라 인덱스 변경
    if (movedBy < -50) { 
      targetIndex = Math.ceil(exactIndex); // 왼쪽으로 밀면 다음 카드
    } else if (movedBy > 50) {
      targetIndex = Math.floor(exactIndex); // 오른쪽으로 밀면 이전 카드
    } else {
      targetIndex = Math.round(exactIndex); // 아주 미세하게 움직이면 가까운 쪽으로 붙기
    }

    // 인덱스 범위 제한 및 적용
    currentIndex = Math.min(Math.max(targetIndex, 0), maxIndex);

    updateSlider(); 
  }

  function animation() {
    setSliderPosition();
    if (isDragging) animationID = requestAnimationFrame(animation);
  }

  // 5. 버튼 이벤트 리스너
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) { currentIndex--; updateSlider(); }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) { currentIndex++; updateSlider(); }
  });

  // 슬라이더 마우스 이벤트 등록
  slider.addEventListener('mousedown', dragStart);
  window.addEventListener('mousemove', dragAction);
  window.addEventListener('mouseup', dragEnd);

  // 6. 카드 기본 동작 및 드래그 간섭 제어
  cards.forEach(card => {
    // 이미지/링크 드래그 시 고스트 이미지 생성 방지
    card.addEventListener('dragstart', (e) => e.preventDefault());

    // 드래그 도중 손을 뗐을 때 링크가 클릭되는 것 방지
    card.addEventListener('click', (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });

  // 7. 리사이즈 및 로드 초기화
  window.addEventListener('resize', init);
  window.addEventListener('load', init);
  
  init();
})();