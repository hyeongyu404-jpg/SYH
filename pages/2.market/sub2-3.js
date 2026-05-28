document.addEventListener('DOMContentLoaded', function () {

    const tabItems = document.querySelectorAll('.tab-item');
    const cards = document.querySelectorAll('.merchant-card');
    const sortBtn = document.getElementById('sortBtn');
    const sortDropdown = document.getElementById('sortDropdown');

    function applyFilter(filter) {
        cards.forEach(function (card) {
            const season = card.getAttribute('data-season');
            const row = card.getAttribute('data-row');
            if (filter === 'all') {
                card.classList.toggle('hidden', row !== '1');
            } else {
                card.classList.toggle('hidden', season !== filter);
            }
        });
    }

    tabItems.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            tabItems.forEach(function (t) { t.classList.remove('active'); });
            tab.classList.add('active');
            applyFilter(tab.getAttribute('data-filter'));
        });
    });

    sortBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        sortDropdown.classList.toggle('open');
    });

    document.addEventListener('click', function () {
        sortDropdown.classList.remove('open');
    });

    applyFilter('all');
});