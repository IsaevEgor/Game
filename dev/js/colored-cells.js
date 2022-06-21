
let startGame = document.getElementById("start");
let timer = document.getElementById("timer");
let gamePage = document.getElementById("gamePage");
let resultPage = document.getElementById("resultPage");
let gameBlock = document.getElementById("gameCells");
let procent = document.getElementById("procent")
let reactione = document.getElementById("reactione")

let countCorrect;

let allFail = 0;
let fail = 0;

let mlsArr = [];
let mlsStart = 0;
let mlsStop = 0;

function start() {
	showTimer();
	buttonAgain();
	showGameBlock();
	startColor();
	showVariant()
}

function showTimer(to) {
	timer.style.display = "block";
	let current = 30;

	function go() {
		timer.innerHTML = "00:" + current;
		if (current < 10) {
			timer.innerHTML = "00:0" + current;
		}
		if (current == -1) {
			clearInterval(timerId);
			gamePage.style.display = "none";
			resultPage.style.display = "flex";
			showResult();
		}
		current--;
	}

	go();
	let timerId = setInterval(go, 1000);
};

function buttonAgain() {
	startGame.innerHTML = "Заново";

	startGame.addEventListener("click", reload);
	function reload() {
		window.location.reload()
	}
};

function showGameBlock() {
	gameBlock.style.display = "flex";
}


function startColor() {
	let div = document.getElementById("game");
	let gameArr = div.getElementsByTagName("div");
	let item;
	let randomAmount = Math.floor(Math.random()*16);
	let randomItem;
	
	clearColor()

	for(i=0; i < randomAmount; i++) {
		randomItem = Math.floor(Math.random()*16);

		item = gameArr[randomItem]
		item.classList.add("active")

		if (randomItem >= 15) {
			randomItem--;
		} else {
			randomItem++;
		}
		
		item = gameArr[randomItem]
		if (item.classList.contains("active")){
			
		} else {
			item.classList.add("__no-active")
		}
		
	}

	countCorrect = 0;
	for(i = 0; i < gameArr.length; i++) {
		item = gameArr[i]
		if(item.classList.contains("active") && item.classList.contains("__no-active")){
			item.classList.remove("active")
		} else if (item.classList.contains("active")) {
			countCorrect++
		}
	}

	mlsStart = performance.now();
}

function clearColor() {
	let div = document.getElementById("game");
	let gameArr = div.getElementsByTagName("div");

	for(i = 0; i < gameArr.length; i++){
		gameArr[i].classList.remove("active");
		gameArr[i].classList.remove("__no-active")
	}


}

function showVariant() {
	let randomVariant = Math.floor(Math.random()*3)
	let buttonDiv = document.getElementById("buttonGame");
	let divVariant = buttonDiv.getElementsByTagName("div")

	let variantItem = divVariant[randomVariant].innerHTML = countCorrect;
	if(divVariant[randomVariant] == divVariant[1]){
		divVariant[0].innerHTML = Math.floor(Math.random()*10);
		divVariant[2].innerHTML = Math.floor(Math.random()*10);
	} else if(divVariant[randomVariant] == divVariant[0]){
		divVariant[1].innerHTML = Math.floor(Math.random()*10);
		divVariant[2].innerHTML = Math.floor(Math.random()*10);
	} else if(divVariant[randomVariant] == divVariant[2]){
		divVariant[0].innerHTML = Math.floor(Math.random()*10);
		divVariant[1].innerHTML = Math.floor(Math.random()*10);
	}
}

function countError(n) {
	if (n == countCorrect) {
		timer.classList.add("__ok")
		setTimeout(() => {
			timer.classList.remove("__ok")
		}, 150);

		mlsStop = performance.now()
		mlsArr.push(Math.floor(mlsStop - mlsStart))
		allFail++
		startColor();
		showVariant();
	} else {
		timer.classList.add("__no")
		setTimeout(() => {
			timer.classList.remove("__no")
		}, 150);
	
		allFail++;
		fail++;
	}
}
function showResult() {
	let reactioneResult;
	let procentResult;

	let reactionValue;

	procentResult = Math.floor(fail / allFail *100);
	procent.innerHTML = procentResult + " %";

	reactionValue = mlsArr.reduce((sum, current) => sum + current, 0)
	reactioneResult = Math.floor(reactionValue / mlsArr.length)
	reactione.innerHTML = reactioneResult + " ms"
	if (procentResult > 7 || reactioneResult > 1760) {
		let imgNo = document.getElementById("imgNo");
		imgNo.style.display = "block";
	} else {
		let imgOk = document.getElementById("imgOk");
		imgOk.style.display = "block";
	}
}
startGame.addEventListener("click", start);

