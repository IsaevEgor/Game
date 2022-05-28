let gamePage = document.getElementById("gamePage");
let resultPage = document.getElementById("resultPage");
let reactione = 0;

function startGame() {
	let start = document.getElementById("start");
	let border = document.getElementById("border");
	start.innerHTML = "Заново";

	if (border.style.display == "block") {
		
		window.location.reload();
	
	} else {
		border.style.display = "block";
		//start.innerHTML = "Стоп"
	}
}

function showTimer(to) {
	let current = 30;
	let timer = document.getElementById("timer");
	timer.style.display = "block"

	function go() {
		timer.innerHTML = "00:" + current;
		if (current < 10) {
			timer.innerHTML = "00:0" + current;
		}
		if (current == -1) {
			clearInterval(timerId);
			gamePage.style.display = "none";
			resultPage.style.display = "flex";
		}
		current--;
	}

	go();
	let timerId = setInterval(go, 1000);
}

function colorChenge() {
	let timeStart = 0;
	let timeStop = 0;
	let timeResult = 0;
	let timeArr = [];


	let stoInterval = setInterval( function() {
		border.style.backgroundColor = "slateblue";
		timeStart = performance.now();

		function clickWhite() {
			if (border.style.backgroundColor == "slateblue") {
				border.style.backgroundColor = "white";
				timeStop = performance.now();
				timeResult = timeStop-timeStart;
				timeArr.push(Math.floor(timeResult));
				border.style.backgroundColor = "rgba(0, 255, 64, 0.274)";
				setTimeout(() => {
					border.style.backgroundColor = "white";
				}, 100);
			}
		};

		border.addEventListener("click", clickWhite);
		setTimeout(() => {
			clearInterval(stoInterval);
			reactione = timeArr.reduce((sum, item) => sum + item, 0);
			reactione /= timeArr.length
			console.log(reactione)
			document.getElementById("reactione").innerHTML = `${Math.floor(reactione)} ms`;

			let procent = fail / num * 100;
			document.getElementById("procent").innerHTML = `${Math.floor(procent)} %`;
		}, 30000);
	}, getRandomNumberBetween(2500, 4500));
	function getRandomNumberBetween(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}
}
	let num = 0;
	let fail = 0;
	function showFail() {
	num += 1;

	if(border.style.backgroundColor != "slateblue") {
		fail += 1;
		border.style.backgroundColor = "rgba(255, 60, 60, 0.247)";
		setTimeout(() => {
			border.style.backgroundColor = "white";
		}, 100);
	} else {
		fail += 0;
	}

	console.log(fail)
}
	
	console.log(procent)
start.addEventListener("click", startGame);
start.addEventListener("click", showTimer);
start.addEventListener("click", colorChenge);
border.addEventListener("click", showFail);