// LOGIN
// SPLITVIEW
// FULLWIEV
// MENU
// MESSAGES
// USERS
// CHAT SETTINGS CS
// MAIN SETTINGS

// LOGIN

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
    document.location.reload();
  });
}

// SPLITVIEW

// FULLWIEV

// MENU

// MESSAGES

// USERS

// CHAT SETTINGS CS

// MAIN SETTINGS
