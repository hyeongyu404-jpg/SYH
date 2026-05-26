document.addEventListener('DOMContentLoaded', function () {
    // 구역 배치도용 탭 버튼 및 하단 리스트 이미지 패널 수집
    const zoneTabButtons = document.querySelectorAll('.zone-tab-btn');
    const zonePanels = document.querySelectorAll('.zone-panel');

    zoneTabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // 중복 실행 방지
            if (this.classList.contains('active')) return;

            // 1. 모든 배치도용 탭 버튼 활성화 클래스 제거
            zoneTabButtons.forEach(btn => btn.classList.remove('active'));

            // 2. 현재 열려있는 모든 구역 하단 리스트 영역 비노출 숨김
            zonePanels.forEach(panel => panel.classList.remove('active'));

            // 3. 클릭한 타겟 버튼에 active 주입하여 레드로 활성화
            this.classList.add('active');

            // 4. 고유 맵 데이터 속성을 타겟팅하여 이미지 변경 매칭 수행
            const targetZoneId = this.getAttribute('data-zone');
            const targetPanel = document.getElementById(targetZoneId);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});