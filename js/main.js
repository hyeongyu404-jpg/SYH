//섹션 01 자바스크립트로 함
(() => {
	const hero = document.querySelector("#hero");
	const slides = hero.querySelectorAll(".hero_slide");
	const dots = hero.querySelectorAll(".hero_dot");

	let index = 0;
	const total = slides.length;

	const interval = 6000;
	let timer;

	function show(i){
		index = (i + total) % total;

		slides.forEach((s, idx)=>{
			s.classList.toggle("is-active", idx === index);
		});

		dots.forEach((d, idx)=>{
			d.classList.toggle("is-active", idx === index);
		});
	}

	function start(){
		timer = setInterval(()=>{
			show(index + 1);
		}, interval);
	}

	dots.forEach(dot=>{
		dot.addEventListener("click", ()=>{
			show(Number(dot.dataset.index));
		});
	});

	show(0);
	start();
})();

// 섹션 main structure 스와이퍼 말고 자바스크립트로 함
const data = {
			1: [
				{
					img: "./img/S-main/structure01.png",
					title: "시등의 순간",
					desc: "1887년 3월, 경복궁 건청궁에서 밝혀진 최초의 전등을 LED 영상과 한지 등(燈)을 통해 재현합니다.",
					spot: "청계광장~광통교",
					alt: "시등의 순간"
				},
				{
					img: "./img/S-main/structure02.png",
					title: "갓",
					desc: "힙한 트렌드로 재조명된 조선시대 선비의 ‘갓’을 모티브로 한 조명 연출로, 전통과 현대가 어우러진 글로벌 한국 문화를 선보입니다.",
					spot: "광통교~광교",
					alt: "갓"
				},
				{
					img: "./img/S-main/structure03.png",
					title: "청계의 빛 : 청계천의 과거",
					desc: "청계천 복원 20주년을 기념하여 제작된 서울빛초롱축제 특별전 작품입니다.",
					spot: "광교~장통교",
					alt: "청계의 빛"
				}
			],

			2: [
				{
					img: "./img/S-main/market01.jpg",
					title: "산타마을 곳곳에 마련된 크리스마스 포토존을 찾아 행복한 추억을 남겨보세요.",
					desc: "겨울동화 속 산타마을의 시작을 알리는 공간! 포토존과 마켓 전경을 배경으로 순간을 담아보세요.",
					spot: "산타마을 입구, 산타마을 놀이광장, 산타마을 마켓 빌리지",
					alt: "산타마을 포토존"
				},
				{
					img: "./img/S-main/market02.png",
					title: "① 산타마을 동화책",
					desc: "마켓 입구에서 만나볼 수 있는 동화책 콘셉트 조형물! 동화 속 주인공처럼 사진을 남겨보세요.",
					spot: "산타마을 입구, 산타마을 놀이광장, 산타마을 마켓 빌리지",
					alt: "산타마을 동화책"
				},
				{
					img: "./img/S-main/market03.png",
					title: "② 호두까기 인형의 집",
					desc: "연극의 한 장면 같은 포토존에서 사진을 찍어보세요. 무대 속 주인공이 된 듯한 기분을 느낄 수 있어요!",
					spot: "산타마을 입구, 산타마을 놀이광장, 산타마을 마켓 빌리지",
					alt: "호두까기 인형의 집"
				}
			]
		};

		document.addEventListener("DOMContentLoaded", () => {
			const root = document.querySelector("#main_structure");
			const tabBtns = root.querySelectorAll(".main_structure_btn");

			const slidesEl = root.querySelector("#slides");

			const cardTitle = root.querySelector("#card-title");
			const cardDesc = root.querySelector("#card-desc");
			const cardSpotText = root.querySelector("#card-spot-text");

			const btnPrev = root.querySelector("#btn-prev");
			const btnNext = root.querySelector("#btn-next");

			let currentTab = 1;
			let currentIndex = 0;

			function renderSlides(tabKey){
				const list = data[tabKey];

				slidesEl.innerHTML = list.map(item => {
					return `
						<div class="slide">
							<img src="${item.img}" alt="${item.alt}">
						</div>
					`;
				}).join("");

				slidesEl.style.transform = "translateX(0%)";
			}

			function renderCard(tabKey, index){
				const item = data[tabKey][index];

				cardTitle.textContent = item.title;
				cardDesc.textContent = item.desc;
				cardSpotText.textContent = item.spot;
			}

			function updateNav(tabKey){
				const last = data[tabKey].length - 1;
				btnPrev.disabled = currentIndex === 0;
				btnNext.disabled = currentIndex === last;
			}

			function moveTo(index){
				const last = data[currentTab].length - 1;

				if(index < 0) index = 0;
				if(index > last) index = last;

				currentIndex = index;

				const x = currentIndex * -100;
				slidesEl.style.transform = `translateX(${x}%)`;

				renderCard(currentTab, currentIndex);
				updateNav(currentTab);
			}

			function setTab(tabKey){
				currentTab = tabKey;
				currentIndex = 0;

				tabBtns.forEach(btn => {
					const isOn = Number(btn.dataset.index) === tabKey;
					btn.classList.toggle("active", isOn);
				});

				renderSlides(currentTab);
				moveTo(0); // 첫번째부터 시작하기 항상
			}

			tabBtns.forEach(btn => {
				btn.addEventListener("click", () => {
					setTab(Number(btn.dataset.index));
				});
			});

			btnPrev.addEventListener("click", () => moveTo(currentIndex - 1));
			btnNext.addEventListener("click", () => moveTo(currentIndex + 1));

			setTab(1);
		});
