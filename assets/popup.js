const btn = document.querySelector("button[data-popup]");

class Poupup {

	content = "";

	constructor(content) {
		this.content = content;
	}

	open() {
		var html = `
		<div id="popup" class="absolute bottom-8 left-[50%] -translate-x-[50%] bg-blue-500 drop-shadow-lg rounded-sm text-white overflow-hidden z-50">
			<div id="popup-content" class="py-1 px-6">
				<p class="">
					${this.content}
				</p>
			</div>
			<span id="popup-timer" class="h-1 bg-red-500 block transition-all" style=""></span>
		</div> `;
		document.body.insertAdjacentHTML("beforeend", html);
		this.timer();
	}

	timer() {
		document.querySelector("button[data-popup]").setAttribute("disabled", "true");
		this.timerWithSpan();
		this.animationShow();
		setTimeout(() => {
			this.animationHide();
			setTimeout(() => this.die(), 310);
		}, 3000);
	}

	timerWithSpan() {
		var index = 0;
		const span = setInterval(() => {
			document.querySelector("#popup-timer").style.width = `${index}%`;
			index++;
			if (index > 100) {
				clearInterval(span);
			}
		}, 50 / 2);
	}

	animationShow() {
		const newspaperSpinning = [
			{
				transform: "translateY(20px) translateX(-50%)",
				opacity: 0
			},
			{
				transform: "translateY(0px) translateX(-50%)",
				opacity: 1
			},
		];

		const newspaperTiming = {
			duration: 300,
			iterations: 1,
		};
		document.querySelector("#popup").animate(newspaperSpinning, newspaperTiming);
	};

	animationHide() {
		const newspaperSpinning = [
			{
				transform: "translateY(0px) translateX(-50%)",
				opacity: 1
			},
			{
				transform: "translateY(20px) translateX(-50%)",
				opacity: 0
			},
		];

		const newspaperTiming = {
			duration: 500,
			iterations: 1,
		};
		document.querySelector("#popup").animate(newspaperSpinning, newspaperTiming);
	}

	die() {
		document.querySelector("button[data-popup]").removeAttribute("disabled");
		document.querySelector("#popup").remove();
	}

}

btn.addEventListener("click", (event) => {
	new Poupup("Hi! 👋").open();
});
