import dogsData from './data.js';
import Dog from './dog.js';

let dogsArray = ["rex", "bella", "teddy", "tom", "alan"];
let likedDogs = [];

// it randomly picks one dog from the array
function getNewDog() {
	let nextDogData;
	let randomNumber = Math.floor(Math.random() * dogsArray.length);
	nextDogData = dogsData[dogsArray[randomNumber]];
	dogsArray.splice([randomNumber], 1);
	return nextDogData ? new Dog(nextDogData) : {};
}

// when user clicks on like or dislike button, the app waits for 1.5s before rendering of new dog
function getAnotherDog() {
	setTimeout(() => {
		if (dogsArray.length > 0) {
			dog = getNewDog();
			render();
		} else {
			endSwipe();
		}
	}, 1500);
}

document.getElementById('btn-dislike').addEventListener('click', () => {
	dog.setHasBeenSwiped();
	render();
	getAnotherDog();
})

document.getElementById('btn-like').addEventListener('click', () => {
	dog.setHasBeenSwiped();
	likedDogs.push(dog.setHasBeenLiked());
	render();
	getAnotherDog();
})

function endSwipe() {
	// those dogs who were liked, will be mapped to array as html
	const likedDogsHtml = likedDogs.map((dog) => {
		return `
			<img src=${dog} class="image-item" alt="">
		`
	});
	// renders the last page, when no more dogs are available
	document.getElementById('dog-card').innerHTML = `
		<div class="last-page">
			${likedDogs.length > 0 ? "<h1>Whhhrrrrr! You have matched with these dogs!</h1>" 
				: "<h1>Oooops! You have not matched with any dog..</h1>"}
			<div class="image-grid">
				${likedDogsHtml.join('')}
			</div>
			<button id="new-matches-btn" class="new-matches-btn">Find new matches</button>
		</div>
	`;
	// we hide the buttons like / dislike because there are no more dogs to swipe
	document.getElementById('like-bar').classList.add("hidden");
	// if user clicks the button on the last page, all swiping will start again
	document.getElementById('new-matches-btn').addEventListener('click', () => {
		setTimeout(() => {
			dogsArray = ["rex", "bella", "teddy", "tom", "alan"];
			likedDogs = [];
			dog = getNewDog();
			document.getElementById('like-bar').classList.remove("hidden");
			render();
		}, 1000);
	});
}

// it renders the card with the current dog
function render() {
	document.getElementById('dog-card').innerHTML = dog.getDogCardHtml();
};

// we take the first dog when the app is launched
let dog = getNewDog();
render();