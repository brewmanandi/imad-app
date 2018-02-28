// submit username/password to login
var submitButton = document.getElementById("submit_btn");
submitButton.onclick = function() {
    // make request with name, capture list of names
    var nameInput = document.getElementById('name');
    var nameInputvalue = nameInput.value;


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

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    request.open("POST", "http://andreasbraumann.imad.hasura-app.io/login, "true");
    request.send(JSON.stringify({username: username, password: password}));
    
};