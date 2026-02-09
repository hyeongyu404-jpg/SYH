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