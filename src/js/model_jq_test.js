import $ from 'jquery'

export var LycIDS = {
  name: "liu yu cai Information Dissemination System",
  desc: "刘宇才信息发布系统",
  model: {
    proportion: '',
    width: 0,
    height: 0,
    zoom: 100,
    background: '',
    editWidth: 0,
    editHeight: 0,
    area: []
  },

  /**
   * 当前选中的区域index
   */
  activeArea: null,

  /**
   * 当前正在创建的区域信息
   */
  currentArea :{},

  getName: function () {
    return this.name;
  },

  //***********************************修改模板数据*******************
  setModel: function (model) {
    console.log("模板数据改变")
    if (model.width != this.model.width) {
      this.setModelWidth(model.width);
    }
    if (model.height != this.model.height) {
      this.setModelHeight(model.height)
    }
    if (model.proportion != this.model.proportion) {
      this.setModelProportion(model.proportion)
    }
    if (model.zoom != this.model.zoom) {
      this.setModelZoom(model.zoom)
    }
    if (model.background != this.model.background) {
      this.setModelBackground(model.background)
    }
  },

  setModelWidth: function (width) {
    this.model.width = width;
    $("#model-main").css("width", this.model.width + "px");
  },
  setModelHeight: function (height) {
    this.model.height = height;
    $("#model-main").css("height", this.model.height + "px");
  },
  setModelProportion: function (proportion) {
    this.model.proportion = proportion;
    // $("#model-main").css("width",this.model.height + "px");
  },
  setModelZoom: function (zoom) {
    this.model.zoom = zoom;
    // $("#model-main").css("width",this.model.height + "px");
  },
  setModelBackground: function (background) {
    this.model.background = background;
    // $("#model-main").css("width",this.model.height + "px");
  },

  autoSetModelEditSize: function (visualWidth, visualHeight) {

    visualWidth = visualWidth - 2;
    visualHeight = visualHeight - 2;
    if (this.model.width > visualWidth && this.model.height > visualHeight) {
      let minModelWidth = this.model.width / 100;
      let minModelHeight = this.model.height / 100;

      let ratioWidth = Math.floor(visualWidth / minModelWidth);
      let ratioHeight = Math.floor(visualHeight / minModelHeight);
      if (ratioWidth > ratioHeight) {
        this.model.editWidth = minModelWidth * ratioHeight;
        this.model.editHeight = minModelHeight * ratioHeight
        this.model.zoom = ratioHeight;
      } else {
        this.model.editWidth = minModelWidth * ratioWidth;
        this.model.editHeight = minModelHeight * ratioWidth
        this.model.zoom = ratioWidth;
      }
      $("#model-main").css("width", this.model.editWidth + "px");
      $("#model-main").css("height", this.model.editHeight + "px");

      //对模板的区域进行处理
      for (let i = 0; i < this.model.area.length; i++) {
        //改变区域top,left的值
        $("#area-item" + (i + 1)).css("left", this.model.area[i].left / 100 * this.model.zoom);
        $("#area-item" + (i + 1)).css("top", this.model.area[i].top / 100 * this.model.zoom);
        //改变区域的大小
        $("#area-item" + (i + 1)).css("width", this.model.area[i].width / 100 * this.model.zoom);
        $("#area-item" + (i + 1)).css("height", this.model.area[i].height / 100 * this.model.zoom);
      }
      $('#model-main').get(0).dispatchEvent(new Event('modelZoomChange'));
    }
  },

  getModelData: function () {
    return {
      proportion: this.model.proportion,
      width: this.model.width,
      height: this.model.height,
      zoom: this.model.zoom,
      background: this.model.background,
    }
  },

  //***********************************修改区域数据*******************
  setArea: function (area) {
    debugger;
    if(!area){
      return;
    }
    let index = area.id - 1;
    if(!LycIDS.model.area[index]){
      return;
    }
      this.setAreaName(area.id,area.name);

      this.setAreaLeft(area.id,area.left);

      this.setAreaTop(area.id,area.top);

      this.setAreaWidth(area.id,area.width);

      this.setAreaHeight(area.id,area.height);

      this.setAreaZIndex(area.id,area.z_index);

      this.setAreaBackgroundColor(area.id,area.background_color);

      //修改选中框的大小

      console.log("区域信息改变")
  },

  setAreaName(areaId,name){
    let index = areaId - 1;
    LycIDS.model.area[index].name = name;
  },

  setAreaLeft(areaId,left){
    let index = areaId - 1;
    LycIDS.model.area[index].left = left;
    let displayLeft = left/LycIDS.model.zoom* 100;
    $("#area-item" + areaId).css("left", displayLeft + "px");
  },

  setAreaTop(areaId,top){
    let index = areaId - 1;
    LycIDS.model.area[index].top = top;
    let displayTop = top/LycIDS.model.zoom* 100;
    $("#area-item" + areaId).css("top", displayTop + "px");
  },

  setAreaWidth(areaId,width){
    let index = areaId - 1;
    LycIDS.model.area[index].width = width;
    let displayWidth = width/LycIDS.model.zoom* 100;
    $("#area-item" + areaId).css("width", displayWidth + "px");
  },

  setAreaHeight(areaId,height){
    let index = areaId - 1;
    LycIDS.model.area[index].height = height;
    let displayHeight = height/LycIDS.model.zoom* 100;
    $("#area-item" + areaId).css("height", displayHeight + "px");
  },
  setAreaZIndex(areaId,z_index){
    let index = areaId - 1;
    LycIDS.model.area[index].z_index = z_index;
    $("#area-item" + areaId).css("z_index", z_index);
  },
  setAreaBackgroundColor(areaId,background_color){
    let index = areaId - 1;
    LycIDS.model.area[index].background_color = background_color;
  },

  setActiveArea: function (activeArea) {
    this.activeArea = activeArea;
    //jQuery触发自定义事件 activeAreaChange
    $('#model-main').get(0).dispatchEvent(new Event('activeAreaChange'));
  },

  getActiveArea() {
    return LycIDS.model.area[this.activeArea];
  },

  createAreaChange(currentArea){
    this.currentArea = currentArea;
    $('#model-main').get(0).dispatchEvent(new Event('createAreaChange'));
  },
  getCreateArea() {
    return LycIDS.currentArea;
  },
  afterCreateArea(){
    $('#model-main').get(0).dispatchEvent(new Event('afterCreateArea'));
  },

  /**
   * 获取可命名的区域名称
   */
  getAreaNames(currentAreaName) {
    //区域名称是A-Z 26个大写英文字母
    let areaNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let editAreaNames = [];
    let hasAreaName = false;
    for (let i = 0; i < areaNames.length; i++) {
      for (let j = 0; j < this.model.area.length; j++) {
        if (this.model.area[j].name == areaNames[i]) {
          if (currentAreaName != areaNames[i]) {
            hasAreaName = true;
          }
          break;
        }
      }
      if (!hasAreaName) {
        editAreaNames.push(areaNames[i]);
      }
      hasAreaName = false;
    }

    if(editAreaNames.length == 0){
      editAreaNames = areaNames
    }
    return editAreaNames;
  },

  initEditModel: function (model) {

    if (model.width == '' || model.width == undefined || model.width <= 0) {
      model.width = 1920;
      $("#model-main").css("width", "1920px")
    } else {
      if (model.width > 0) {
        $("#model-main").css("width", model.width + "px")
      }
    }
    if (model.height == '' || model.height == undefined || model.height <= 0) {
      model.height = 1080;
      $("#model-main").css("height", "1080px")
    } else {
      if (model.width > 0) {
        $("#model-main").css("height", model.height + "px")
      }
    }
    this.model.width = model.width;
    this.model.height = model.height;
    this.model.zoom = model.zoom;
    this.model.background = model.background,
      $('#model-main').get(0).dispatchEvent(new Event('afterInitModel'));
  },

  main: function () {

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

    //当前正在编辑的区域
    var currentArea = null;

    //初始化

    $("#model-main").mousedown(function (e) {

      if (e.button == 0) { //左键
        if (operate == "add") {
          IF_MOUSE_DOWN = true;
          MOUSE_DOWN_CLIENT_X = e.offsetX;
          MOUSE_DOWN_CLIENT_Y = e.offsetY;

          console.log(LycIDS.model);
          areaNum = LycIDS.model.area.length + 1;
          let areaId = "area-item" + areaNum;

          //设置该区域的名称
          let areaName = LycIDS.getAreaNames()[0];
          $("#model-main").append("<div class='area-item' id=" + areaId + " data-index = \'" + LycIDS.model.area.length + "\' style='border:1px solid #c3c3c3;height:0;width:0;position: absolute;pointer-events:none;background:#EEF3F8;font-size:40px;text-align: center;color:#c3c3c3'>"+areaName+"</div>");

          var area = createArea();

          area.id = areaNum;
          area.top = Math.ceil(MOUSE_DOWN_CLIENT_Y / LycIDS.model.zoom * 100);
          area.left = Math.ceil(MOUSE_DOWN_CLIENT_X / LycIDS.model.zoom * 100);
          area.name=areaName;
          currentArea = area;

          $("#" + areaId).css("top", MOUSE_DOWN_CLIENT_Y + "px");
          $("#" + areaId).css("left", MOUSE_DOWN_CLIENT_X + "px");



          LycIDS.createAreaChange(currentArea);
        }

        //如果有选中了区域，则取消选中
        if (operate == "select" && $(this).parents("#edit-select").length == 0 && !$(this).hasClass("area-item")) {
          CHANGE_AREA_TYPE = null;
          $("#edit-select").css("display", "none");

          //切换模板选择
          $('#model-main').get(0).dispatchEvent(new Event('selectModel'));
        }
      } else if (e.button == 2) { //右键

      } else if (e.button == 1) { //滚轮

      }
    });

    $("#model-main").mousemove(function (e) {
      e.stopPropagation();
      if (IF_MOUSE_DOWN && operate == "add") {
        let areaId = "area-item" + areaNum;
        let areaWidth = 0;
        let areaHeight = 0;
        if ((e.offsetY - MOUSE_DOWN_CLIENT_Y) > 0 && (e.offsetX - MOUSE_DOWN_CLIENT_X) > 0) {
          if (e.offsetX < $("#model-main").width()) {
            areaWidth = e.offsetX - MOUSE_DOWN_CLIENT_X;
          } else {
            areaWidth = $("#model-main").width() - MOUSE_DOWN_CLIENT_X;
          }
          if (e.offsetY < $("#model-main").height()) {
            areaHeight = e.offsetY - MOUSE_DOWN_CLIENT_Y;
          } else {
            areaHeight = $("#model-main").height() - MOUSE_DOWN_CLIENT_Y;
          }
          $("#" + areaId).css("width", areaWidth + "px");
          $("#" + areaId).css("height", areaHeight + "px");
          $("#" + areaId).css("line-height", areaHeight + "px");
          currentArea.width = Math.ceil(areaWidth / LycIDS.model.zoom * 100);
          currentArea.height = Math.ceil(areaHeight / LycIDS.model.zoom * 100);

          LycIDS.createAreaChange(currentArea);
        }
      }

      if (IF_MOUSE_DOWN && operate == "select") {

        if (CHANGE_AREA_TYPE == "AREA_TOP") {
          changeAreaTop(e);
          LycIDS.setActiveArea(LycIDS.activeArea);
          return;
        }
        if (CHANGE_AREA_TYPE == "AREA_RIGHT_TOP") {
          changeAreaTop(e);
          changeAreaRight(e);
          LycIDS.setActiveArea(LycIDS.activeArea);
          return;
        }
        if (CHANGE_AREA_TYPE == "AREA_RIGHT") {
          changeAreaRight(e);
          LycIDS.setActiveArea(LycIDS.activeArea);
          return;
        }
        if (CHANGE_AREA_TYPE == "AREA_RIGHT_BOTTOM") {
          changeAreaRight(e);
          changeAreaBottom(e);
          LycIDS.setActiveArea(LycIDS.activeArea);
          return;
        }
        if (CHANGE_AREA_TYPE == "AREA_BOTTOM") {
          changeAreaBottom(e);
          LycIDS.setActiveArea(LycIDS.activeArea);
        }
        if (CHANGE_AREA_TYPE == "AREA_LEFT_BOTTOM") {
          changeAreaBottom(e);
          changeAreaLeft(e);
          LycIDS.setActiveArea(LycIDS.activeArea);
          return;
        }
        if (CHANGE_AREA_TYPE == "AREA_LEFT") {
          changeAreaLeft(e);
          LycIDS.setActiveArea(LycIDS.activeArea);
          return;
        }
        if (CHANGE_AREA_TYPE == "AREA_LEFT_TOP") {
          changeAreaLeft(e);
          changeAreaTop(e);
          LycIDS.setActiveArea(LycIDS.activeArea);
          return;
        }
        if (CHANGE_AREA_TYPE == "AREA_ALL") {

          console.log($(this));
          let moveX = e.offsetX - MOUSE_DOWN_CLIENT_X;
          let moveY = e.offsetY - MOUSE_DOWN_CLIENT_Y;
          let targetX = $(selectArea)[0].offsetLeft + moveX;
          let targetY = $(selectArea)[0].offsetTop + moveY;
          if (moveX < 0) {
            if (targetX >= 0) {
              $("#edit-select").css("left", targetX + "px");
              $(selectArea).css("left", targetX + "px");
              //修改该区域的位子信息
              LycIDS.model.area[LycIDS.activeArea].left =  Math.ceil(targetX / LycIDS.model.zoom * 100);
            } else {
              $("#edit-select").css("left", 0);
              $(selectArea).css("left", 0);
              LycIDS.model.area[LycIDS.activeArea].left =  0;
            }
          }

          if (moveX > 0) {
            if (targetX <= ($("#model-main").width() - $(selectArea).width())) {
              $("#edit-select").css("left", targetX + "px");
              $(selectArea).css("left", targetX + "px");
              LycIDS.model.area[LycIDS.activeArea].left =  Math.ceil(targetX / LycIDS.model.zoom * 100);
            } else {
              $("#edit-select").css("left", $("#model-main").width() - $(selectArea).width() + "px");
              $(selectArea).css("left", $("#model-main").width() - $(selectArea).width() + "px");
              LycIDS.model.area[LycIDS.activeArea].left =  Math.ceil(($("#model-main").width() - $(selectArea).width()) / LycIDS.model.zoom * 100);
            }
          }

          if (moveY < 0) {
            if (targetY >= 0) {
              $("#edit-select").css("top", targetY + "px");
              $(selectArea).css("top", targetY + "px");
              LycIDS.model.area[LycIDS.activeArea].top =  Math.ceil(targetY / LycIDS.model.zoom * 100);
            } else {
              $("#edit-select").css("top", 0);
              $(selectArea).css("top", 0);
              LycIDS.model.area[LycIDS.activeArea].top =  0;
            }
          }

          if (moveY > 0) {
            if (targetY <= ($("#model-main").height() - $(selectArea).height())) {
              $("#edit-select").css("top", targetY + "px");
              $(selectArea).css("top", targetY + "px");
              LycIDS.model.area[LycIDS.activeArea].top =  Math.ceil(targetY / LycIDS.model.zoom * 100);
            } else {
              $("#edit-select").css("top", $("#model-main").height() - $(selectArea).height() + "px");
              $(selectArea).css("top", $("#model-main").height() - $(selectArea).height() + "px");
              LycIDS.model.area[LycIDS.activeArea].top =  Math.ceil(($("#model-main").height() - $(selectArea).height()) / LycIDS.model.zoom * 100);
            }
          }
          LycIDS.setActiveArea(LycIDS.activeArea);
          return;
        }
      }
    });

    $("#model-main").mouseup(function (e) {

      MOUSE_DOWN_CLIENT_X = 0;
      MOUSE_DOWN_CLIENT_Y = 0;
      $(".area-item").css("pointer-events", "auto");
      $(selectArea).css("pointer-events", "auto");
      $("#edit-select-box").css("pointer-events", "auto");
      $("#edit-select").css("pointer-events", "auto");
      $("#edit-select-box").css("cursor", "default");

    });

    $("#edit-select-box").mousedown(function (e) {
      e.stopPropagation();
    })

    $(document).mouseup(function (e) {
      if (e.button == 0) { //左键
        if (IF_MOUSE_DOWN) {
          IF_MOUSE_DOWN = false;
          MOUSE_DOWN_CLIENT_X = 0;
          MOUSE_DOWN_CLIENT_Y = 0;
          $(".area-item").css("pointer-events", "auto");
          $(selectArea).css("pointer-events", "auto");
          $("#edit-select-box").css("pointer-events", "auto");
          $("#edit-select").css("pointer-events", "auto");
          $("#edit-select-box").css("cursor", "default");

          if (operate == "add" && currentArea) {

            if(currentArea.width > 1 && currentArea.height > 1){
              LycIDS.model.area.push(currentArea);
            }else{
              //删除dom
              let areaId = "area-item" + areaNum;
              $("#" + areaId).remove();
              areaNum--;
            }
            currentArea = null;
            LycIDS.currentArea = null;
            //恢复模板编辑信息
            LycIDS.afterCreateArea();
          }
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

    $("#model-main").on("click", ".area-item", function (e) {
      if (e.button == 0) { //左键
        if (operate == "select") {
          //设置当前的区域
          LycIDS.activeArea = $(this).attr("data-index"),
          selectArea = this;
          $("#edit-select").css("top", $(this)[0].offsetTop + "px");
          $("#edit-select").css("left", $(this)[0].offsetLeft + "px");
          $("#edit-select-box").css("width", $(this).width());
          $("#edit-select-box").css("height", $(this).height());
          $("#edit-select-point-top").css("left", $(this).width() / 2);
          $("#edit-select-point-left").css("top", $(this).height() / 2);
          $("#edit-select-point-bottom").css("left", $(this).width() / 2);
          $("#edit-select-point-right").css("top", $(this).height() / 2);
          $("#edit-select").css("display", "block");

          LycIDS.setActiveArea(LycIDS.activeArea);
        }
      }
    });

    $(".select-point").mousedown(function (e) {
      //阻止向上冒泡，否者触发edit-select-box的mousedown事件
      e.stopPropagation();
      if (e.button == 0) { //左键
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
        $(selectArea).css("pointer-events", "none");
        $("#edit-select-box").css("pointer-events", "none");
        $("#edit-select").css("pointer-events", "none");
        IF_MOUSE_DOWN = true;
      }
    });

    $("#edit-select-box").mousedown(function (e) {
      if (e.button == 0 && operate == "select") { //左键
        console.log("33333");
        CHANGE_AREA_TYPE = "AREA_ALL";
        $("#edit-select-box").css("cursor", "move");
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
        width: 0,
        height: 0,
        area: []
      };
      return model;
    }

    function createArea() {
      var area = {
        id:"",
        name: "",
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        z_index: 0,
        background_color: "#fff",
      };

      return area;
    }

    function changeAreaTop(e) {
      console.log(e.offsetY);
      let areaHeight = $(selectArea)[0].offsetTop - e.offsetY + $(selectArea).height();
      if (areaHeight > 0) {
        $(selectArea).css("height", areaHeight + "px");
        $(selectArea).css("top", e.offsetY + "px");
        $(selectArea).css("line-height", areaHeight + "px");
        $("#edit-select").css("top", e.offsetY + "px");
        $("#edit-select-box").css("height", areaHeight + "px");
        $("#edit-select-point-right").css("top", areaHeight / 2 + "px");
        $("#edit-select-point-left").css("top", areaHeight / 2 + "px");

        LycIDS.model.area[LycIDS.activeArea].top =  Math.ceil(e.offsetY / LycIDS.model.zoom * 100);
        LycIDS.model.area[LycIDS.activeArea].height =  Math.ceil(areaHeight / LycIDS.model.zoom * 100);
      }
    }

    function changeAreaBottom(e) {
      if (e.offsetY > $(selectArea)[0].offsetTop) {
        let areaHeight = e.offsetY - $(selectArea)[0].offsetTop;
        $(selectArea).css("height", areaHeight + "px");
        $(selectArea).css("line-height", areaHeight + "px");
        $("#edit-select-box").css("height", areaHeight + "px");
        $("#edit-select-point-right").css("top", areaHeight / 2 + "px");
        $("#edit-select-point-left").css("top", areaHeight / 2 + "px");

        LycIDS.model.area[LycIDS.activeArea].height =  Math.ceil(areaHeight / LycIDS.model.zoom * 100);
      }
    }

    function changeAreaRight(e) {
      if (e.offsetX > $(selectArea)[0].offsetLeft) {
        let areaWidth = e.offsetX - $(selectArea)[0].offsetLeft;
        $(selectArea).css("width", areaWidth + "px");
        $("#edit-select-box").css("width", areaWidth + "px");
        $("#edit-select-point-top").css("left", areaWidth / 2 + "px");
        $("#edit-select-point-bottom").css("left", areaWidth / 2 + "px");

        LycIDS.model.area[LycIDS.activeArea].width =  Math.ceil(areaWidth / LycIDS.model.zoom * 100);

      }
    }

    function changeAreaLeft(e) {
      let areaWidth = $(selectArea)[0].offsetLeft - e.offsetX + $(selectArea).width();
      if (e.offsetX >= 0 && areaWidth > 0) {
        $(selectArea).css("width", areaWidth + "px");
        $(selectArea).css("left", e.offsetX + "px");
        $("#edit-select").css("left", e.offsetX + "px");
        $("#edit-select-box").css("width", areaWidth + "px");
        $("#edit-select-point-top").css("left", areaWidth / 2 + "px");
        $("#edit-select-point-bottom").css("left", areaWidth / 2 + "px");
        LycIDS.model.area[LycIDS.activeArea].width =  Math.ceil(areaWidth / LycIDS.model.zoom * 100);
        LycIDS.model.area[LycIDS.activeArea].left =  Math.ceil(e.offsetX / LycIDS.model.zoom * 100);
      }
    }

  },

  init: function (model) {
    //初始化编辑区域
    this.initEditModel(model);
    this.main();
  }
};

export const saveModelJq = function () {
  LycIDS.name = "邓雪绸"
  console.log(LycIDS.getName());
}
