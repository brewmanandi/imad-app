var button = document.getElementById("counter");
button.onclick= function () {
    // make a request to counter endpoint
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var counter = request.responseText
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
            }
        }    
    
    };
    
    request.open("GET", "http://andreasbraumann.imad.hasura-app.io/counter", "true");
    request.send(null);
}

// submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submitButton = document.getElementById("submit_btn");
submitButton.onclick = function() {
    // make request with name, capture list of names
    var request = new XMLHttpRequest();
     request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var names = JSON.parse(request.responseText);
                var list = "";
                for (var i=0; i<names.length; i++) {
                            list+="<li>"+names[i]+"</li>";
                }
                var ul = document.getElementById("namelist");
                ul.innerHTML = list;
            }
        }
    };

    request.open("GET, http://andreasbraumann.imad.hasura-app.io/name", "true");
    request.send(null);
    
}