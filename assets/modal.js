const btnModal = document.querySelector("button[data-modal]");

class Modal {
	/* <span id="modal-timer" class="h-2 bg-red-300 block transition-all" style=""></span> */
	content = "";
	title = "";

	confirmButtonElement;

	constructor(props) {
		Object.assign(this, props);
		this.open();
	}

	open() {
		var html = `
	<div id="modal" class="fixed w-full bg-transparent top-0 left-0 h-full flex items-center justify-center z-50">
		<div id="modal-content" class="p-8 max-w-[40%] text-black bg-white rounded-lg">
			<div class="flex flex-row align-start justify-center gap-3 mb-5">
				<div class="">
					<span class="w-12 h-12 rounded-full bg-red-300 text-lg flex items-center justify-center">
						<i class="fa-solid fa-triangle-exclamation text-red-700"></i>
					</span>
				</div>
				<div class="">
					<h6 class="font-bold mb-2 text-lg">
						Deactivate account
					</h6>
					<p class="text-slate-700 text-sm">
						Are you sure you want to deactivate your account? All of your data will be permanently removed. This action
						cannot be undone.
					</p>
				</div>
			</div>
			<div class="flex flex-row items-center justify-end gap-4">
				<button
					class="py-2 px-6 border border-red-500 rounded-md text-red-500 text-sm font-bold hover:bg-red-700 hover:text-white"
					data-close-modal>Cancel</button>
				<button
					class="py-2 px-6 bg-green-500 rounded-md text-white font-bold text-sm hover:bg-green-700"
					data-confirm-modal
					>
					Confirm
					</button>
			</div>
		</div>
	</div>
	`;
		document.body.insertAdjacentHTML("beforeend", html);
		document.querySelector("button[data-modal]").setAttribute("disabled", "true");
		this.timer();
		this.animateOpen();
		this.closeButton();
		// this.handleConfirmButton();
		this.confirmButtonElement = document.querySelector("button[data-confirm-modal]");
	}

	timer() {
		document.querySelector("button[data-modal]").setAttribute("disabled", "true");
	}

	animateOpen() {
		const newspaperSpinning = [
			{
				transform: "translateY(10px)",
				opacity: 0
			},
			{
				transform: "translateY(0px)",
				opacity: 1
			},
		];

		const newspaperTiming = {
			duration: 100,
			iterations: 1,
		};
		document.querySelector("#modal").animate(newspaperSpinning, newspaperTiming);
	}


	animationHide() {
		const newspaperSpinning = [
			{
				transform: "translateY(0px)",
				opacity: 1
			},
			{
				transform: "translateY(-20px)",
				opacity: 0
			},
		];

		const newspaperTiming = {
			duration: 200,
			iterations: 1,
		};
		document.querySelector("#modal").animate(newspaperSpinning, newspaperTiming);
	}


	closeButton() {
		document.querySelector("button[data-close-modal]").addEventListener("click", () => {
			document.querySelector("button[data-confirm-modal]").setAttribute("disabled", "true");
			console.log("aloaloalaol");
			setTimeout(() => {
				this.animationHide();
				document.querySelector("#modal").style.userSelect = "none";
				setTimeout(() => this.die(), 200);
			}, 200);
		});
	}

	die() {
		document.querySelector("button[data-modal]").removeAttribute("disabled");
		document.querySelector("#modal").remove();
	}

	handleConfirmButton(callback) {
		document.querySelector("button[data-confirm-modal]").addEventListener("click", async () => {
			this.changeTextToConfirmButton();
			try {
				const response = await fetch("https://viacep.com.br/ws/01124030/json/");
				const data = await response.json();
				this.confirmButtonElement.removeAttribute("disabled");
				this.changeTextToConfirmButton(false, "finalizado!");
				callback(data);
			} catch (err) {
				console.error(err);
			}
		});
	}

	changeTextToConfirmButton(disabled = true, currentText) {
		if (disabled) {
			this.confirmButtonElement.setAttribute("disabled", "true");
		} else {
			this.confirmButtonElement.removeAttribute("disabled");
		}
		this.confirmButtonElement.innerText = currentText || "Loading...";
	}
}


btnModal.addEventListener("click", (event) => {
	const modal = new Modal(
		{
			content: "description...",
			title: "Title"
		}
	);
	// modal.handleConfirmButton(function (obj) {
	// 	fetch("https://viacep.com.br/ws/01124030/json/")
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			obj.confirmButtonElement.removeAttribute("disabled");
	// 			console.log(data)
	// 		})
	// 		.catch(err => console.log(err))
	// 		.finally(() => {
	// 			obj.changeTextToConfirmButton(false, "finalizado!");
	// 		});

	// });
	modal.handleConfirmButton(function (data) {
		console.log("🚀 ~ file: modal.js:158 ~ data:", data);
	});
});