// 섹션 social media
const SOCIAL_DATA = [
	[
		{ img: "./img/apms/title/260119_빛초롱_종료.png"},
		{ img: "./img/apms/title/260117_빛초롱_릴스.png"},
		{ img: "./img/apms/title/260115_빛초롱_스케치.png"},
		{ img: "./img/apms/title/260113_빛초롱.png"},
		{ img: "./img/apms/title/260119_빛초롱_종료.png"},
		{ img: "./img/apms/title/260117_빛초롱_릴스.png"},
		{ img: "./img/apms/title/260115_빛초롱_스케치.png"},
		{ img: "./img/apms/title/260113_빛초롱.png"}
	],
	[
		{ img: "./img/apms/title/260119_빛초롱_종료.png"},
		{ img: "./img/apms/title/260117_빛초롱_릴스.png"},
		{ img: "./img/apms/title/260115_빛초롱_스케치.png"},
		{ img: "./img/apms/title/260113_빛초롱.png"},
		{ img: "./img/apms/title/260119_빛초롱_종료.png"},
		{ img: "./img/apms/title/260117_빛초롱_릴스.png"},
		{ img: "./img/apms/title/260115_빛초롱_스케치.png"},
		{ img: "./img/apms/title/260113_빛초롱.png"}
	],
];

const socialWrapper = document.getElementById("socialmediaWrapper");
const socialTabs = document.querySelectorAll(".socialmedia_title");

let socialSwiper = null;


/* 슬라이드 */
function renderSocialSlides(tabIndex){

	const items = SOCIAL_DATA[tabIndex];

	socialWrapper.innerHTML = "";

	items.forEach((item) => {

		const slide = document.createElement("div");
		slide.classList.add("swiper-slide");

		const card = document.createElement("div");
		card.classList.add("socialmedia_card");

		const thumb = document.createElement("div");
		thumb.classList.add("socialmedia_thumb");
		thumb.style.background = `url(${item.img}) center/cover no-repeat`;

		card.appendChild(thumb);
		slide.appendChild(card);
		socialWrapper.appendChild(slide);
	});
}


/* 스와이퍼 */
function initSocialSwiper(){

	if (socialSwiper){
		socialSwiper.destroy(true, true);
		socialSwiper = null;
	}

	socialSwiper = new Swiper("#socialmediaSwiper", {
		slidesPerView: 4,
		spaceBetween: 30,
		speed: 600,
		navigation: {
			nextEl: ".socialmedia_swiper_container .swiper-button-next",
			prevEl: ".socialmedia_swiper_container .swiper-button-prev",
		},
	});
}


/* 처음 실행 */
renderSocialSlides(0);
initSocialSwiper();


