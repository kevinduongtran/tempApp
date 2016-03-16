var currentUser;
var gifChat = false; // set this to true to disable gif chat in favor of regular messaging
var ref = new Firebase("https://acmchatapp.firebaseio.com/");

// initial page load
$(document).ready(function() {
    checkIfLoggedIn();
    scrolltoBottom();
});

// display logged in name
// display logout text
// hide login text
function displayLoggedIn() {
    $("#userName").html(currentUser);
    $('#userName').removeClass("hidden");
    $('#logoutButton').removeClass("hidden");
    $('#loginButton').addClass("hidden");
}
// hide logged in name
// hide logout text
// display login text
function displayLoggedOut() {
    $('#userName').addClass("hidden");
    $('#logoutButton').addClass("hidden");
    $('#loginButton').removeClass("hidden");
}

// check if logged in
// checks to see if currentUser exist
function checkIfLoggedIn() {
    currentUser = Cookies.get('username');
    if (currentUser) {
        displayLoggedIn()
    } else {
        displayLoggedOut()
    }

}

// initiates login sequence
// opens up google login, sets currentUser in the cookie if success
function login() {

    ref.authWithOAuthPopup("google", function(error, authData) {
        if (error) {
            // error case
        } else {
            console.log(authData);
            currentUser = authData.google.displayName;
            Cookies.set('username', authData.google.displayName);
            displayLoggedIn()
        }
    });
}
// logout sequence
// clears currentUser
function logout() {
    displayLoggedOut()
    Cookies.set('username', '');
    currentUser = "";
}
// on enterkey press
// submit message or signin if not logged in
$('#messageInput').keypress(function(e) {
    if (e.keyCode == 13) {
        if (!currentUser) {
            login()
        } else {
            var name = currentUser;
            var text = $('#messageInput').val();
            // text.replace(" ", "+")
            ref.push({
                name: name,
                text: text
            });
            $('#messageInput').val('');
        }
    }
});
// watch Firebase for data changes
// update front end with new info
ref.on('child_added', function(snapshot) {
    console.log(snapshot.val());
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
    scrolltoBottom();
});

// Update front end with new message
function displayChatMessage(name, text) {
    
    if (gifChat) {
        jQuery.ajax({
            type: 'GET',
            url: "https://api.giphy.com/v1/gifs/search?q=" + text + "&rating=r&api_key=dc6zaTOxFJmzC",
            contentType: "application/json",
            dataType: 'json',
            success: function(json) {
                console.log(json)
                if (json.data[0]) {
                    var image = json.data[0].images.fixed_height.url;
                    $('#messageOutput').append("<li>" + name + ":<br><img title=" + text + " src=" + image + "></img></li>")
                } else {
                    $('#messageOutput').append("<li>" + name + ": " + text + " (could not find gif)<li>");
                }

                scrolltoBottom();
            },
            error: function(e) {}
        });
    } else {
        $('#messageOutput').append("<li>" + name + ": " + text + "</li>");
        scrolltoBottom();

    }


};

function scrolltoBottom() {
    $('.container').scrollTop($('.container').prop("scrollHeight"));
}