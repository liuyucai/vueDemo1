<template>
  <div class="index-view-body">
    <div class="total-nav">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="total-nav-item">
            <div class="total-nav-item-left fl" style="background-color: #39cccc">
              <i class="el-icon-user-solid"></i>
            </div>
            <div class="total-nav-item-right fl">
              <div class="total-nav-item-right-tip">
                用户数
              </div>
              <div class="total-nav-item-right-text">
                {{totalNavData.userNum}}
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-nav-item">
            <div class="total-nav-item-left fl" style="background-color: green">
              <i class="el-icon-upload"></i>
            </div>
            <div class="total-nav-item-right fl">
              <div class="total-nav-item-right-tip">
                在线数量
              </div>
              <div class="total-nav-item-right-text">
                {{totalNavData.onlineNum}}
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-nav-item">
            <div class="total-nav-item-left fl" style="background-color: #dd4b39">
              <i class="el-icon-mouse"></i>
            </div>
            <div class="total-nav-item-right fl">
              <div class="total-nav-item-right-tip">
                登录次数
              </div>
              <div class="total-nav-item-right-text">
                {{totalNavData.signNum}}
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-nav-item">
            <div class="total-nav-item-left fl" style="background-color: #f39c12">
              <i class="el-icon-s-tools"></i>
            </div>
            <div class="total-nav-item-right fl">
              <div class="total-nav-item-right-tip">
                日志
              </div>
              <div class="total-nav-item-right-text">
                {{totalNavData.logNum}}
              </div>
            </div>
          </div>
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
            <span>月度报告</span>
            <i class="el-icon-minus" style="float: right;cursor: pointer" @click="show2 = !show2"></i>
          </div>
          <transition name="el-zoom-in-top">
            <div class="list-main" v-show="show2">
              <div id="monthlyReport" style="width: 100%;height: 300px;"></div>
            </div>
          </transition>
        </div>

        <div style="margin-top: 20px">
          <div class="list-top-nav">
            <span>统计报告</span>
            <i class="el-icon-minus" style="float: right;cursor: pointer" @click="show2 = !show2"></i>
          </div>
          <transition name="el-zoom-in-top">
            <div class="list-main" v-show="show2">
              <div id="statisticalReport" style="width: 100%;height: 300px;"></div>
            </div>
          </transition>
        </div>
      </el-col>
      <el-col :span="10">
        <div style="margin-top: 20px">
          <div class="list-top-nav">
            <span>工作进度</span>
            <i class="el-icon-minus" style="float: right;cursor: pointer" @click="show2 = !show2"></i>
          </div>
          <transition name="el-zoom-in-top">
            <div class="list-main" v-show="show2">
              <el-row :gutter="10">
                <el-col :span="14">
                  <div class="work-progress-line">
                    <div class="work-progress-line-tip">
                      <span>交易量</span>
                      <span class="fr">
                        <span>120</span>
                        /
                        <span>200</span>
                      </span>
                    </div>
                    <el-progress :percentage="percentage" :text-inside="true" :color="customColor" :stroke-width="12"></el-progress>

                  </div>
                  <div class="work-progress-line">
                    <div class="work-progress-line-tip">
                      <span>交易量</span>
                      <span class="fr">
                        <span>120</span>
                        /
                        <span>200</span>
                      </span>
                    </div>
                    <el-progress :percentage="percentage" :text-inside="true" :color="customColorMethod" :stroke-width="12"></el-progress>
                  </div>
                  <div class="work-progress-line">
                    <div class="work-progress-line-tip">
                      <span>交易量</span>
                      <span class="fr">
                        <span>120</span>
                        /
                        <span>200</span>
                      </span>
                    </div>
                    <el-progress :percentage="percentage" :text-inside="true" :color="customColors" :stroke-width="12"></el-progress>
                  </div>
                  <div class="work-progress-line">
                    <div class="work-progress-line-tip">
                      <span>交易量</span>
                      <span class="fr">
                        <span>120</span>
                        /
                        <span>200</span>
                      </span>
                    </div>
                    <el-progress :percentage="percentage" :text-inside="true" :color="customColors" :stroke-width="12"></el-progress>
                  </div>
                </el-col>
                <el-col :span="10">
                  <div class="work-progress-circle">
                    <div class="work-progress-circle-tip">
                      办理进度
                    </div>
                    <el-progress type="circle" :percentage="25" :width="80"></el-progress>
                  </div>
                  <div class="work-progress-circle">
                    <div class="work-progress-circle-tip">
                      办理进度
                    </div>
                    <el-progress type="circle" :percentage="25" :width="80"></el-progress>
                  </div>
                </el-col>
              </el-row>
            </div>
          </transition>
        </div>

        <div style="margin-top: 20px;background-color: #39cccc">
          <div class="list-top-nav" style="background-color: #39cccc">
            <span>资金报表</span>
            <i class="el-icon-minus" style="float: right;cursor: pointer" @click="show2 = !show2"></i>
          </div>
          <transition name="el-zoom-in-top">
            <div class="list-main" v-show="show2" style="background-color: #39cccc;border-top: 0">
              <div id="capitalReport" style="width: 100%;height: 300px;"></div>
            </div>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .total-nav-item{
    height: 100px;
    background-color: #fff;
    border-radius: 4px;
  }
  .total-nav-item-left{
    width: 100px;
    height: 100%;
    line-height: 120px;
    text-align: center;
  }
  .total-nav-item-left i{
    font-size: 50px;
    color: #fff;
  }
  .total-nav-item-right{
    padding: 10px;
  }
  .total-nav-item-right-tip{
    font-size: 14px;
    line-height: 20px;
  }
  .total-nav-item-right-text{
    font-size: 20px;
    font-weight: 700;
  }
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
  #myChart{
    display:inline-block;
    background: url('../images/map_backGif.gif') no-repeat;
    background-size: 100%;
  }
  #gdChart{
    display:inline-block;
    background: url('../images/map_back2.jpg') no-repeat;
    background-size: 100%;
  }

  .work-progress-line{
    margin: 20px 0;
  }
  .work-progress-line-tip{
    height: 14px;
    line-height: 14px;
    font-size: 12px;
    font-weight: 700;
  }
  .el-progress-bar__outer,.el-progress-bar__inner{
    line-height: 12px;
  }
  .fl{
    float:left
  }
  .fr{
    float: right;
  }
  .work-progress-circle{
    margin: 10px 0;
    text-align: center;
  }
  .work-progress-circle-tip{
    font-size: 14px;
    font-weight: 700;
    padding-bottom: 5px;
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
                onlineNum:18,
                totalNavData:{
                  userNum:128,
                  onlineNum:16,
                  signNum:356,
                  logNum:1429
                },
                mydata: [],
                show2: true,

                percentage: 20,
                customColor: '#409eff',
                customColors: [
                  {color: '#f56c6c', percentage: 20},
                  {color: '#e6a23c', percentage: 40},
                  {color: '#5cb87a', percentage: 60},
                  {color: '#1989fa', percentage: 80},
                  {color: '#6f7ad3', percentage: 100}
                ]
            }
        },
        mounted() {
          this.drawLine();
          this.initGdChart(),
          this.initMonthlyReport(),
          this.initStatisticalReport(),
          this.initCapitalReport()

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

              // backgroundColor: '#F7F7F7', //设置背景色
              backgroundColor:'',
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
                    normal: {
                      label: {show: true},
                      // areaColor:'#ccc' //省份区域颜色
                    },
                    emphasis: {
                      label: {show: true},
                      // areaColor:'#fff'  //选中时区域颜色
                    },

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
              // backgroundColor: '#F7F7F7', //设置背景色
              backgroundColor:'',
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
          },
          initMonthlyReport(){
            var dom = document.getElementById("monthlyReport");
            var myChart = echarts.init(dom);
            var app = {};

            app.config = {
              rotate: 90,
              align: 'left',
              verticalAlign: 'middle',
              position: 'insideBottom',
              distance: 15,
              onChange: function () {
                var labelOption = {
                  normal: {
                    rotate: app.config.rotate,
                    align: app.config.align,
                    verticalAlign: app.config.verticalAlign,
                    position: app.config.position,
                    distance: app.config.distance
                  }
                };
                myChart.setOption({
                  series: [{
                    label: labelOption
                  }, {
                    label: labelOption
                  }, {
                    label: labelOption
                  }, {
                    label: labelOption
                  }]
                });
              }
            };

            var labelOption = {
              show: false,
              position: app.config.position,
              distance: app.config.distance,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              rotate: app.config.rotate,
              formatter: '{c}  {name|{a}}',
              fontSize: 16,
              rich: {
                name: {
                  textBorderColor: '#fff'
                }
              }
            };

            var option = {
              color: ['#006699', '#4cabce','#e5323e'],
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: ['播放次数', '播放时长','播放数量']
              },
              toolbox: {
                show: true,
                orient: 'vertical',
                right:'20',
                top: 'center',
                feature: {
                  mark: {show: true},
                  dataView: {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                  restore: {show: true},
                  saveAsImage: {show: true}
                },
                textStyle: {
                  fontSize: 10,
                },
              },
              // 设置容器位置
              grid: {
                bottom: '10%',
              },
              xAxis: [
                {
                  type: 'category',
                  axisTick: {show: false},
                  data: ['图片', '视频', '声音', '其他']
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '播放次数',
                  type: 'bar',
                  barGap: 0,
                  label: labelOption,
                  data: [3, 2, 1, 18]
                },{
                  name: '播放时长',
                  type: 'bar',
                  label: labelOption,
                  data: [20, 12, 11, 9]
                },{
                  name: '播放数量',
                  type: 'bar',
                  label: labelOption,
                  data: [10, 6, 20, 4]
                }
              ]
            };
            myChart.setOption(option, true);
          },
          initStatisticalReport(){
            var dom = document.getElementById("statisticalReport");
            var myChart = echarts.init(dom);
            var option = {
                  tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                  },
                  toolbox: {
                    show: true,
                    feature: {
                      mark: {show: true},
                      dataView: {show: true, readOnly: false},
                      magicType: {
                        show: true,
                        type: ['pie', 'funnel']
                      },
                      restore: {show: true},
                      saveAsImage: {show: true}
                    }
                  },
                  series: [
                    {
                      name: '面积模式',
                      type: 'pie',
                      radius: [30, 110],
                      roseType: 'area',
                      data: [
                        {value: 10, name: '出货量'},
                        {value: 20, name: '进货量'},
                        {value: 35, name: '库存量'},
                        {value: 30, name: '成交量'},
                        {value: 40, name: '退货量'}
                      ]
                    }
                  ]
                };
            myChart.setOption(option,true);
          },
          initCapitalReport(){
            var dom = document.getElementById("capitalReport");
            var myChart = echarts.init(dom);
            var option = {
              backgroundColor: '#39cccc',
              tooltip: {
                trigger: 'axis'
              },
              grid: {
                left: '3%',
                right: '4%',
                top:'4%',
                bottom:'4%',
                containLabel: true
              },
              // toolbox: {
              //   feature: {
              //     saveAsImage: {}
              //   }
              // },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                color:'#fff',
                axisLine:{ //设置坐标轴样式
                  lineStyle:{
                    color:'#fff',
                    width:1,//这里是为了突出显示加上的
                  }
                }
                // show: false//隐藏x轴
              },
              yAxis: {
                type: 'value',
                axisLine:{
                  show:false,
                  lineStyle:{
                    color:'#fff',
                    width:-1,//这里是为了突出显示加上的
                    opacity:0
                  }
                }
              },
              series: [
                {
                  name: '邮件营销',
                  type: 'line',
                  stack: '总量',
                  itemStyle:{  //设置线条的拐点
                    color:'#fff',
                    borderColor:'#fff',
                    borderWidth:2,

                  },
                  lineStyle:{ //修改线条颜色
                    color:'#fff'
                  },
                  data: [120, 132, 101, 134, 90, 230, 210]
                }
              ]
            };
            myChart.setOption(option,true);
          },

          customColorMethod(percentage) {
            if (percentage < 30) {
              return '#909399';
            } else if (percentage < 70) {
              return '#e6a23c';
            } else {
              return '#67c23a';
            }
          },
        },
    }
</script>

