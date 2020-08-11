<template>
  <mainContent></mainContent>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu-item,.el-submenu__title{
    text-align: left;
  }
  .el-menu{
    /*height: 100%;*/
    /*border-right: solid 1px #e6e6e6;*/
    border-right: 0;
  }
  .el-header{
    padding: 0;
  }
  .el-menu--collapse>.el-menu-item span, .el-menu--collapse>.menu-wrapper>.el-submenu>.el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  .el-menu--collapse>.el-menu-item .el-submenu__icon-arrow, .el-menu--collapse>.menu-wrapper>.el-submenu>.el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
</style>

<script>
  import mainContent from "../page/index/index";
  export default {
    name: 'Home',
    components: {mainContent},
    data() {
      return {
        msg: '主页',
      }
    },
    methods: {
    }
  }
</script>
