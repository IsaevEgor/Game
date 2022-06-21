let gamePage = document.getElementById("gamePage");
let resultPage = document.getElementById("resultPage");
let timer = document.getElementById("timer");

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
			if (border.style.backgroundColor = "slateblue") {
				border.style.backgroundColor = "rgba(255, 255, 255, 0)";
				timeStop = performance.now();
				timeResult = timeStop-timeStart;
				timeArr.push(Math.floor(timeResult));
			}
		};

		border.addEventListener("click", clickWhite);
		setTimeout(() => {
			clearInterval(stoInterval);
			reactione = timeArr.reduce((sum, item) => sum + item, 0);
			reactione /= timeArr.length
			reactione = Math.floor(reactione)
			console.log(reactione)
			document.getElementById("reactione").innerHTML = reactione + "ms";

			let procent = fail / num * 100;
			procent = Math.floor(procent)
			document.getElementById("procent").innerHTML = procent + "%";
			showText(reactione, procent)
		}, 28000);
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

		timer.classList.add("__no")
		setTimeout(() => {
			timer.classList.remove("__no")
		}, 150);
	} else {
		fail += 0;

		timer.classList.add("__ok")
		setTimeout(() => {
			timer.classList.remove("__ok")
		}, 150);
	}

	console.log(fail)
}
	
function showText(reaction, procent) {
	if (procent > 17 || reaction > 760) {
		let imgNo = document.getElementById("imgNo");
		imgNo.style.display = "block";
	} else {
		let imgOk = document.getElementById("imgOk");
		imgOk.style.display = "block";
	}
}

start.addEventListener("click", startGame);
start.addEventListener("click", showTimer);
start.addEventListener("click", colorChenge);
border.addEventListener("click", showFail);