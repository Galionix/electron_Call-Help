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
let splitview = localStorage.getItem("splitview") || "false";
let view_message_wrapper = localStorage.getItem("view_message_wrapper") || "true";
let view_userlist_wrapper = localStorage.getItem("view_userlist_wrapper") || "false";
let view_chat_menu_wrapper = localStorage.getItem("view_chat_menu_wrapper") || "true";

// $('#message_wrapper').hide()
// $('#userlist_wrapper').hide()


function onSignIn(googleUser) {
    
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    
    var outside

fetch('https://lh3.googleusercontent.com/a-/AOh14GhWGDbLlTz2rDtlHFbfofvYosm0TknrOrOpLeOw=s192-c')
  //                         vvvv
  .then(response => response.blob())
  .then(images => {
      // Then create a local URL for that image and print it 
      outside = URL.createObjectURL(images)
      console.log(outside)
  })

    //https://lh3.googleusercontent.com/a-/AOh14GhWGDbLlTz2rDtlHFbfofvYosm0TknrOrOpLeOw=s192-c
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    $('#login_form').hide()
    $('#logged').show()
    $('#user_avatar').attr("src",profile.getImageUrl());
    $('#username').text(profile.getName())
}

 
  
// SPLITVIEW

// FULLWIEV

// MENU

// MESSAGES

// USERS

// CHAT SETTINGS CS

// MAIN SETTINGS
