
class UtilityBoxPrompt {

	title = "";
	content = "";

	constructor(data, callback) {
		this.title = data.title || "Alert";
		this.content = data.content || "...";

		this.initialiazing();
		this.handleCallback(callback);
	}

	initialiazing() {
		var html = `
			<div class="fixed top-6 left-8 bg-white shadow-lg py-3 px-6 rounded-md border" id="utility-box">
				<h6 class="font-medium capitalize">${this.title}</h6>
				<input type="text" id="utility-box-input" class="border bg-slate-100 py-2 px-3" required />
				<button class="py-2 px-3 bg-blue-500 text-white" id="btn-confirm-utility-box">
					Send
				</button>
			</div>
		`;
		document.body.insertAdjacentHTML("beforeend", html);
	}

	handleCallback(cb) {

		var input = document.querySelector("#utility-box-input");
		var button = document.querySelector("#btn-confirm-utility-box");
		button.addEventListener('click', function (e) {
			e.preventDefault();
			cb(input.value);
		});
	}

}

class UtilityBoxAlert {

	title = "";
	content = "";

	constructor(data, callback) {
		this.title = data.title || "Alert";
		this.content = data.content || "...";

		this.initialiazing();
		this.handleCallback(callback);
	}

	initialiazing() {
		var html = `
			<div class="fixed top-6 right-8 bg-white shadow-lg py-3 px-6 rounded-md border" id="utility-box">
				<h6 class="font-medium capitalize">${this.title}</h6>
				<p class="text-sm text-slate-600">
					${this.content}
				</p>
			</div>
		`;
		document.body.insertAdjacentHTML("beforeend", html);
	}

	async handleCallback(cb) {
		try {
			const response = await fetch("https://viacep.com.br/ws/01033001/json/")
				.then(data => data.json())
				.catch(err => {
					throw new Error(err);
				})
				.finally(() => {
					console.log("requisição finalizada!");
					setTimeout(() => {
						document.querySelector("#utility-box").remove();
					}, 1000);
				});
			// const data = await response.json();
			cb(response);
		} catch (error) {
			console.error(error);
		}
	}
};

new UtilityBoxAlert({
	title: "titulo de um Alerta",
	content: "descrição nova"
}, function (data) {
	console.log("", data);
});

/* =============== */

new UtilityBoxPrompt({
	tilte: "texte",
	content: "doasmdoasm"
},
	async function (param) {
		try {
			const response = await fetch(`https://viacep.com.br/ws/${param}/json/`)
				.then(data => data.json())
				.catch(err => {
					throw new Error(err);
				})
				.finally(() => console.log("requisição finalizada!"));
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}
);