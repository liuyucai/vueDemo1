<template>
  <div class="view-body">
      <el-container style="height:100%" class="view-container">
        <el-container style="height: 100%;padding: 10px;">
          <el-aside width="60px" style="height:100%;background: #fff;border: 1px solid #ccc;">
            <div style="">
              <div class="model-operate-item" id="select-opt">
                <i class="el-icon-position"></i>
              </div>
              <div class="model-operate-item" id="add-opt">
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </el-aside>
          <el-main id="container-main" style="margin: 10px;margin-right:0;padding-top: 0;">
<!--            <canvas id="myCanvas" width="800" height="450" style="border:1px solid #c3c3c3;" @mousedown.native="mouseDownCanvas($event)">-->
<!--              您的浏览器不支持 HTML5 canvas 标签。-->
<!--            </canvas>-->
<!--            <canvas id="myCanvas" width="400" height="225" style="border:1px solid #c3c3c3;">-->
<!--              您的浏览器不支持 HTML5 canvas 标签。-->
<!--            </canvas>-->
            <div id="model-main"
                 @selectModel="selectModel"
                 @activeAreaChange='activeAreaChange'
                 @afterInitModel="afterInitModel"
                 @modelZoomChange="modelZoomChange"
                 @createAreaChange="createAreaChange"
                 @afterCreateArea="afterCreateArea"
                 style="border:1px solid #c3c3c3;width: 400px;height: 225px;background: #fff;margin: 0 auto;position: relative;overflow: hidden;user-select: none;">
              <div id="edit-select" style="position:absolute">
                <div id="edit-select-box" style="position:relative" oncontextmenu="return false;">
                  <div id="edit-select-point-top" class="select-point" style="position:absolute;top:-4px;"></div>
                  <div id="edit-select-point-rightTop" class="select-point" style="position:absolute;top:-3px;right:-3px"></div>
                  <div id="edit-select-point-right" class="select-point" style="position:absolute;right: -4px;"></div>
                  <div id="edit-select-point-rightBottom" class="select-point" style="position:absolute;bottom:-3px;right:-3px"></div>
                  <div id="edit-select-point-bottom" class="select-point" style="position:absolute;bottom: -4px;"></div>
                  <div id="edit-select-point-leftBottom" class="select-point" style="position:absolute;left: -3px;bottom: -3px"></div>
                  <div id="edit-select-point-left" class="select-point" style="position:absolute;left: -4px;"></div>
                  <div id="edit-select-point-leftTop" class="select-point" style="position:absolute;left: -3px;top: -3px"></div>

                  <div id="delete-area-box" style="position: fixed;display: none;border: 1px solid #ccc;padding: 5px 0;width: 60px;font-size:14px;cursor: pointer;text-align: center;background: #fff;z-index: 99999" oncontextmenu="return false;">
                    <div class="operate-item" style="height: 20px;line-height: 20px;" @click="deleteArea">删除</div>
                  </div>
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
        <el-aside width="280px" style="height:100%;padding: 10px;padding-left:0">
          <el-container style="height:100%;background: #fff;">
            <el-main style="padding: 15px;background: #fff;">
              <div style="background: #fff;" v-if="ifOperateArea">
                <el-form label-width="80px" size="mini">
                  <el-form-item label="区域名称:">
                    <el-select v-model="activeArea.name" placeholder="请选择区域名称" @focus="getAreaNames">
                      <el-option
                        v-for="item in areaNames"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="宽度:">
                    <el-input v-model="activeArea.width" @input="changeAreaWidth"></el-input>
                  </el-form-item>
                  <el-form-item label="高度:">
                    <el-input v-model="activeArea.height" @input="changeAreaHeight"></el-input>
                  </el-form-item>
                  <el-form-item label="top:">
                    <el-input v-model="activeArea.top" @input="changeAreaTop"></el-input>
                  </el-form-item>
                  <el-form-item label="left:">
                    <el-input v-model="activeArea.left" @input="changeAreaLeft"></el-input>
                  </el-form-item>
                  <el-form-item label="z-index:">
                    <el-input v-model="activeArea.zIndex" @input="changeAreaZIndex"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div style="background: #fff;" v-if="!ifOperateArea">
                <el-form label-width="80px" size="mini">
                  <el-form-item label="比例:">
                    <el-select
                      clearable
                      v-model="modelData.proportion"
                      placeholder="请选择比例">
                      <el-option label="4:3" value="4:3"></el-option>
                      <el-option label="16:9" value="16:9"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="宽度:">
                    <el-input v-model="modelData.width"></el-input>
                  </el-form-item>
                  <el-form-item label="高度:">
                    <el-input v-model="modelData.height"></el-input>
                  </el-form-item>
                  <el-form-item label="缩放比例:">
                    <el-row>
                      <el-col :span="15">
                        <el-slider v-model="modelData.zoom"></el-slider>
                      </el-col>
                      <el-col :span="9" style="text-align: right;vertical-align: bottom">
                        <el-button style="font-size: 10px;padding: 4px" @click="autoSetModelEditSize">自适应</el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="背景:">
                    <el-input v-model="modelData.background"></el-input>
                  </el-form-item>
                </el-form>

                <div class="all-area-box">
                  <div style="height: 20px;line-height: 20px;text-align: left;padding-top: 10px;border-bottom: 1px solid #ccc;font-size: 14px">所有区域</div>
                  <div style="height: 150px;overflow-y:auto">
                    <div v-for="area in areaList" :key="area.id" style="padding: 5px 10px" class="show-area-item">
                      <div class="clearfix">
                        <div style="float: left">{{area.name}}</div>
                        <div style="float: right;font-size: 12px;cursor:pointer" @click="deleteArea(area.id)">删除</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-main>
            <el-footer height="50px" style="padding: 10px">
              <el-button type="primary" @click="saveModel" size="mini" style="float:right"> 保 存 </el-button>
            </el-footer>
          </el-container>
        </el-aside>
      </el-container>
  </div>
