const ipc = require('electron').ipcRenderer;

// console.log('hi')

var viewing_bottom = true;

    //   $(".roomlist").on("mouseover" ,function () {
    //     $(this).removeClass("collapsed")
       
    //   });


    // $(".roomlist").on("mouseout" ,function () {
    //     $(this).addClass("collapsed")
        
    //   });


function textareaHeight() {
  
  $(this).height(0);
  $(this).height(this.scrollHeight+30);
  $('.sending__section').height($(this).height()+30)
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

        
addMessage(true,'Вы','admin','',$('#message_text').val())
$('#message_text').val('')

      }

$('#send_button').on('click',function (e) {
  e.preventDefault();
  Send();
});

function incomingMessageTrigger() {
  if         (viewing_bottom) window.scrollTo(0, document.body.scrollHeight);

} 

$('#smile_button').on('click',function (e) {
  e.preventDefault();
  addMessage(false,'кто-то еще','оператор','',$('#message_text').val())
$('#message_text').val('')
incomingMessageTrigger()
});

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


function addMessage(is_receiver=true,name='Вы',role='',img='',text='') {
  var message = document.createElement('div');
  message.classList.add('chat__message');
  (is_receiver) ? message.classList.add('chat__reciever') : false;

  var chat__name = document.createElement('div');
  chat__name.classList.add('chat__name');
  var a_sender = document.createElement('a');
  a_sender.classList.add('sender');
  a_sender.href='/'+name;
  a_sender.textContent=name;
  chat__name.appendChild(a_sender)

  var a_role = document.createElement('a');
  a_role.classList.add('role');
  // a_role.href='/'+name;
  a_role.textContent=role;
  chat__name.appendChild(a_role)
 message.appendChild(chat__name)

  if(text!=''){
    var chat__message__text = document.createElement('div');
    chat__message__text.classList.add('chat__message__text');
    chat__message__text.textContent = text;
    message.appendChild(chat__message__text)
  }
  let currentdate = new Date();
  var chat__timestamp = document.createElement('span');
  chat__timestamp.classList.add('chat__timestamp');

  chat__timestamp.title= "time expanded"
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

require('electron').ipcRenderer.on('window_resize', function(event, message) {
  // console.log('scrolling to buttom becouse winresize');
  
  if(viewing_bottom)
  window.scrollTo(0, document.body.scrollHeight); 
});


function dragEnter(event) {
  $('#drag_layer').show();
  // $('#drag_layer').css('opacity',1);

  console.log('dragEnter fired');
  
}

function dragLeave(event) {


  
  console.log('dragEnter fired');
  // $('#drag_layer').css('opacity',0);
  // event.preventDefault();
  // event.stopPropagation();
}

function allowDrop(event) {
  console.log('allowDrop fired');
  $('#drag_layer').show();
  // $('#drag_layer').css('opacity',1);
  // event.preventDefault();
  // event.stopPropagation();
}


function endDrop(event) {
  console.log('endDrop fired');
  // $('#drag_layer').css('opacity','1');
  // event.preventDefault();
  // event.stopPropagation();
  
}

function drop(event) {
  console.log('drop fired');

  // $('#drag_layer').hide();
  event.preventDefault();
  // var data = event.dataTransfer.getData("Text");
  // event.target.appendChild(document.getElementById(data));
}