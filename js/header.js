// 글로벌버튼--------------------------------------
    // 글로벌버튼 토글
const searchBtn = document.getElementById("global_btn");
const langUl = document.querySelector(".lang_ul");

searchBtn.addEventListener("click", () => {
	langUl.classList.toggle("open");
});

const langLinks = document.querySelectorAll(".lang_ul a");

    // 영문 국문 액티브 
    langLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // 페이지 이동 막기

            // 기존 active 제거
            langLinks.forEach((a) => a.classList.remove("active"));

            // 지금 클릭한 애한테 active 주기
            link.classList.add("active");
        });
    });
// ---------------------------------------------------------------
    // 서치 클로즈 버튼 
    const openBtn = document.querySelector("#search_open_btn");
    const closeBtn = document.querySelector(".search_close");
    const searchBar = document.querySelector(".search_bar");

    // 열기 서치 버튼
    openBtn.addEventListener("click", () => {
        searchBar.classList.add("show");
    });

    // 열기 닫기 버튼
    closeBtn.addEventListener("click", () => {
        searchBar.classList.remove("show");
    });


