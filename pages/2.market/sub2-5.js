document.addEventListener('DOMContentLoaded', function () {
    const sortBtn = document.getElementById('sortBtn');
    const sortDropdown = document.getElementById('sortDropdown');

    sortBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        sortDropdown.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
        if (!sortBtn.contains(e.target)) {
            sortDropdown.classList.remove('open');
        }
    });
});