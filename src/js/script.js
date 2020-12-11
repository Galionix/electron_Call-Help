// console.log($);
// const {  ipc } = require('electron').ipcRenderer;
// const ipc = require('electron').ipcMain
const ipc = require('electron').ipcRenderer;

// const { remote } = require('electron');

 function deleteAllItems () {
  var elem = document.getElementsByClassName("clip__item");


  Array.from(elem).forEach((el) => {
    // Do stuff here
    el.remove();
});

  // elem.forEach(function (item, index) {

  //   item.remove();
  // });

  
}

var transparency_toggle;
var wrap_toggle;

if (localStorage.getItem("transparency_toggle")=="true") 
{
  transparency_toggle=true; 
  $('#mytoggle').prop('checked', true);
}
else transparency_toggle=false;

if (localStorage.getItem("wrap_toggle")=="true") 
{
  wrap_toggle=true; 
  $('#mytoggle_wrap').prop('checked', true);
}
else wrap_toggle=false;

  




var statuses_texts = localStorage.getItem("statuses");
if (statuses_texts== null ) statuses_texts = 
`нет ответа
нет ответа + письмо отправлено 
автоответчик
автоответчик + письмо отправлено
поднял(а) трубку, тишина
бросил(а) трубку
бросил(а) трубку + письмо отправлено 
номер не существует
контакты не игрока
не интересует 
не гражданин РФ
нет 18 лет 
перезвонить 
перезвонить уточнить прошел ли ИД
проинформирован + письмо 
проходит ИД + письмо отправлено 
пройдет ИД позже + письмо 
передумал проходить ИД 
прошел ид +письмо
------
письмо отправлено
`;
// console.log(statuses_texts);
document.getElementById("statuses").value =statuses_texts ;
// console.log(statuses_texts);



var cliplist = document.getElementById('cliplist');
function make_elem(text,index) {
 
  var listitem = document.createElement("div");
 if (index==0) {
    listitem.removeAttribute('id');
    listitem.setAttribute("id", "selectable");
  }
listitem.classList.add(  "clip__item");
  listitem.textContent = text;
  return listitem;
}


function renewClips() {
  console.log('clips renewed!')
  deleteAllItems();
  console.log("items delete "+document.getElementsByClassName("clip__item").length);
  statuses_texts.split('\n').forEach((element,index) => {
    cliplist.appendChild(make_elem(element,index));
    
    });
    console.log(document.getElementsByClassName("clip__item").length);
}
renewClips();


$( "#menu_cliplist" ).on("mouseup", renewClips());



var date_text = function(){

  let currentdate = new Date();
  console.log('day '+currentdate.getDate() );
  
  return `[${ addZero(currentdate.getDate() ) }.${ addZero(currentdate.getMonth()+1)} ${addZero(currentdate.getHours())}:${addZero(currentdate.getMinutes()) }] `;
}

let prev_text = document.getElementById('selectable').textContent;
function selectText(containerid) {
if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(document.getElementById(containerid));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
  }
}

// $( ".clip__item" ).on("mousedown", function() {

// alert( "Handler for .click() called." );

// });

function my_restart()
{
  ipc.send('app-restart', 'someData');
}


function allhide() {
    $('#cliplist').hide();
    $('#chat').hide();
    $('#bonus').hide();
    $('#settings').hide();
    $('#info').hide();
}

$('#menu_settings').on("mouseup", function(){
    allhide();
$('#settings').show();
});
$('#menu_cliplist').on("mouseup", function(){
    allhide();
$('#cliplist').show();
});
$('#menu_chat').on("mouseup", function(){
    allhide();
    $('#chat').show();
    ipc.send('go_chat');
});
$('#menu_bonus').on("mouseup", function(){
    allhide();
$('#bonus').show();
});
$('#menu_info').on("mouseup", function(){
    allhide();
$('#info').show();
});

function unselect_all_cliplist_items() {
    
    $( ".clip__item" ).each(function(  ) {
        $(this).removeClass("menu-list-item-active");
      });
}
var getMonth = function(idx) {

  var objDate = new Date();
  objDate.setDate(1);
  objDate.setMonth(idx-1);

  var locale = "ru-ru",
      month = objDate.toLocaleString(locale, { month: "long" });

    return month;
}

var addZero = function (num){
console.log(num.toString().length);

  return  (num.toString().length > 1 )? num: '0'+num.toString() ;
   
}