</template>

<style>

  .view-body{
    overflow: hidden;
    height: 100%;
  }
  .el-scrollbar__view{
    height: 100%;
  }
  .model-operate-item{
    height: 50px;
    line-height: 50px;
    font-size: 30px;
    text-align: center;
    border: 1px solid #ccc;
    margin: 5px 2px;
  }
  .model-operate-item:hover,.model-operate-item.active{
    border-color: #39cccc;
    color: #39cccc;
  }
  #edit-select{
    display: none;
  }

  #edit-select-box{
    border: 1px solid #2BC2E8;
    z-index: 9999;
  }
  .select-point{
    width: 4px;
    height: 4px;
    border-radius: 50%;
    border: 1px solid #2BC2E8;
    background: #2BC2E8;
    z-index: 9999;
  }
  #edit-select-point-top:hover,#edit-select-point-bottom:hover{
    cursor: s-resize;
  }
  #edit-select-point-left:hover,#edit-select-point-right:hover{
    cursor: w-resize;
  }
  #edit-select-point-leftTop:hover,#edit-select-point-rightBottom:hover{
    cursor: se-resize;
  }
  #edit-select-point-rightTop:hover,#edit-select-point-leftBottom:hover{
    cursor: ne-resize;
  }

  #delete-area-box .operate-item:hover{
    color: #39cccc;
    background: #e8e8e8;
  }
  .show-area-item:hover{
    color: #39cccc;
    background: #f0f2f5;
  }
  .clearfix{
    content: "";
    clear: both;
    display: block;
  }
  .clearfix:before,.clearfix:after{
    content: "";
    clear: both;
    display: block;
    visibility: hidden;
  }
</style>
<script>
  import $ from 'jquery'
  // import {modelJq,saveModelJq} from '@/js/model_jq.js'
  // import '@/js/model_jq.js'
  // import {modelJq,modelData,saveModelJq} from '@/js/model_jq_test.js'
  import {LycIDS,saveModelJq} from '@/js/model_jq_test.js'

  export default {
    name: 'model',
    data () {
      return {
          msg: '主页',
          activeArea:{
              id:"",
              name: "",
              left: 0,
              top: 0,
              width: 0,
              height: 0,
              z_index: 0,
              background_color: "#fff",
          },
          ifOperateArea:false,
          modelData:{
              proportion:'',
              width:0,
              height:0,
              zoom:100,
              background:'',
          },
          areaNames:[],
          areaList:[],
      }
    },
    watch: {
        modelData:{
            handler:function(){
                LycIDS.setModel(this.modelData);
            },
            deep:true
        },
        // activeArea:{
        //     handler:function () {
        //         console.log(this.activeArea);
        //         LycIDS.setArea(this.activeArea);
        //     },
        //     deep:true
        // }
    },
    methods: {
        mouseDownCanvas(event) {
            console.log("1111-ada");
            console.log(event)
        },
        saveModel(){
            console.log("*****************");
            console.log(LycIDS.getName());
            // saveModelJq();
            // LycIDS.init();
        },
        autoSetModelEditSize(){
            LycIDS.autoSetModelEditSize($("#container-main").width(),$("#container-main").height())
        },
        /**
         * 自定义事件，jq触发
         */
        activeAreaChange(){
            console.log("123");
            this.ifOperateArea = true;
            //怎么知道是哪个区域点击了
            //获取选中的区域
            this.activeArea = LycIDS.getActiveArea();
        },

        changeAreaWidth(width){
            LycIDS.setAreaWidth(this.activeArea.id,width);
        },

        changeAreaHeight(height){
            LycIDS.setAreaHeight(this.activeArea.id,height);
        },

        changeAreaTop(top){
            LycIDS.setAreaTop(this.activeArea.id,top);
        },

        changeAreaLeft(left){
            LycIDS.setAreaLeft(this.activeArea.id,left);
        },

        changeAreaZIndex(zindex){
            LycIDS.setAreaZIndex(this.activeArea.id,zindex);
        },

        createAreaChange(){
            this.ifOperateArea = true;
            this.activeArea = LycIDS.getCreateArea();
        },

        afterCreateArea(){
            this.ifOperateArea = false;
        },

        selectModel(){
            this.ifOperateArea = false;
        },
        afterInitModel(){
            this.modelData = LycIDS.getModelData();
            console.log(this.modelData);
        },
        modelZoomChange(){
            this.modelData.zoom = LycIDS.getModelData().zoom
        },
        getAreaNames(){
            let areaNames = LycIDS.getAreaNames();
            let editAreaNames = [];
            for(let i=0;i<areaNames.length;i++){
                editAreaNames.push({
                    value:areaNames[i],
                    label:areaNames[i]
                })
            }
            this.areaNames = editAreaNames;
        },
        deleteArea(areaId){
            LycIDS.deleteArea(areaId);
        },
        getAreaList(){
            this.areaList = LycIDS.getAreas();
        }
    },
    mounted() {
        let height = document.getElementsByClassName("view-body")[0].clientHeight;
        // document.getElementsByClassName("view-container")[0].style.height = height -20 + 'px';
        // let bb = modelJq();
        LycIDS.init(this.modelData);
        this.activeArea = LycIDS.getActiveArea();

        this.getAreaList();
    }
  }

</script>

