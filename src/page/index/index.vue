<template>
    <el-container :style="{height:fullHeight+'px'}">
      <el-aside width="auto"
                @mouseenter.native="collapseOpen"
                @mouseleave.native="collapseClose">
        <!-- 左侧导航栏 -->
        <sidebar ref="vchild"></sidebar>
      </el-aside>
      <el-container>
        <el-header>
          <top @parentMethod="setCollapse"></top>
        </el-header>
        <el-main>
          <tab></tab>
          <keep-alive>
            <router-view class="avue-view"/>
          </keep-alive>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
</template>
<style>
  .el-main{
    background: #cccccc;
    padding: 0;
  }
</style>

<script>
  import top from "@/page/index/top/index";
  import sidebar from "@/page/index/sidebar/index";
  import tab from "@/page/index/tab/index";
  export default {
    name: 'sidebarContent',
    components: {
      top,
      sidebar,
      tab,
    },
    data() {
      return {
        fullHeight:document.documentElement.clientHeight
      }
    },
    mounted() {
    },
    methods: {
      setCollapse() {
         this.$refs.vchild.setCollapse();
      },
      collapseOpen(){

      },
        collapseClose(){

      },
    }
  }
</script>
