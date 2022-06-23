let gamePageCatchColor = document.getElementById("gamePageCatchColor");
let resultPageCatchColor = document.getElementById("resultPageCatchColor");
let reactioneCatchColor = document.getElementById("reactioneCatchColor");
let procentCatchColor = document.getElementById("procentCatchColor");

let startCatchColor = document.getElementById("startCatchColor");
let gameBlock = document.getElementById("gameBlock");
let timerCatchColor = document.getElementById("timerCatchColor");

let mlsArr = [];
let mlsStart = 0;
let mlsStop = 0;

let itemArr = [
	"item-1",
	"item-2",
	"item-3",
	"item-4",
	"item-5",
	"item-6",
	"item-7",
	"item-8",
	"item-9",
]

function startCathColor() {
	gameBlock.style.display = "grid";
	timerCatchColor.style.display = "block";
	startCatchColor.innerHTML = "Заново";

	showTimer()
	randomColor()
	startCatchColor.addEventListener("click", reload);
	function reload() {
		window.location.reload();
	};
};

function showTimer(to) {
	let current = 30;

	function go() {
		timerCatchColor.innerHTML = "00:" + current;
		if (current < 10) {
			timerCatchColor.innerHTML = "00:0" + current;
		}
		if (current == -1) {
			clearInterval(timerId);
			gamePageCatchColor.style.display = "none";
			resultPageCatchColor.style.display = "flex";
			showResult()
		}
		current--;
	}

	go();
	let timerId = setInterval(go, 1000);
};
let okClick = 0;

function randomColor() {
	mlsStart = performance.now();

	let gridItem = itemArr[Math.floor(Math.random() * 9)];
	let item = document.getElementById(gridItem);

	item.style.backgroundColor = "orange";
	item.classList.add("active")

	item.addEventListener("mousedown", nextColor);
	

	function nextColor() {
		if (item.classList.contains("active")) {
			mlsStop = performance.now()
			mlsArr.push(Math.floor(mlsStop - mlsStart));
			console.log(mlsArr)
			okClick += 1;
			timerCatchColor.classList.add("__ok")
			setTimeout(() => {
				timerCatchColor.classList.remove("__ok")
			}, 350);

			failClick -= 1;
			item.style.backgroundColor = "";
			item.classList.remove("active")
			item.classList.add("deactive")
			randomColor();
		}
	}
}

let allItem = document.getElementsByClassName('deactive')
let allClick = 0;
let failClick = 0;

for (let i = 0; i < allItem.length; i++) {
	allItem[i].onmousedown  = function() {
		if (allItem[i].classList.contains("deactive")) {
			failClick += 1;
		}
		allClick += 1;
	  console.log(`Всего кликов: ${allClick}. Правильно: ${okClick} Ошибок: ${failClick}.`)
	};
  }

function showResult() {
	let reaction = mlsArr.reduce((sum, current) => sum + current, 0);
	reaction /= mlsArr.length;
	reaction = Math.floor(reaction)
	reactioneCatchColor.innerHTML = reaction + "ms";

	let procent = Math.floor(failClick / allClick *100);
	if (procent < 0) {
		procentCatchColor.innerHTML = 0 + "%";
	} else {
		procentCatchColor.innerHTML = procent + "%";
	}
	showText(reaction, procent)
}

function showText(reaction, procent) {
	if (procent > 17 || reaction > 460) {
		let imgNo = document.getElementById("imgNo");
		imgNo.style.display = "block";
	} else {
		let imgOk = document.getElementById("imgOk");
		imgOk.style.display = "block";
	}
}

startCatchColor.addEventListener("click", startCathColor);