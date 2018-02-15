var button = document.getElementById("counter");
button.onclick= function () {
    // make a request to counter endpoint
    var request = XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var counter = request.responseText
                var span = document.getElementById("count");
                span.innerHttml = counter.toString();
            }
        }    
    
    };
    
    request.open("GET", "http://http://andreasbraumann.imad.hasura-app.io/counter", "true");
    request.send(null);
}