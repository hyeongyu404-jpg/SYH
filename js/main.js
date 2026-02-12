const ARCHIVE_DATA = [
			[
				{ img: "./img/apms/title/thumb01.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 팔마" },
				{ img: "./img/apms/title/thumb02.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 시등의 순간" },
				{ img: "./img/apms/title/thumb03.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 옛빛+최초의 전화기" },
				{ img: "./img/apms/title/thumb04.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 움직이는 빛" },
				{ img: "./img/apms/title/thumb05.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 빛의 선물" },
				{ img: "./img/apms/title/thumb06.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 랜드마크" },
			],
			[
				{ img: "./img/apms/title/thumb01.png", label: "서울빛초롱축제", txt: "2번째 사진" },
				{ img: "./img/apms/title/thumb02.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 시등의 순간" },
				{ img: "./img/apms/title/thumb03.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 옛빛+최초의 전화기" },
				{ img: "./img/apms/title/thumb04.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 움직이는 빛" },
				{ img: "./img/apms/title/thumb05.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 빛의 선물" },
				{ img: "./img/apms/title/thumb06.png", label: "서울빛초롱축제", txt: "2025 서울빛초롱축제, 랜드마크" },
			],
			[
				{ img: "./img/apms/title/thumb01.png", label: "광화문 마켓", txt: "3번째 사진" },
				{ img: "./img/apms/title/thumb02.png", label: "광화문 마켓", txt: "2025 광화문 마켓, 시등의 순간" },
				{ img: "./img/apms/title/thumb03.png", label: "광화문 마켓", txt: "2025 광화문 마켓, 옛빛+최초의 전화기" },
				{ img: "./img/apms/title/thumb04.png", label: "광화문 마켓", txt: "2025 광화문 마켓, 움직이는 빛" },
				{ img: "./img/apms/title/thumb05.png", label: "광화문 마켓", txt: "2025 광화문 마켓, 빛의 선물" },
				{ img: "./img/apms/title/thumb06.png", label: "광화문 마켓", txt: "2025 광화문 마켓, 랜드마크" },
			],
			[
				{ img: "./img/apms/title/thumb01.png", label: "광화문 마켓", txt: "광화문 마켓 역대 사진 1" },
				{ img: "./img/apms/title/thumb02.png", label: "광화문 마켓", txt: "광화문 마켓 역대 사진 2" },
				{ img: "./img/apms/title/thumb03.png", label: "광화문 마켓", txt: "광화문 마켓 역대 사진 3" },
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
								<div class="thumb" style="background:url(${item.img})center/cover no-repeat;"></div>
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