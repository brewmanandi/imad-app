var button = document.getElementById("counter");
var counter = 0;

button.onclick= function () {
    // make a request to counter endpoint
    
    
    // capture response and store
    
    
    // render variable in the correct span
    counter++;
    var span = document.getElementById("count");
    span.innerHttml = counter.toString();
}