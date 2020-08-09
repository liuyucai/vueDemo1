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

    <el-container>
      <el-aside width="200px">
        <!-- 左侧导航栏 -->
        <sidebar></sidebar>
      </el-aside>
      <el-container>
        <el-header>
<!--          <el-button @click="setCollapse()" style="width: 40px">收起</el-button>-->
          <top></top>
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

      }
    },
    methods: {
        setCollapse() {
            if(this.isCollapse){
                this.isCollapse = false;
            }else{
                this.isCollapse = true;
            }
        }
      }
  }
</script>
