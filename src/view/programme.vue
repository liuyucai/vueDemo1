<template>
  <div class="view-body">
      <el-container style="height:100%" class="view-container">
        <el-aside width="140px" style="height:100%;padding: 10px">
          <div style="height:100%;background: #fff;">

          </div>
        </el-aside>
        <el-container style="height: 100%;padding: 10px;">
          <el-header style="background: #fff">Header</el-header>
          <el-main style="background: #fff;margin-top: 10px">
            <canvas id="myCanvas" width="200" height="100" style="border:1px solid #c3c3c3;">
              您的浏览器不支持 HTML5 canvas 标签。
            </canvas>
          </el-main>
        </el-container>
        <el-aside width="200px" style="height:100%;padding: 10px">
          <div style="height:100%;background: #fff;">

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

</style>
<script>
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
  },
  mounted() {
      let height = document.getElementsByClassName("view-body")[0].clientHeight;

      // document.getElementsByClassName("view-container")[0].style.height = height -20 + 'px';
      console.log('123');
      console.log(height);
  }
}
</script>

