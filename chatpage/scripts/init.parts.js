// LOGIN
// SPLITVIEW
// FULLWIEV
// MENU
// MESSAGES
// USERS
// CHAT SETTINGS CS
// MAIN SETTINGS

// LOGIN

// console.log("%c 🇬🇫: $('#login_form') ", "font-size:16px;background-color:#4ecad7;color:white;", $('#login_form'))

$('#logged').hide()


function onSignIn(googleUser) {
    
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.


        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
        $('#login_form').hide()
        $('#logged').show()
}

 
  
// SPLITVIEW

// FULLWIEV

// MENU

// MESSAGES

// USERS

// CHAT SETTINGS CS

// MAIN SETTINGS
