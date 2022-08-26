console.log('%c HI', 'color: firebrick')
const dogImages = document.querySelector("#dog-image-container");
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"; 
const breedUrl = 'https://dog.ceo/api/breeds/list/all'; 
const breedsList = document.querySelector("#dog-breeds");
const breedDropDown = document.querySelector("#breed-dropdown");
let dogBreeds;

document.addEventListener("DOMContentLoaded", () => {
	fetchImages();
	fetchBreeds();
	breedsList.addEventListener('click', handleClick)
	breedDropDown.addEventListener('change', handleChange)
});

// Fetches the images using the url provided. 
let fetchImages = () => {
	fetch(imgUrl)
	.then(resp => resp.json())
	.then(images => {
		const imgs = images["message"]
		const imgsArray = createImgElement(imgs)
		renderImgs(imgsArray)
	})
}

// Creates img tag/element and adds the image URL to the src
let createImgElement = (imgs) => {
	return imgs.map((image) => {
		return `<img src="${image}">`
	})
}

// Renders image element for each retrieved image
let renderImgs = (imgsArray) => {
	imgsArray.forEach(element => {
		dogImages.innerHTML += element
	})
}

// Fetches the dog breeds using the url provided. 
let fetchBreeds = () => {
	fetch(breedUrl)
	.then(resp => resp.json())
	.then(breeds => {
		dogBreeds = Object.keys(breeds["message"])
		breedsLis = createLiElement(dogBreeds)
		renderList(breedsLis)
	})
}

// Creates the list element for list of breeds retrieved
let createLiElement = (dogBreeds) => {
	return dogBreeds.map((breed) => {
		return `<li>${breed}</li>`
	})
}

//  Renders every dog breed in the list element created by createLiElement()
let renderList = (breedsLis) => {
	breedsLis.forEach((breed) => {
		breedsList.innerHTML += breed
	})
}

// Event Listener that changes the font color of a particular <li> on click. 
let handleClick = (e) => {
	if (e.target.nodeName === 'LI'){
		if (e.target.style.color === "blue"){
			e.target.style.color = "black"
		} else {e.target.style.color = "blue"} 
	}
}

// Filters breeds that start with a particular letter using a dropdown.
let handleChange = (e) => {
	const letter = e.target.value
	const filteredBreeds = dogBreeds.filter(breed => breed.startsWith(letter))
	const filteredBreedsLis = createLiElement(filteredBreeds)
	breedsList.innerHTML = ''
	renderList(filteredBreedsLis)
}
