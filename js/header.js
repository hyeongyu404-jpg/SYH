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
    // 서치 버튼 
// 서치 버튼
const openBtn = document.querySelector("#search_open_btn");
const searchCloseBtn = document.querySelector(".search_close");   
const searchBar = document.querySelector(".search_bar");

// 열기
openBtn.addEventListener("click", () => {
	searchBar.classList.add("show");
});

// 닫기
searchCloseBtn.addEventListener("click", () => {
	searchBar.classList.remove("show");
});

// ---------------------------------------------------------------
// 햄버거 버튼
    const menuBtn = document.getElementById("icon_menu_btn");
    const menuPage = document.querySelector(".hambutton_page");
    const menuCloseBtn = document.querySelector(".hambutton_close");

    function setOrigin(e){
        menuPage.style.setProperty("--x", `${e.clientX}px`);
        menuPage.style.setProperty("--y", `${e.clientY}px`);
    }

    menuBtn.addEventListener("click", (e) => {
        setOrigin(e);

        // 먼저 보여주고
        menuPage.style.visibility = "visible";
        menuPage.style.pointerEvents = "auto";

        // 다음 프레임에 active 붙여서 "퍼지는" 애니메이션 
        requestAnimationFrame(() => {
            menuPage.classList.add("active");
        });
    });

    menuCloseBtn.addEventListener("click", (e) => {
        setOrigin(e);

        // active 제거하면 "줄어드는" 애니메이션 시작
        menuPage.classList.remove("active");
    });

    // 줄어드는 애니메이션 끝난 다음에 숨김 처리
    menuPage.addEventListener("transitionend", (e) => {
        if(e.propertyName !== "clip-path") return;

        if(!menuPage.classList.contains("active")){
            menuPage.style.visibility = "hidden";
            menuPage.style.pointerEvents = "none";
        }
    });




