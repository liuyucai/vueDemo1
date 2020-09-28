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
    <div class="view-container">
      <div id="myChart" style="width: 500px;height: 500px"></div>
    </div>
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
  .view-container{
    padding: 24px;
    background-color: white;
  }
</style>
<script>
    export default {
        name: 'first',
        data () {
            return {
                msg: '主页',
                isCollapse: true,
                queryContainerState:true,
                mydata: [],
            }
        },
        mounted() {
          this.drawLine()

        },
        watch: {
            //tree过滤要设置监听才可以

        },
        methods: {
          drawLine() {
            this.mydata = [
              {name: '北京', value: '100'}, {name: '天津', value: this.$options.methods.randomData()},
              {name: '上海', value: this.$options.methods.randomData()}, {name: '重庆', value: this.$options.methods.randomData()},
              {name: '河北', value: this.$options.methods.randomData()}, {name: '河南', value: this.$options.methods.randomData()},
              {name: '云南', value: this.$options.methods.randomData()}, {name: '辽宁', value: this.$options.methods.randomData()}
            ]
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
              backgroundColor: '#F7F7F7', //设置背景色
              title: {
                text: '中国地图',
                subtext: '中国地图'
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
                  //设置地图放大缩小
                  zoom: 1, //当前视角的缩放比例
                  roam: true, //是否开启平游或缩放
                  scaleLimit: { //滚轮缩放的极限控制
                    min: 1,
                    max: 10
                  },
                }
              ]
            })
          },
          randomData() {
            return Math.round(Math.random() * 500);
          }
        },
    }
</script>