$('.clip__item').on("dragend", function(){
  console.log('mouseUp');
  let item =  document.getElementById('selectable');
  item.textContent = prev_text;
});
$('.clip__item').on("mousedown", function(){

 let item =  document.getElementById('selectable');
 item.textContent = prev_text;
  item.id = '';

  prev_text = $(this).text();
  if(wrap_toggle)
  $(this).text('\r\n'+date_text()+ $(this).text()+'\r\n') ;
  else 
  $(this).text(date_text()+ $(this).text()) ;
 $(this).attr("id", "selectable");

 selectText("selectable");
});



$('.clip__item').on("mouseup", function(){



document.getElementById('selectable').textContent = prev_text;


var currentdate = new Date();
if(wrap_toggle)
navigator.clipboard.writeText(date_text()+$( this ).text()+'\r\n');
else 
navigator.clipboard.writeText(date_text()+$( this ).text());

unselect_all_cliplist_items();

$(this).addClass("menu-list-item-active");
    
    
});

// console.log('done');
/////////////////
// var authButton = document.getElementById('menu_bonus');
// authButton.addEventListener('click', function(){
//     ipc.once('actionReply', function(event, response){
//       authButton.textContent= response; 
//     })
//     ipc.send('invokeAction', 'someData');
// });

////////////
// var authButton = document.getElementById('menu_bonus');
// authButton.addEventListener('click', function(){
//     ipc.once('actionReply', function(event, response){
//       authButton.textContent=response;
//     })
//     ipc.send('app_version');
// });



// ipc.send('app_version');
// ipc.on('app_version', (event, arg) => {
//   ipc.removeAllListeners('app_version');
//   version.innerText = 'Version ' + arg.version;
// });



const shell = require('electron').shell;


$('.open-in-browser').on("click", (event) => {

        event.preventDefault();
        shell.openExternal(event.target.href);
        
});


$("#statuses").on("keyup", function(e){
  var statuses = document.getElementById("statuses").value ;
  //localStorage["user"] = user ;
  localStorage.setItem("statuses", statuses) ;
  statuses_texts = localStorage.getItem("statuses");
  renewClips();
});

function applyTransparency() {
 if (transparency_toggle)
 {
  console.log('transparency on');

   $('#cliplist').addClass("transparentable");
   $('#mynav').addClass("transparentable");
   localStorage.setItem('transparency_toggle',"true");
 }
 else{
  console.log('transparency off');

  $('#cliplist').removeClass("transparentable");
  $('#mynav').removeClass("transparentable");
  localStorage.setItem('transparency_toggle',"false");
 }
}

$('#transparency_switch').on('mouseup', function () {

  if (!$('#mytoggle').is(":checked"))
 transparency_toggle=true;
 else
 transparency_toggle=false;


  
  applyTransparency();
});


$('#wrap_switch').on('mouseup', function () {
  
  if (!$('#mytoggle_wrap').is(":checked"))
  {wrap_toggle=true;
    localStorage.setItem('wrap_toggle','true')
  }
 else
{ wrap_toggle=false;
  localStorage.setItem('wrap_toggle','false')
}



});



applyTransparency();

$('#menu_minimize').on('click',function () {
  ipc.send('app_minimize');
})
$('#menu_close').on('click',function () {

  ipc.send('app_close');
})

var elem = document.querySelector('input[type="range"]');

var rangeValue = function(){
  var newValue = elem.value;
  var target = document.querySelector('.value');
  target.innerHTML = newValue;
  document.body.style.fontSize=elem.value+"px";

//   var all = document.getElementsByClassName('button');
// for (var i = 0; i < all.length; i++) {
//   all[i].style.style.fontSize=elem.value+"px";
// }
}
rangeValue();
elem.addEventListener("input", rangeValue);

if(!localStorage.getItem("username")==undefined)
$('#user_name').val(localStorage.getItem("username"))

if($('#user_name').val()=='')
{

  
  $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
      $('#user_name').val('username')
      
      $('#user_name').val( 
        JSON.stringify(Object.values(data.results[0].name)).split('","').join(' ').replace('["','').replace('"]','')  );
    }
  });
}

$("#user_name").on("keyup", function(e){
  var statuses = document.getElementById("statuses").value ;
  //localStorage["user"] = user ;
  localStorage.setItem("statuses", statuses) ;
});

let open_part = localStorage.getItem('open_part');
if(open_part!=null&&open_part!='')
{
  allhide();
  $('#'+open_part).show();
}

function check_update_notification(updating) {
  console.log('check_update_notification called, updating: ' + updating)
}