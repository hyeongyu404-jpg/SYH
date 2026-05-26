document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const zoneImages = document.querySelectorAll('.zone-img');

    tabButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-idx'));

            // 탭 active 교체
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 이미지 active 교체
            zoneImages.forEach(img => img.classList.remove('active'));
            zoneImages[idx].classList.add('active');
        });
    });
});