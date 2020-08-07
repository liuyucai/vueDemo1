<template>
    <div class="avue-contail">
      <div class="avue-header">
        <!-- 顶部导航栏 -->
        <top/>
      </div>
      <div class="avue-layout">
        <div class="avue-left" style="float: left">
          <!-- 左侧导航栏 -->
          <sidebar></sidebar>
        </div>
        <div class="avue-main" style="float: left;background-color: #cccccc;width: 400px;height: 400px">
          <!-- 主体视图层 -->
          <el-scrollbar style="height:100%">
            <keep-alive>
              <router-view class="avue-view"/>
            </keep-alive>
          </el-scrollbar>
        </div>
      </div>
    </div>
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

      }
    }
  }
</script>
