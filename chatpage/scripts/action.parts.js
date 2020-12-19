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
function applySplit() {
    
    $("#message_wrapper").hide();
    $("#userlist_wrapper").hide();
    $("#chat_menu_wrapper").hide();
if(view_chat_menu_wrapper == "true") 
   { $("#chat_menu_wrapper").show(); return }
    if(view_message_wrapper == "true") 
    {$("#message_wrapper").show();  return }
    if(view_userlist_wrapper == "true") 
    $("#userlist_wrapper").show();
    

}

function windowResize() {
  // Get width and height of the window excluding scrollbars
  var w = document.documentElement.clientWidth;

  // Display result inside a div element
  if (w < 400) {
    splitview = "true";
    applySplit();
  } else {
    splitview = "false";

    $("#message_wrapper").hide();
    $("#userlist_wrapper").hide();
    $("#chat_menu_wrapper").hide();
    
    if(view_message_wrapper == "true") 
    $("#message_wrapper").show();
    if(view_userlist_wrapper == "true") 
    $("#userlist_wrapper").show();
    if(view_chat_menu_wrapper == "true") 
    $("#chat_menu_wrapper").show();
  }
  localStorage.setItem("splitview", splitview);


// $('#cmw_info').css('width',  $('#chat_menu_wrapper').css('width'));
//   document.getElementById("result").innerHTML =
//     "Width: " + w + "splitview " + splitview;
}
window.addEventListener("resize", windowResize);
windowResize();
// FULLWIEV

// MENU
$("#cmw_search_input").on('click',function () {
  
})
// MESSAGES

// USERS

// CHAT SETTINGS CS

// MAIN SETTINGS
