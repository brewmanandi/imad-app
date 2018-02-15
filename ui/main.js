console.log('Loaded!');

// change text
var element = document.getElementById('hi')
element.innerHTML = "New value"

// move image
var imageElement = document.getElementById('image')
imageElement.onclick= function () {
    image.style.marginLeft='100px';
}