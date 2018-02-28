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
                console.log('user logged in');
                alert('Logged in succesfully');
            } else if (request.status === 403) {
                alert('Username/password is incorrect');
            } else if (request.status === 500) {
                alert("Something went wrong on the server");
            }
        }
    };

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open("POST", "http://andreasbraumann.imad.hasura-app.io/login, "true");
    request.send(JSON.stringify({username: username, password: password}));
    
};