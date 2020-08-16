<template>
  <div class="top-nav">
    <div class="top-left">
      <i v-bind:class="{'el-icon-s-fold':foldActive,'el-icon-s-unfold':unfoldActive}" @click="setCollapse()"></i>
    </div>
    <div class="top-right">
      <div>
        <el-color-picker v-model="color1"></el-color-picker>
      </div>
      <div>
        <i class="el-icon-view"></i>
      </div>
      <div>
        <img src="@/images/app_img.jpg">
        <el-dropdown>
          <span class="el-dropdown-link">
            刘宇才<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>首页</el-dropdown-item>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<style>
  .top-nav{
    height: 100%;
    background-color: aliceblue;
    padding: 0 20px;
  }
  .top-left{
    float: left;
    height: 100%;
  }
  .top-right{
    float: right;
    height: 100%;
  }
  .top-left i{
    text-align: center;
    line-height: 60px;
    font-size: 40px;
    cursor: pointer;
  }
  .top-right>div{
    /*display: inline-block;*/
    float: left;
    vertical-align: middle;
    line-height: 30px;
    padding: 15px 10px;
    cursor: pointer;
  }
  /*修改颜色选择器的大小*/
  .el-color-picker{
    height: 30px;
    display: block;
  }
  .el-color-picker__trigger{
    height: 30px;
    width: 30px;
  }

  .el-dropdown{
    outline: none;
    display: block;
    float: left;
    margin-left: 5px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #606266;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .top-right>div img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: block;
    float: left;
  }

</style>
<script>
  export default {
    name: 'top',
    data() {
      return {
        foldActive: true,
        unfoldActive:false,
        color1: '#409EFF',
      }
    },
    mounted() {
    },
    methods: {
      setCollapse() {
        if(this.foldActive){
          this.foldActive = false,
          this.unfoldActive = true
        }else{
          this.foldActive = true,
          this.unfoldActive = false
        }
        this.$emit("parentMethod");
      }
    },
  }
</script>
