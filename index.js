import dogsData from './data.js';

let dogsArray = ["rex"]

function getNewDog() {
	const nextDogData = dogsData[dogsArray.shift()]
	return nextDogData ? new Dog(nextDogData) : {}
}

class Dog {
	constructor(data) {
		Object.assign(this, data)
	}

	setHasBeenLiked() {
		this.hasBeenLiked = true;
	}

	setHasBeenSwiped() {
		this.hasBeenSwiped = true;
	}

	getBatchHtml() {
		return `
			<img class="badge" src=${this.hasBeenLiked ? "/images/badge-like.png" : "/images/badge-nope.png"} alt="badge"></img>
		`
	}

	getDogCardHtml() {
		const { name, avatar, age, bio, hasBeenSwiped, hasBeenLiked } = this
		const batch = this.getBatchHtml()
		return `
			<img class="dog-image" src=${avatar} alt="photo of the dog">
			<div class="dog-description">
				<h4 class="dog-description-header">${name}, ${age}</h4>
				<p class="dog-description-note">${bio}</p>
			</div>
			${hasBeenSwiped ? batch : ""}
		`
	}
}

document.getElementById('btn-dislike').addEventListener('click', () => {
	dog.setHasBeenSwiped();
	render();
	setTimeout(() => {
		if (dogsArray.length > 0) {
			dog = getNewDog()
			render();
		} else {
			endSwipe();
		}
	}, 1500)
})

document.getElementById('btn-like').addEventListener('click', () => {
	dog.setHasBeenSwiped();
	dog.setHasBeenLiked();
	render();
	setTimeout(() => {
		if (dogsArray.length > 0) {
			dog = getNewDog()
			render();
		} else {
			endSwipe();
		}
	}, 1500)
})

if (document.getElementById('new-matches-btn')) {
	document.getElementById('new-matches-btn').addEventListener('click', () => {
		dogsArray = ["rex", "bella", "teddy", "tom", "alan"]
		console.log("new swiping btn blicked")
		dog = getNewDog()
		render();
	})
}

function myFunction() {
	console.log("JUPII")
}


function render() {
	document.getElementById('dog-card').innerHTML = dog.getDogCardHtml()
}

function endSwipe() {
	document.getElementById('dog-card').innerHTML = `
		<div class="last-page">
			<h1>Whhhrrrrr! You have matched with these dogs!</h1>
			<h1>Oooops! You have not matched with any dog..</h1>
			<div class="image-grid">
				<img src="/images/dog-alan.jpg" class="image-item" alt="">
				<img src="/images/dog-alan.jpg" class="image-item" alt="">
				<img src="/images/dog-alan.jpg" class="image-item" alt="">
			</div>
			<button id="new-matches-btn" class="new-matches-btn" onclick="myFunction()">Find new matches</button>
		</div>
	`
}

let dog = getNewDog()
render()