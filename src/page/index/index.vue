<template>
<!--    <div class="avue-contail">-->
<!--      <div class="avue-left" style="float: left">-->
<!--        &lt;!&ndash; 左侧导航栏 &ndash;&gt;-->
<!--        <sidebar></sidebar>-->
<!--      </div>-->
<!--      <div class="avue-layout" style="height:100%;float: left;width:100px">-->
<!--        <div class="avue-header">-->
<!--          &lt;!&ndash; 顶部导航栏 &ndash;&gt;-->
<!--          <top/>-->
<!--        </div>-->
<!--        <div class="avue-main" style="float: left;background-color: #cccccc;width: 400px;height: 400px">-->
<!--          &lt;!&ndash; 主体视图层 &ndash;&gt;-->
<!--          <el-scrollbar>-->
<!--            <keep-alive>-->
<!--              <router-view class="avue-view"/>-->
<!--            </keep-alive>-->
<!--          </el-scrollbar>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

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
          <keep-alive>
            <router-view class="avue-view"/>
          </keep-alive>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
</template>

<script>
  import top from "@/page/index/top/index";
  import sidebar from "@/page/index/sidebar/index";
  export default {
    name: 'sidebarContent',
    components: {
      top,
      sidebar,
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
        }
      }
  }
</script>
