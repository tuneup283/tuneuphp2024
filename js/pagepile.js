document.addEventListener("DOMContentLoaded", () => {
	const sections = document.querySelectorAll(".pp-section");
	let currentSectionIndex = 0;
	let isAnimating = false;
	let lastAnimationTime = 0;

	// スタイルとクラスを初期化
	const init = () => {
		document.body.style.overflow = "hidden";
		sections.forEach((section, index) => {
			section.style.position = "absolute";
			section.style.width = "100%";
			section.style.height = "100%";
			section.style.transition = "transform 1s ease-in-out";
			section.style.transform = `translateY(${index * 100}%)`;
		});
		sections[currentSectionIndex].classList.add("active");
		updateURLHash();
	};

	// 指定されたセクションに移動
	const moveTo = (index) => {
		const now = new Date().getTime();
		if (
			index === currentSectionIndex ||
			index < 0 ||
			index >= sections.length ||
			now - lastAnimationTime < 1000
		) {
			return;
		}
		isAnimating = true;
		lastAnimationTime = now;

		const nextSection = sections[index];
		nextSection.classList.add("active");
		sections[currentSectionIndex].classList.remove("active");
		sections.forEach((section, i) => {
			section.style.transform = `translateY(${(i - index) * 100}%)`;
		});
		currentSectionIndex = index;
		setTimeout(() => {
			isAnimating = false;
			updateURLHash();
		}, 1000);
	};

	// URLハッシュを更新
	const updateURLHash = () => {
		const activeSection = sections[currentSectionIndex];
		const hash = activeSection.getAttribute("data-anchor");
		if (hash) {
			location.hash = hash;
		}
	};

	// キーボードイベントのリスナーを追加
	document.addEventListener("keydown", (event) => {
		if (event.key === "ArrowUp") {
			moveTo(currentSectionIndex - 1);
		} else if (event.key === "ArrowDown") {
			moveTo(currentSectionIndex + 1);
		}
	});

	// マウスホイールイベントのリスナーを追加
	document.addEventListener("wheel", (event) => {
		const now = new Date().getTime();
		if (now - lastAnimationTime > 1000) {
			if (event.deltaY < 0) {
				moveTo(currentSectionIndex - 1);
			} else if (event.deltaY > 0) {
				moveTo(currentSectionIndex + 1);
			}
		}
	});

	init();
});
