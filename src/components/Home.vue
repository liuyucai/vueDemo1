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

