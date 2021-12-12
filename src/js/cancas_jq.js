import $ from 'jquery'
$(document).ready(function(){
  var c=document.getElementById("myCanvas");
  var ctx=c.getContext("2d");
  // ctx.fillStyle="#FF0000";
  // ctx.fillRect(0,0,150,75);

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000000';

  var IF_MOUSE_DOWN = false;
  var MOUSE_DOWN_CLIENT_X = 0;
  var MOUSE_DOWN_CLIENT_Y = 0;

  $("#myCanvas").mousedown(function (e) {

    IF_MOUSE_DOWN = true;
    MOUSE_DOWN_CLIENT_X = e.clientX - c.getBoundingClientRect().left;
    MOUSE_DOWN_CLIENT_Y = e.clientY - myCanvas.getBoundingClientRect().top;
  });

  $("#myCanvas").mousemove(function (e) {
    if(IF_MOUSE_DOWN){
      ctx.rect(MOUSE_DOWN_CLIENT_X,MOUSE_DOWN_CLIENT_Y,e.clientX - c.getBoundingClientRect().left,e.clientY - myCanvas.getBoundingClientRect().top);
      ctx.stroke();
    }
  });

  $("#myCanvas").mouseup(function () {
    IF_MOUSE_DOWN = false;
    MOUSE_DOWN_CLIENT_X = 0;
    MOUSE_DOWN_CLIENT_Y = 0;
  });

});
