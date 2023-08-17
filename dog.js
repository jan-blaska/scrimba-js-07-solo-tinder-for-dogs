class Dog {
	constructor(data) {
		Object.assign(this, data)
	}

	setHasBeenLiked() {
		this.hasBeenLiked = true;
        return this.avatar
	}

	setHasBeenSwiped() {
		this.hasBeenSwiped = true;
	}

	getBatchHtml() {
		return `
			<img class="badge" src=${this.hasBeenLiked ? "/images/badge-like.png" : "/images/badge-nope.png"} alt="badge"></img>
		`;
	}

	getDogCardHtml() {
		const { name, avatar, age, bio, hasBeenSwiped, hasBeenLiked } = this;
		const batch = this.getBatchHtml();
		return `
			<img class="dog-image" src=${avatar} alt="photo of the dog">
			<div class="dog-description">
				<h4 class="dog-description-header">${name}, ${age}</h4>
				<p class="dog-description-note">${bio}</p>
			</div>
			${hasBeenSwiped ? batch : ""}
		`;
	}
}

export default Dog;