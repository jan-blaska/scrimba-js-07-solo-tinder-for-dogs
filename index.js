import dogsData from './data.js';

let dogsArray = ["rex", "bella", "teddy", "tom", "alan"]

function getNewDog() {
	const nextDogData = dogsData[dogsArray.shift()]
	console.log(nextDogData);
	return nextDogData ? new Dog(nextDogData) : {}
}

class Dog {
	constructor(data) {
		Object.assign(this, data)
	}

	getDogCardHtml() {
		const { name, avatar, age, bio, hasBeenSwiped, hasBeenLiked } = this
		return `
			<img class="dog-image" src=${avatar} alt="photo of the dog">
			<div class="dog-description">
				<h4 class="dog-description-header">${name}, ${age}</h4>
				<p class="dog-description-note">${bio}</p>
			</div>
			<img class="badge" src="/images/badge-like.png" alt="badge">
		`
	}
}

document.getElementById('btn-dislike').addEventListener('click', () => {
	console.log("dislike button clicked");
})

function render() {
	document.getElementById('dog-card').innerHTML = dog.getDogCardHtml()
}

let dog = getNewDog()
render()