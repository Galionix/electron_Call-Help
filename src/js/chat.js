const ipc = require('electron').ipcRenderer;
const {machineId, machineIdSync} = require('node-machine-id');

// TODO uncomment all socket 
// const socket = io.connect('http://192.168.77.22:3000/');


let username = localStorage.getItem("username")||"Имя не установлено";
let userrole = localStorage.getItem("userrole")||"Роль не установлена"; 
let current_chat = localStorage.getItem("current_chat")||"Последний чат"; 


let droplayer = document.getElementById('drag_layer')
let droptarget = document.getElementById('droptarget')
$(droplayer).hide();

$(function () {});
$(".roomlist").resizable({
  handles: "e, w"
});


$("#user_name").text(username);
$("#user_role").text(userrole);
$("#chat__name").text(current_chat);
$("#chat__name2").text(current_chat);
$("#menu").hide()
$("#chat_settings").hide()

function showBlack(e) {
  if(e) e.preventDefault()
  $(droplayer).show();
  $("#drag_hint").hide()
}
function hideBlack(e) {
  if(e) e.preventDefault()
  $(droplayer).hide();
  $("#drag_hint").show()
}
function open_menu(e) {
 if(e) e.preventDefault()
  $("#menu").show()
  $(droplayer).show();
  $("#drag_hint").hide()
}

$("#chat__name").on('click',function (e) {
  showBlack(e)
  $("#chat_settings").show()
})

$("#options_burger").on('click',function (e) {
 
  open_menu(e)

})
$("#close_chat_settings").on('click',function (e) {
  hideBlack(e)
  $("#chat_settings").hide()
})


$("#drag_layer").on('click',function (e) {
  $("#menu").hide()
  $(droplayer).hide();
  $("#drag_hint").show()
})
const debug=1;
// console.log('hi')
window.scrollTo(0, document.body.scrollHeight);
var viewing_bottom = true;
var previous_sender='';

var User = {
uid:  machineIdSync(),
name: username,
role: 'admin',
level: 2,
}
// socket.emit('register user',User);



function textareaHeight() {
  
  $(this).height(0);
  $(this).height(this.scrollHeight+9);
  $('.sending__section').height($(this).height()+9)
  $('.chat__body').css('margin-bottom',$('.sending__section').height());
  if(viewing_bottom)
  window.scrollTo(0, document.body.scrollHeight);
}
// textareaHeight();
      $('textarea').on('keyup keypress', textareaHeight);


      
    //   $("#detect_scroll").on( 'scroll', function(){
    //     console.log('Event Fired');
    //  });

  //    $("#detect_scroll").bind('scroll', function() {
  //     console.log('Event worked');
  //  }); 

 
    $(window).on( 'scroll', function(){

      if(window.scrollY > document.body.scrollHeight-1100) 
      {
        $('#scroll_to_bottom').hide();
        viewing_bottom = true; 
      }
      
      else 
      
      {viewing_bottom=false;
        $('#scroll_to_bottom').show();
      }
// console.log('viewing_bottom ' + viewing_bottom);

            // console.log('Scroll '+window.scrollY + " MAX: " + document.body.scrollHeight);
       });


       $("#scroll_to_bottom").on('click',function (e) {
        e.preventDefault();
        viewing_bottom = true;
        window.scrollTo(0, document.body.scrollHeight);

       })


       $('#menu_minimize').on('click',function () {
        ipc.send('app_minimize');
      })
      $('#menu_close').on('click',function () {
      
        ipc.send('app_close');
      })

     function check_update_notification() {
       console.log('update checked!')
     }



     function Send() {


        if(viewing_bottom)
        window.scrollTo(0, document.body.scrollHeight); 
        $('#message_text').focus();


let Message = {name: username ,role:'admin',imgs: [''], text: $('#message_text').val()};

// socket.emit('chat message', Message);

// addMessage(false,Message.name,Message.role,Message.imgs,Message.text)
$('#message_text').val('')

      }

$('#send_button').on('click',function (e) {
  e.preventDefault();
  Send();
});

