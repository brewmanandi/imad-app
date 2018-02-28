// submit username/password to login
var submitButton = document.getElementById("submit_btn");
submitButton.onclick = function() {
    // create a request object
    var request = new XMLHttpRequest();
    
    // capture response and store it in a variable
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
        // not done yet
    };

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open("POST", "http://andreasbraumann.imad.hasura-app.io/login", "true");
    request.setRequestHeader('Content-Type', 'application: json');
    request.send(JSON.stringify({username: username, password: password}));
    
};