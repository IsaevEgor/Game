let startMinMaxGame = document.getElementById("startMinMax");
let timerMinMax = document.getElementById("timerMinMax");
let gameBlock = document.getElementById("minMaxGame");
let gamePageMinMax = document.getElementById("gamePageMinMax");
let resultPageMinMax = document.getElementById("resultPageMinMax");
let reaction = 0;
let procent = 0;

function minMaxGame() {
	timerMinMax.style.display = "block";
	gameBlock.style.display = "flex";
	startMinMaxGame.innerHTML = "Заново";

	startMinMaxGame.addEventListener("mousedown", reload);
	function reload() {
		window.location.reload();
	}
}

function showTimer(to) {
	let current = 30;

	function go() {
		timerMinMax.innerHTML = "00:" + current;
		if (current < 10) {
			timerMinMax.innerHTML = "00:0" + current;
		}
		if (current == -1) {
			clearInterval(timerId);
			gamePageMinMax.style.display = "none";
			resultPageMinMax.style.display = "flex";
			showResult();
		}
		current--;
	}

	go();
	let timerId = setInterval(go, 1000);
}

let randomNum = function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
  }

let firstNums = [];
let secondNums = [];

function genereteArr() {
	for (let i = 0; i < 100; i++) {
		firstNums.push(randomNum(10, 100));
		secondNums.push(randomNum(10, 100));
	};
};

let firstNum = document.getElementById("firstNum");
let secondNum = document.getElementById("secondNum");
let index = 0;

let mlsArr = [];
let mlsStart = 0;
let mlsStop = 0;

let fail = 0;
let allClick = 0;

function innerNum() {
	firstNum.innerHTML = firstNums[index];
	secondNum.innerHTML = secondNums[index];
	mlsStart = performance.now();
};

function compareFirst() {
	if(firstNums[index] >= secondNums[index]) {
		index++;
		allClick += 1;
		mlsStop = performance.now()
		mlsArr.push(Math.floor(mlsStop - mlsStart))
		firstNum.style.backgroundColor = "rgba(0, 255, 64, 0.274)";
		setTimeout(() => {
			firstNum.style.backgroundColor = "";
		}, 100);
		timerMinMax.classList.add("__ok")
		setTimeout(() => {
			timerMinMax.classList.remove("__ok")
		}, 150);
		innerNum();
	} else {
		fail += 1;
		firstNum.style.backgroundColor = "rgba(255, 60, 60, 0.247)";
		setTimeout(() => {
			firstNum.style.backgroundColor = "";
		}, 100);
		timerMinMax.classList.add("__no")
		setTimeout(() => {
			timerMinMax.classList.remove("__no")
		}, 150);
	};
};
function compareSecond() {
	if(firstNums[index] <= secondNums[index]) {
		index++;
		allClick += 1;
		mlsStop = performance.now()
		mlsArr.push(Math.floor(mlsStop - mlsStart));
		secondNum.style.backgroundColor = "rgba(0, 255, 64, 0.274)";
		timerMinMax.classList.add("__ok")
		setTimeout(() => {
			secondNum.style.backgroundColor = "";
		}, 100);
		setTimeout(() => {
			timerMinMax.classList.remove("__ok")
		}, 150);
		innerNum();
	} else {
		fail += 1;
		secondNum.style.backgroundColor = "rgba(255, 60, 60, 0.247)";
		setTimeout(() => {
			secondNum.style.backgroundColor = "";
		}, 100);
		timerMinMax.classList.add("__no")
		setTimeout(() => {
			timerMinMax.classList.remove("__no")
		}, 150);
	};
};

function showResult() {
	reaction = mlsArr.reduce((sum, item) => sum + item, 0);
	reaction /= mlsArr.length;
	reaction = Math.floor(reaction);
	reactioneMinMax.innerHTML = reaction + ' ms';

	procent = fail / allClick * 100;
	procent = Math.floor(procent)
	procentMinMax.innerHTML = procent + ' %';

	showText(reaction, procent)
}

function showText(reaction, procent) {
	if (procent > 17 || reaction > 850) {
		let imgNo = document.getElementById("imgNo");
		imgNo.style.display = "block";
	} else {
		let imgOk = document.getElementById("imgOk");
		imgOk.style.display = "block";
	}
}

startMinMaxGame.addEventListener("click", minMaxGame);
startMinMaxGame.addEventListener("click", showTimer);
startMinMaxGame.addEventListener("click", genereteArr);
startMinMaxGame.addEventListener("click", innerNum);

firstNum.addEventListener("click", compareFirst);
secondNum.addEventListener("click", compareSecond);

