<template>
  <div class="view-body">
      <el-container style="height:100%" class="view-container">
        <el-container style="height: 100%;padding: 10px;">
<!--          <el-header style="background: #fff">Header</el-header>-->
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
          <el-main id="container-main" style="margin-top: 10px;padding-top: 0">
<!--            <canvas id="myCanvas" width="800" height="450" style="border:1px solid #c3c3c3;" @mousedown.native="mouseDownCanvas($event)">-->
<!--              您的浏览器不支持 HTML5 canvas 标签。-->
<!--            </canvas>-->
<!--            <canvas id="myCanvas" width="400" height="225" style="border:1px solid #c3c3c3;">-->
<!--              您的浏览器不支持 HTML5 canvas 标签。-->
<!--            </canvas>-->
            <div id="model-main" style="border:1px solid #c3c3c3;width: 400px;height: 225px;background: #fff;margin: 0 auto;position: relative">

              <div id="edit-select" style="position:absolute">
                <div id="edit-select-box" style="position:relative">
                  <div id="edit-select-point-top" class="select-point" style="position:absolute;top:-4px;"></div>
                  <div id="edit-select-point-rightTop" class="select-point" style="position:absolute;top:-3px;right:-3px"></div>
                  <div id="edit-select-point-right" class="select-point" style="position:absolute;right: -4px;"></div>
                  <div id="edit-select-point-rightBottom" class="select-point" style="position:absolute;bottom:-3px;right:-3px"></div>
                  <div id="edit-select-point-bottom" class="select-point" style="position:absolute;bottom: -4px;"></div>
                  <div id="edit-select-point-leftBottom" class="select-point" style="position:absolute;left: -3px;bottom: -3px"></div>
                  <div id="edit-select-point-left" class="select-point" style="position:absolute;left: -4px;"></div>
                  <div id="edit-select-point-leftTop" class="select-point" style="position:absolute;left: -3px;top: -3px"></div>
                </div>
              </div>

            </div>
          </el-main>
        </el-container>
        <el-aside width="200px" style="height:100%;padding: 10px">
          <div style="height:100%;background: #fff;">
            <el-button type="primary" @click="saveModel">主要按钮</el-button>
          </div>
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

</style>
<script>
  import $ from 'jquery'
  import {modelJq,saveModelJq,abc} from '@/js/model_jq.js'
  // import '@/js/model_jq.js'

  export default {
    name: 'first',
    data () {
      return {
          msg: '主页',
      }
    },
    watch: {
    },
    methods: {
        mouseDownCanvas(event) {
            console.log("1111-ada");
            console.log(event)
        },
        saveModel(){
            console.log("*****************");
            console.log(abc);
        }
    },
    mounted() {
        let height = document.getElementsByClassName("view-body")[0].clientHeight;

        // document.getElementsByClassName("view-container")[0].style.height = height -20 + 'px';
        console.log('123');
        console.log(height);
    }
  }

</script>