/* 탭 클릭 */
socialTabs.forEach((tab) => {
	tab.addEventListener("click", () => {

		const idx = Number(tab.dataset.tab);

		socialTabs.forEach((t) => t.classList.remove("is-active"));
		tab.classList.add("is-active");

		renderSocialSlides(idx);
		initSocialSwiper();
		socialSwiper.slideTo(0);
	});
});


// 섹션 archive
const ARCHIVE_DATA = [
			[
				{ img: "./img/S-main/thumb01.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 팔마" },
				{ img: "./img/S-main/thumb02.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 시등의 순간" },
				{ img: "./img/S-main/thumb03.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 옛빛+최초의 전화기" },
				{ img: "./img/S-main/thumb04.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 움직이는 빛" },
				{ img: "./img/S-main/thumb05.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 빛의 선물" },
				{ img: "./img/S-main/thumb06.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 랜드마크" },
			],
			[
				{ img: "./img/S-main/thumb01.png", label: "서울빛초롱축제", txt: "2번째 사진" },
				{ img: "./img/S-main/thumb02.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 시등의 순간" },
				{ img: "./img/S-main/thumb03.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 옛빛+최초의 전화기" },
				{ img: "./img/S-main/thumb04.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 움직이는 빛" },
				{ img: "./img/S-main/thumb05.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 빛의 선물" },
				{ img: "./img/S-main/thumb06.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 랜드마크" },
			],
			[
				{ img: "./img/S-main/thumb01.png", label: "광화문 마켓", txt: "3번째 사진" },
				{ img: "./img/S-main/thumb02.png", label: "광화문 마켓", txt: "2025 광화문 마켓, 시등의 순간" },
				{ img: "./img/S-main/thumb03.png", label: "광화문 마켓", txt: "2025 광화문 마켓, 옛빛+최초의 전화기" },
				{ img: "./img/S-main/thumb04.png", label: "광화문 마켓", txt: "2025 광화문 마켓, 움직이는 빛" },
				{ img: "./img/S-main/thumb05.png", label: "광화문 마켓", txt: "2025 광화문 마켓, 빛의 선물" },
				{ img: "./img/S-main/thumb06.png", label: "광화문 마켓", txt: "2025 광화문 마켓, 랜드마크" },
			],
			[
				{ img: "./img/S-main/thumb01.png", label: "광화문 마켓", txt: "광화문 마켓 역대 사진 1" },
				{ img: "./img/S-main/thumb02.png", label: "광화문 마켓", txt: "광화문 마켓 역대 사진 2" },
				{ img: "./img/S-main/thumb03.png", label: "광화문 마켓", txt: "광화문 마켓 역대 사진 3" },
			],
		];

		const wrapper = document.getElementById("archiveWrapper");
		const tabs = document.querySelectorAll(".archive_title");

		let archiveSwiper = null;

		function renderSlides(tabIndex){
			const items = ARCHIVE_DATA[tabIndex] || [];
			wrapper.innerHTML = items.map((item) => {
				return `
					<div class="swiper-slide">
						<div class="archive_card_slide_wrap">
							<a href="#">
								<div class="thumb" style="background:url(${item.img}) center/cover no-repeat;"></div>
								<div class="archive_card_info_wrap">
									<span class="archive_card_info_label">${item.label}</span>
									<div class="archive_card_info_txt">${item.txt}</div>
								</div>
							</a>
						</div>
					</div>
				`;
			}).join("");
		}

		function initSwiper(){
			if (archiveSwiper){
				archiveSwiper.destroy(true, true);
				archiveSwiper = null;
			}

			archiveSwiper = new Swiper("#archiveSwiper", {
				slidesPerView: 3,
				spaceBetween: 50,
				slidesPerGroup: 1,
				speed: 600,
				navigation: {
					nextEl: ".archive_swiper_container .swiper-button-next",
					prevEl: ".archive_swiper_container .swiper-button-prev",
				},
				observer: true,
				observeParents: true,
				autoplay: false,
			});
		}

		/* 최초 로드 */
		renderSlides(0);
		initSwiper();

		/* 탭 클릭 */
		tabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				const idx = Number(tab.dataset.tab);

				tabs.forEach((t) => t.classList.remove("is-active"));
				tab.classList.add("is-active");

				renderSlides(idx);
				initSwiper();
				archiveSwiper.slideTo(0, 0);
			});
		});


/*----------------------------------------------------------------- */