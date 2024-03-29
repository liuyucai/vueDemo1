import $ from 'jquery'

export var modelData = {
  name:"liuyucai",
};
export var modelJq = $(document).ready(function(){
  var IF_MOUSE_DOWN = false;
  var MOUSE_DOWN_CLIENT_X = 0;
  var MOUSE_DOWN_CLIENT_Y = 0;

  var operate = "select";

  var selectArea = null;

  /*
    修改区域类型
    AREA_ALL：整个区域
    AREA_TOP：上边，
    AREA_RIGHT_TOP：右上角,
    AREA_RIGHT：右边,
    AREA_RIGHT_BOTTOM：右下角,
    AREA_BOTTOM：下边,
    AREA_LEFT_BOTTOM：左下角,
    AREA_LEFT：左边,
    AREA_LEFT_TOP：左上角
   */
  var CHANGE_AREA_TYPE = "AREA_ALL";

  //区域的数量
  var areaNum = 0;
  var model = {
    width:0,
    height:0,
    area:[

    ]
  };
  //当前正在编辑的区域
  var currentArea = null;

  $("#model-main").mousedown(function (e) {

    if(e.button ==0){ //左键
      if(operate == "add"){
        IF_MOUSE_DOWN = true;
        MOUSE_DOWN_CLIENT_X = e.offsetX;
        MOUSE_DOWN_CLIENT_Y = e.offsetY;

        areaNum = model.area.length + 1;
        let areaId = "area-item"+areaNum;

        $("#model-main").append("<div class='area-item' id="+ areaId +" style='border:1px solid #c3c3c3;height:0;width:0;position: absolute;pointer-events:none;'></div>");

        var area = createArea();

        area.top = MOUSE_DOWN_CLIENT_Y;
        area.left = MOUSE_DOWN_CLIENT_X;

        currentArea = area;

        model.area.push(currentArea);

        console.log(model);

        $("#"+areaId).css("top",MOUSE_DOWN_CLIENT_Y+"px");
        $("#"+areaId).css("left",MOUSE_DOWN_CLIENT_X+"px");
      }
    }else if(e.button ==2){ //右键

    }else if(e.button ==1){ //滚轮

    }
  });

  $("#model-main").mousemove(function (e) {
    e.stopPropagation();
    if(IF_MOUSE_DOWN && operate == "add"){
      let areaId = "area-item"+areaNum;
      let areaWidth = 0;
      let areaHeight = 0;
      if((e.offsetY-MOUSE_DOWN_CLIENT_Y)>0 && (e.offsetX-MOUSE_DOWN_CLIENT_X)>0){
        if(e.offsetX < $("#model-main").width()){
          areaWidth = e.offsetX-MOUSE_DOWN_CLIENT_X;
          // $("#"+areaId).css("width",areaWidth+"px");
        }else{
          areaWidth = $("#model-main").width()-MOUSE_DOWN_CLIENT_X;
          // $("#"+areaId).css("width",areaWidth+"px");
        }
        if(e.offsetY < $("#model-main").height()){
          areaHeight = e.offsetY-MOUSE_DOWN_CLIENT_Y;
          // $("#"+areaId).css("height",areaHeight+"px");
        }else {
          areaHeight = $("#model-main").height()-MOUSE_DOWN_CLIENT_Y;
          // $("#"+areaId).css("height",$("#model-main").height()-MOUSE_DOWN_CLIENT_Y+"px");
        }
        $("#"+areaId).css("width",areaWidth+"px");
        $("#"+areaId).css("height",areaHeight+"px");
        currentArea.width = areaWidth;
        currentArea.height = areaHeight;
      }
      // console.log(e.offsetX+","+e.offsetY+","+$("#model-main").height());
    }

    if(IF_MOUSE_DOWN && operate == "select"){

      if(CHANGE_AREA_TYPE == "AREA_TOP"){
        changeAreaTop(e);
        return;
      }
      if(CHANGE_AREA_TYPE == "AREA_RIGHT_TOP"){
        changeAreaTop(e);
        changeAreaRight(e);
        return;
      }
      if(CHANGE_AREA_TYPE == "AREA_RIGHT"){
        changeAreaRight(e);
        return;
      }
      if(CHANGE_AREA_TYPE == "AREA_RIGHT_BOTTOM"){
        changeAreaRight(e);
        changeAreaBottom(e);
        return;
      }
      if(CHANGE_AREA_TYPE == "AREA_BOTTOM"){
        changeAreaBottom(e);
      }
      if(CHANGE_AREA_TYPE == "AREA_LEFT_BOTTOM"){
        changeAreaBottom(e);
        changeAreaLeft(e);
        return;
      }
      if(CHANGE_AREA_TYPE == "AREA_LEFT"){
        changeAreaLeft(e);
        return;
      }
      if(CHANGE_AREA_TYPE == "AREA_LEFT_TOP"){
        changeAreaLeft(e);
        changeAreaTop(e);
        return;
      }
      if(CHANGE_AREA_TYPE == "AREA_ALL"){

        console.log("11111");
        let moveX = e.offsetX - MOUSE_DOWN_CLIENT_X;
        let moveY = e.offsetY - MOUSE_DOWN_CLIENT_Y;
        let targetX = $(selectArea)[0].offsetLeft + moveX;
        let targetY = $(selectArea)[0].offsetTop + moveY;
        if(moveX < 0){
          if(targetX >=0){
            $("#edit-select").css("left",targetX+"px");
            $(selectArea).css("left",targetX+"px");
          }else {
            $("#edit-select").css("left",0);
            $(selectArea).css("left",0);
          }
        }

        if(moveX > 0){
          if(targetX <= ($("#model-main").width()- $(selectArea).width())){
            $("#edit-select").css("left",targetX+"px");
            $(selectArea).css("left",targetX+"px");
          }else{
            $("#edit-select").css("left",$("#model-main").width() - $(selectArea).width()+"px");
            $(selectArea).css("left",$("#model-main").width() - $(selectArea).width()+"px");
          }
        }

        if(moveY < 0){
          if(targetY >=0){
            $("#edit-select").css("top",targetY+"px");
            $(selectArea).css("top",targetY+"px");
          }else {
            $("#edit-select").css("top",0);
            $(selectArea).css("top",0);
          }
        }

        if(moveY > 0){
          if(targetY <= ($("#model-main").height()- $(selectArea).height())){
            $("#edit-select").css("top",targetY+"px");
            $(selectArea).css("top",targetY+"px");
          }else{
            $("#edit-select").css("top",$("#model-main").height() - $(selectArea).height()+"px");
            $(selectArea).css("top",$("#model-main").height() - $(selectArea).height()+"px");
          }
        }
        return;
      }
    }
  });

  $("#model-main").mouseup(function (e) {
    IF_MOUSE_DOWN = false;
    MOUSE_DOWN_CLIENT_X = 0;
    MOUSE_DOWN_CLIENT_Y = 0;
    // areaNum++;
    // console.log(e);
    $(".area-item").css("pointer-events","auto");
    $(selectArea).css("pointer-events","auto");
    $("#edit-select-box").css("pointer-events","auto");
    $("#edit-select").css("pointer-events","auto");
    $("#edit-select-box").css("cursor","default");

    console.log(currentArea);
    console.log(model);
  });

  $(document).mouseup(function (e) {
    if(e.button ==0) { //左键
      if(IF_MOUSE_DOWN){
        IF_MOUSE_DOWN = false;
        MOUSE_DOWN_CLIENT_X = 0;
        MOUSE_DOWN_CLIENT_Y = 0;
        // areaNum++;
        $(".area-item").css("pointer-events","auto");
        $(selectArea).css("pointer-events","auto");
        $("#edit-select-box").css("pointer-events","auto");
        $("#edit-select").css("pointer-events","auto");
        $("#edit-select-box").css("cursor","default");
      }

      //如果有选中了区域，则取消选中
      if(operate == "select" && $(this).parents("#edit-select").length == 0){
        CHANGE_AREA_TYPE = null;
        $("#edit-select").css("display","none");
      }
    }
  });

  $("#select-opt").click(function () {
    operate = "select";
    var that = document.getElementById("container-main");
    that.style.cursor = 'default';
  });

  $("#add-opt").click(function () {
    operate = "add";
    var that = document.getElementById("container-main");
    that.style.cursor = 'crosshair';
  });

  $(".model-operate-item").click(function () {
    $(".model-operate-item").removeClass("active");
    $(this).addClass("active");
  });

  $("#model-main").on("click",".area-item",function(e){
    if(e.button ==0) { //左键
      if (operate == "select") {
        console.log($(this));
        selectArea = this;
        $("#edit-select").css("top",$(this)[0].offsetTop+"px");
        $("#edit-select").css("left",$(this)[0].offsetLeft+"px");
        $("#edit-select-box").css("width",$(this).width());
        $("#edit-select-box").css("height",$(this).height());
        $("#edit-select-point-top").css("left",$(this).width()/2);
        $("#edit-select-point-left").css("top",$(this).height()/2);
        $("#edit-select-point-bottom").css("left",$(this).width()/2);
        $("#edit-select-point-right").css("top",$(this).height()/2);
        $("#edit-select").css("display","block");
      }
    }
  });

  $(".select-point").mousedown(function (e) {
    //阻止向上冒泡，否者触发edit-select-box的mousedown事件
    e.stopPropagation();
    if(e.button ==0) { //左键
      switch ($(this).attr("id")) {
        case "edit-select-point-top" :
          CHANGE_AREA_TYPE = "AREA_TOP";
          break;
        case "edit-select-point-rightTop" :
          CHANGE_AREA_TYPE = "AREA_RIGHT_TOP";
          break;
        case "edit-select-point-right" :
          CHANGE_AREA_TYPE = "AREA_RIGHT";
          break;
        case "edit-select-point-rightBottom" :
          CHANGE_AREA_TYPE = "AREA_RIGHT_BOTTOM";
          break;
        case "edit-select-point-bottom" :
          CHANGE_AREA_TYPE = "AREA_BOTTOM";
          break;
        case "edit-select-point-leftBottom" :
          CHANGE_AREA_TYPE = "AREA_LEFT_BOTTOM";
          break;
        case "edit-select-point-left" :
          CHANGE_AREA_TYPE = "AREA_LEFT";
          break;
        case "edit-select-point-leftTop" :
          CHANGE_AREA_TYPE = "AREA_LEFT_TOP";
          break;
        default:
          CHANGE_AREA_TYPE = "AREA_ALL";
          break;
      }
      $(selectArea).css("pointer-events","none");
      $("#edit-select-box").css("pointer-events","none");
      $("#edit-select").css("pointer-events","none");
      IF_MOUSE_DOWN = true;
    }
  });

  $("#edit-select-box").mousedown(function (e) {
    if(e.button ==0 && operate == "select") { //左键
      console.log("33333");
      CHANGE_AREA_TYPE = "AREA_ALL";
      $("#edit-select-box").css("cursor","move");
      // $(selectArea).css("pointer-events", "none");
      $("#edit-select-box").css("pointer-events", "none");
      // $("#edit-select").css("pointer-events", "none");
      IF_MOUSE_DOWN = true;
      MOUSE_DOWN_CLIENT_X = e.offsetX;
      MOUSE_DOWN_CLIENT_Y = e.offsetY;
    }
  });

  function createModel() {

    var model = {
      width:0,
      height:0,
      area:[

      ]
    };
    return model;
  }

  function createArea() {
    var area ={
      name: "",
      z_index:0,
      left:0,
      top:0,
      width: 0,
      height: 0,
      background_color: "#fff",
    };

    return area;
  }

  function changeAreaTop(e) {
    console.log(e.offsetY);
    let areaHeight = $(selectArea)[0].offsetTop - e.offsetY + $(selectArea).height();
    if(areaHeight >0){
      $(selectArea).css("height",$(selectArea)[0].offsetTop - e.offsetY + $(selectArea).height()+"px");
      $(selectArea).css("top",e.offsetY+"px");
      $("#edit-select").css("top",e.offsetY+"px");
      $("#edit-select-box").css("height",areaHeight+"px");
      $("#edit-select-point-right").css("top",areaHeight/2+"px");
      $("#edit-select-point-left").css("top",areaHeight/2+"px");
    }
  }

  function changeAreaBottom(e) {
    console.log(e.offsetY);
    if(e.offsetY > $(selectArea)[0].offsetTop){
      let areaHeight = e.offsetY - $(selectArea)[0].offsetTop;
      $(selectArea).css("height",areaHeight+"px");
      $("#edit-select-box").css("height",areaHeight+"px");
      $("#edit-select-point-right").css("top",areaHeight/2+"px");
      $("#edit-select-point-left").css("top",areaHeight/2+"px");
    }
  }
  function changeAreaRight(e) {
    if(e.offsetX > $(selectArea)[0].offsetLeft){
      let areaWidth = e.offsetX - $(selectArea)[0].offsetLeft;
      $(selectArea).css("width",areaWidth+"px");
      $("#edit-select-box").css("width",areaWidth+"px");
      $("#edit-select-point-top").css("left",areaWidth/2+"px");
      $("#edit-select-point-bottom").css("left",areaWidth/2+"px");
    }
  }
  function changeAreaLeft(e) {
    let areaWidth = $(selectArea)[0].offsetLeft - e.offsetX + $(selectArea).width();
    if(e.offsetX >= 0 && areaWidth>0){
      $(selectArea).css("width",areaWidth+"px");
      $(selectArea).css("left",e.offsetX+"px");
      $("#edit-select").css("left",e.offsetX+"px");
      $("#edit-select-box").css("width",areaWidth+"px");
      $("#edit-select-point-top").css("left",areaWidth/2+"px");
      $("#edit-select-point-bottom").css("left",areaWidth/2+"px");
    }
  }
});

export const saveModelJq = function () {
  console.log(modelData.name);
}
