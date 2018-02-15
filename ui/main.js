console.log('Loaded!');

// change text
var element = document.getElementById('hi')
element.innerHTML = "New value"

// move image
var imageElement = document.getElementById('image')
imageElement.onclick= function () {
    var interval = setInterval(moveRight, 100);
    
}
var marginLeft = 0;
function moveRight() {
    marginLeft += 10;
    image.style.marginLeft=marginLeft + 'px';
}