function incomingMessageTrigger() {
  if         (viewing_bottom) window.scrollTo(0, document.body.scrollHeight);

} 


// socket.on('chat message', function(msg){


  
// addMessage( msg)
// $('#message_text').val('')
// incomingMessageTrigger()
 
// });



$('#message_text').on('keydown',function (e) {
  // console.log(e.shiftKey)
  if(!e.shiftKey &&e.code=='Enter' )
  {
  e.preventDefault();
  e.stopPropagation();
  Send();
}
 
})
 
var addZero = function (num){
  // console.log(num.toString().length);
  
    return  (num.toString().length > 1 )? num: '0'+num.toString() ;
     


  }


function addMessage(msg) {
  var message = document.createElement('div');
  message.classList.add('chat__message');
  (msg.name == username) ? message.classList.add('chat__reciever') : false;
  (msg.name == username) ? msg.name='Вы' : false;
  var chat__name = document.createElement('div');
  chat__name.classList.add('chat__name');
  var a_sender = document.createElement('a');
  a_sender.classList.add('sender');
  a_sender.href='/'+msg.name;
  a_sender.textContent=msg.name;
  chat__name.appendChild(a_sender)

  var a_role = document.createElement('a');
  a_role.classList.add('role');
  // a_role.href='/'+name;
  a_role.textContent=msg.role;
  if(previous_sender!=msg.name)
  {

    chat__name.appendChild(a_role)
    message.appendChild(chat__name)
    previous_sender=msg.name;
  }

  if(msg.text!=''){
    var chat__message__text = document.createElement('div');
    chat__message__text.classList.add('chat__message__text');
    if(debug==1)
    chat__message__text.textContent = JSON.stringify(msg).replace('","','",\r\n"');
    else
    chat__message__text.textContent = msg.text;
    message.appendChild(chat__message__text)
  }
  let currentdate = new Date();
  var chat__timestamp = document.createElement('span');
  chat__timestamp.classList.add('chat__timestamp');

  chat__timestamp.title= "Получено в: " + new Date();
  chat__timestamp.textContent = addZero(currentdate.getHours()) + ":" + addZero(currentdate.getMinutes());
  message.appendChild(chat__timestamp)



// console.log(message);
document.querySelector('#chat__body').appendChild(message)
// $('#chat__body').appendTo(message);
}

$('#menu_cliplist').on('click',function () {
  localStorage.setItem('open_part','cliplist')
  ipc.send('go_index');
})
$('#menu_settings').on('click',function () {
  localStorage.setItem('open_part','settings')
  ipc.send('go_index');
})
$('#menu_info').on('click',function () {
  localStorage.setItem('open_part','info')
  ipc.send('go_index');
})

require('electron').ipcRenderer.on('window_resize', function() {
  // console.log('scrolling to buttom becouse winresize');
  
  if(viewing_bottom)
  window.scrollTo(0, document.body.scrollHeight); 
});







var counter = 0;

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  droptarget.addEventListener(eventName, preventDefaults, false)
})
function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

droptarget.addEventListener('drop', handleDrop, false)
function handleDrop(e) {
  $(droplayer).hide();
  let dt = e.dataTransfer
  let files = dt.files
  console.log(files);
  

}

$(droptarget).bind({
    dragenter: function(e) {
      // e.preventDefault();  
      // e.stopPropagation();
        counter++;
        // $(this).addClass('red');
        $(droplayer).show();
        console.log('dragenter' + counter);


    },

    dragleave: function(e) {
      // e.preventDefault();  
      // e.stopPropagation();
        counter--;
        console.log('dragleave ' + counter);
        if (counter === 0) { 
          {$(droplayer).hide();
          console.log('dragleave ' + counter);
          
          }

            // $(this).removeClass('red');
        }
    }
    // ,
    // drop: function (e) {    
    //   console.log('drop');
    //   e.preventDefault();  
    //   e.stopPropagation();
    //   $(droplayer).hide();
    //   let dt = e.dataTransfer
    //   // let files = 
    //   ([...dt.files]).forEach((uploadFile)=>{
    //     console.log(uploadFile)
    //   })
    // }


});

 



 


