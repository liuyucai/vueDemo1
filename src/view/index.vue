<template>
  <div class="index-view-body">
    <div class="total-nav">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="always">
            总是显示
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            鼠标悬浮时显示
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never">
            从不显示
          </el-card>
        </el-col>
      </el-row>
    </div>
<!--    <div class="list-container">-->
      <div class="list-top-nav">
        <span>数据展示</span>
        <i class="el-icon-minus" style="float: right;cursor: pointer" @click="show2 = !show2"></i>
      </div>
      <transition name="el-zoom-in-top">
        <div class="list-main" v-show="show2">
          <el-row :gutter="20">
            <el-col :span="12">
              <div id="myChart" style="width: 100%;height: 300px;"></div>
            </el-col>
            <el-col :span="12">
              <div id="gdChart" style="width: 100%;height: 300px;"></div>
            </el-col>
          </el-row>
        </div>
      </transition>
<!--    </div>-->
    <el-row :gutter="20">
      <el-col :span="14">
        <div style="margin-top: 20px">
          <div class="list-top-nav">
            <span>数据展示</span>
            <i class="el-icon-minus" style="float: right;cursor: pointer" @click="show2 = !show2"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div style="margin-top: 20px">
          <div class="list-top-nav">
            <span>数据展示</span>
            <i class="el-icon-minus" style="float: right;cursor: pointer" @click="show2 = !show2"></i>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .index-view-body{
    margin: 10px;
    border-radius: 4px;
    overflow: hidden;
  }
  .total-nav{
    margin-bottom: 10px;
  }
  .list-container{
    background-color: white;
  }
  .list-top-nav{
    padding: 10px;
    background-color: white;
  }
  .list-main{
    padding: 10px;
    border-top: 1px solid #f4f4f4;
    background-color: white;
  }
  #myChart,#gdChart{
    display:inline-block;
  }
</style>
<script>
    import "echarts/map/js/province/guangdong.js";
    import 'echarts/map/js/china.js';
    import echarts from 'echarts/lib/echarts';
    import gdJion from 'echarts/map/json/province/guangdong.json'

    export default {
        name: 'first',
        data () {
            return {
                msg: '主页',
                isCollapse: true,
                queryContainerState:true,
                mydata: [],
                show2: true,
            }
        },
        mounted() {
          this.drawLine();
          this.initGdChart()

        },
        watch: {
            //tree过滤要设置监听才可以

        },
        methods: {
          drawLine() {
            //设置省份的数据
            this.mydata = [
              {name: '北京', value: '100'},
              {name: '天津', value: '9'},
              {name: '上海', value: '10'},
              {name: '重庆', value: '200'},
              {name: '河北', value: '30'},
              {name: '河南', value: '32'},
              {name: '云南', value: '7'},
              {name: '辽宁', value: '3'}
            ]
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
              backgroundColor: '#F7F7F7', //设置背景色
              title: {
                text: '中国地图',
                // subtext: '中国地图'
              },
              tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} '
              },
              // 设置地图条
              visualMap: {
                max: 500,
                min: 0,
                text: ['高', '低'],
                realtime: false,
                calculable: true,
                itemHeight: '200',
                inverse: true, // 翻转
                orient: 'vertical',//设置垂直
                inRange: {
                  // color: ['#DDDDDD', '#026FDD']
                  color: ['lightskyblue', 'yellow', 'orangered']
                },

              },
              series: [
                {
                  name: '损失统计',
                  type: 'map',
                  mapType: 'china', // 自定义扩展图表类型
                  itemStyle: {
                    normal: {label: {show: true}},
                    emphasis: {label: {show: true}}
                  },
                  data: this.mydata,
                  // aspectScale: 1,//这个参数用于 scale 地图的长宽比。最终的 aspect 的计算方式是：geoBoundingRect.width / geoBoundingRect.height * aspectScale
                  //设置地图放大缩小
                  zoom: 1, //当前视角的缩放比例NPM
                  roam: true, //是否开启平游或缩放
                  scaleLimit: { //滚轮缩放的极限控制
                    min: 1,
                    max: 10
                  },
                }
              ]
            })
          },
          initGdChart(){
            var dom = document.getElementById("gdChart");
            var myChart = echarts.init(dom);
            myChart.setOption({
              backgroundColor: '#F7F7F7', //设置背景色
              title: {
                text: '广东地图',
                // subtext: '中国地图'
              },
              tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} '
              },
              // 设置地图条
              visualMap: {
                max: 500,
                min: 0,
                text: ['高', '低'],
                realtime: false,
                calculable: true,
                itemHeight: '200',
                inverse: true, // 翻转
                orient: 'vertical',//设置垂直
                inRange: {
                  // color: ['#DDDDDD', '#026FDD']
                  color: ['lightskyblue', 'yellow', 'orangered']
                },

              },
              series: [
                {
                  name: '损失统计',
                  type: 'map',
                  mapType: '广东', // 自定义扩展图表类型
                  map: '广东',
                  itemStyle: {
                    normal: {label: {show: true}},
                    emphasis: {label: {show: true}}
                  },
                  data: this.mydata,
                  // aspectScale: 1,//这个参数用于 scale 地图的长宽比。最终的 aspect 的计算方式是：geoBoundingRect.width / geoBoundingRect.height * aspectScale
                  //设置地图放大缩小
                  zoom: 1, //当前视角的缩放比例NPM
                  roam: true, //是否开启平游或缩放
                  scaleLimit: { //滚轮缩放的极限控制
                    min: 1,
                    max: 10
                  },
                }
              ]
            });
            echarts.registerMap('广东',gdJion);
            // echarts.registerMap('广东',true); //跟上面一样
          }
        },
    }
</script>

