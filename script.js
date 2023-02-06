const TIMER = document.querySelector("#time-counter");
const SCORE = document.querySelector("#score");
const START_PAUSE_BUTTON = document.querySelector("#start-pause");
const SQUARES = document.querySelectorAll(".grid div");

const LOGS_LEFT = document.querySelectorAll(".log-left");
const LOGS_RIGHT = document.querySelectorAll(".log-right");

const CARS_LEFT = document.querySelectorAll(".car-left");
const CARS_RIGHT = document.querySelectorAll(".car-right");

let currentIndex = 76;

const WIDTH = 9;

let timerId;
let currentTime = 20;

let collisionTimer;




function moveFrog(e) {
    //remove frog from the current index
    SQUARES[currentIndex].classList.remove("frog");

    console.log(e);
    switch (e.key) {
        case "ArrowLeft":
            //check if the move goes out of bound. All sides are multiples of 9. If its not it can move
            if (currentIndex % WIDTH !== 0) {
                currentIndex -= 1;
            }
            break;

        case "ArrowRight":
            //check if the move goes out of bound.
            if (currentIndex % WIDTH < WIDTH - 1) {
                currentIndex += 1;
            }
            break;
        case "ArrowUp":
            //check if the move goes out of bound.
            if (currentIndex - WIDTH >= 0) {
                currentIndex -= WIDTH;
            }
            break;
        case "ArrowDown":
            if (currentIndex + WIDTH < WIDTH * WIDTH) {
                currentIndex += WIDTH;
            }
            break;
    }

    //add frog in the index determined by the move
    SQUARES[currentIndex].classList.add("frog");
}

function autoMove() {

	currentTime--
	TIMER.textContent = currentTime;

    //get each element form the div list and pass each one to th function MoveLogLeft
    LOGS_LEFT.forEach((logLeft) => moveLogLeft(logLeft));
    LOGS_RIGHT.forEach((logRight) => moveLogRight(logRight));

    CARS_LEFT.forEach((carLeft) => moveCarLeft(carLeft));
    CARS_RIGHT.forEach((carRight) => moveCarRight(carRight));

	/*     //each time everything moves we check if we lose
    lose();
	win(); */
}

function moveLogLeft(logLeft) {
    switch (true) {
        //check the class it has
        case logLeft.classList.contains("l1"):
            //if it has the class we change the class name ln to fake the movement
            logLeft.classList.remove("l1");
            logLeft.classList.add("l2");
            break;
        case logLeft.classList.contains("l2"):
            //if it has the class we change the class name ln to fake the movement
            logLeft.classList.remove("l2");
            logLeft.classList.add("l3");
            break;
        case logLeft.classList.contains("l3"):
            //if it has the class we change the class name ln to fake the movement
            logLeft.classList.remove("l3");
            logLeft.classList.add("l4");
            break;
        case logLeft.classList.contains("l4"):
            //if it has the class we change the class name ln to fake the movement
            logLeft.classList.remove("l4");
            logLeft.classList.add("l5");
            break;
        case logLeft.classList.contains("l5"):
            //if it has the class we change the class name ln to fake the movement
            logLeft.classList.remove("l5");
            logLeft.classList.add("l1");
            break;
    }
}

function moveLogRight(logRight) {
    switch (true) {
        //check the class it has
        case logRight.classList.contains("l1"):
            //if it has the class we change the class name ln to fake the movement
            logRight.classList.remove("l1");
            logRight.classList.add("l5");
            break;
        case logRight.classList.contains("l2"):
            //if it has the class we change the class name ln to fake the movement
            logRight.classList.remove("l2");
            logRight.classList.add("l1");
            break;
        case logRight.classList.contains("l3"):
            //if it has the class we change the class name ln to fake the movement
            logRight.classList.remove("l3");
            logRight.classList.add("l2");
            break;
        case logRight.classList.contains("l4"):
            //if it has the class we change the class name ln to fake the movement
            logRight.classList.remove("l4");
            logRight.classList.add("l3");
            break;
        case logRight.classList.contains("l5"):
            //if it has the class we change the class name ln to fake the movement
            logRight.classList.remove("l5");
            logRight.classList.add("l4");
            break;
    }
}

function moveCarLeft(carLeft) {
    switch (true) {
        //check the class it has
        case carLeft.classList.contains("c1"):
            //if it has the class we change the class name ln to fake the movement
            carLeft.classList.remove("c1");
            carLeft.classList.add("c2");
            break;
        case carLeft.classList.contains("c2"):
            //if it has the class we change the class name ln to fake the movement
            carLeft.classList.remove("c2");
            carLeft.classList.add("c3");
            break;
        case carLeft.classList.contains("c3"):
            //if it has the class we change the class name ln to fake the movement
            carLeft.classList.remove("c3");
            carLeft.classList.add("c1");
            break;
    }
}

function moveCarRight(carRight) {
    switch (true) {
        //check the class it has
        case carRight.classList.contains("c1"):
            //if it has the class we change the class name ln to fake the movement
            carRight.classList.remove("c1");
            carRight.classList.add("c3");
            break;
        case carRight.classList.contains("c2"):
            //if it has the class we change the class name ln to fake the movement
            carRight.classList.remove("c2");
            carRight.classList.add("c1");
            break;
        case carRight.classList.contains("c3"):
            //if it has the class we change the class name ln to fake the movement
            carRight.classList.remove("c3");
            carRight.classList.add("c2");
            break;
    }
}

function lose() {
    if (
        SQUARES[currentIndex].classList.contains("c1") ||
        SQUARES[currentIndex].classList.contains("l4") ||
        SQUARES[currentIndex].classList.contains("l5") ||
		currentTime <= 0
    ) {
        SCORE.textContent = "you lose!";
        clearInterval(timerId);
		clearInterval(collisionTimer);
        SQUARES[currentIndex].classList.remove("frog");
        document.removeEventListener("keyup", moveFrog);
    }
}

function win() {
	if(SQUARES[currentIndex].classList.contains('ending-block')) {

		SCORE.textContent = "you Win!";
        clearInterval(timerId);
		clearInterval(collisionTimer);
        document.removeEventListener("keyup", moveFrog);

	}
}

function checkCollision() {
	lose();
	win();
}

START_PAUSE_BUTTON.addEventListener('click',() => {
	if (timerId) {
		//stop
		clearInterval(timerId);
		clearInterval(collisionTimer);
		collisionTimer = null
		timerId = null;
		document.removeEventListener("keyup", moveFrog);
	}else {
		//start
		timerId = setInterval(autoMove, 1000);

		collisionTimer = setInterval(checkCollision, 50);
		//listen for key pressed
		document.addEventListener("keyup", moveFrog);
	}
})
//will "move" elements every second

