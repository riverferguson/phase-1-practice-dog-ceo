document.addEventListener('DOMContentLoaded', function () {
    loadImages()
    addBreedOptions()
})



let breeds = []



function loadImages () {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
    .then(response => response.json())
    .then(results => {
        results.message.forEach(image => addImage(image))
    })
}

function addImage (dogPicUrl) {
    const imageDiv = document.querySelector("#dog-image-container")
    const newImage = document.createElement("img") 
    newImage.src = dogPicUrl
    imageDiv.appendChild(newImage)
}

function addBreedOptions () {
    const breedUrl = "https://dog.ceo/api/breeds/list/all"
    fetch(breedUrl)
    .then(response => response.json())
    .then(results => {
        breeds = Object.keys(results.message)
        updateBreeds(breeds)
        addBreedListener()
    })
}

function updateBreeds(breeds) {
    let ul = document.querySelector("#dog-breeds")
    removeChildren(ul)
    breeds.forEach(breed => addBreed(breed))
}

function removeChildren(element) {
    let child = element.lastElementChild
    while (child) {
        child = element.lastElementChild
    }
} 

function selectBreedFirstLetter(letter) {
    updateBreeds(breeds.filter(breed => breed.startsWith(letter)))
}

function addBreedListener() {
    let breedDropdown = document.querySelector('#breed-dropdown')
    breedDropdown.addEventListener('change', (e) => {
        selectBreedFirstLetter(e.target.value)
    })
}

function addBreed(breed) {
    let ul = document.querySelector("#dog-breeds")
    let li = document.createElement("li")
    li.innerText = breed
    li.style.curser = 'pointer'
    ul.appendChild(li)
    li.addEventListener('click', updateColor)
}

function updateColor(e) {
    e.target.style.color = 'red' 
}

