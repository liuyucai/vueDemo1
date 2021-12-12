<template>
    <el-container :style="{height:fullHeight+'px'}">
      <el-aside width="auto"
                @mouseenter.native="collapseOpen"
                @mouseleave.native="collapseClose">
        <!-- 左侧导航栏 -->
        <sidebar ref="vchild" @openMenu="openMenu"></sidebar>
      </el-aside>
      <el-container>
        <el-header>
          <top @parentMethod="setCollapse"></top>
        </el-header>
        <el-main>
          <tab ref="childtab"></tab>
          <!-- 主体视图层 -->
<!--          <div class="main-container">-->
          <el-scrollbar style="height:100%;overflow: hidden" class="main-container">
            <keep-alive>
              <router-view class="avue-view"/>
            </keep-alive>
          </el-scrollbar>
<!--          </div>-->
        </el-main>
        <el-footer style="height: 30px">作者：刘宇才  QQ:2395783668@qq.com</el-footer>
      </el-container>
    </el-container>
</template>
<style>
  .el-main{
    background: #f0f2f5;
    padding: 0;
    position: relative;
    padding-top: 40px;
  }
  .el-main .tab-nav{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .main-container>.el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .el-footer{
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    /*box-shadow: 0px -20px 5px #888888;*/
    border-top: 1px solid #f0f2f5;
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
        fullHeight:document.documentElement.clientHeight-1
      }
    },
    methods: {
      setCollapse() {
         this.$refs.vchild.setCollapse();
      },
      openMenu(item){
        console.log("addTabParent");
        this.$refs.childtab.openMenu(item);
      },
      collapseOpen(){

      },
        collapseClose(){

      },
    },
    mounted(){
        let that = this;
        window.onresize = ()=>{
            //设置页面的大小
            that.fullHeight = document.documentElement.clientHeight-1
        }
    },
  }
</script>
