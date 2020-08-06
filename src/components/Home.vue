<template>
  <index></index>
<!--  <div>-->
<!--    <div style="float: left;width: 200px">-->
<!--      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
<!--        <el-radio-button :label="false">展开</el-radio-button>-->
<!--        <el-radio-button :label="true">收起</el-radio-button>-->
<!--      </el-radio-group>-->
<!--      <div style="width: 200px;background-color:#545c64">-->
<!--        <el-menu-->
<!--          class="el-menu-vertical-demo"-->
<!--          @open="handleOpen"-->
<!--          @close="handleClose"-->
<!--          :collapse="isCollapse"-->
<!--          background-color="#545c64"-->
<!--          text-color="#fff"-->
<!--          active-text-color="#ffd04b"-->
<!--          collapse-transition="true"-->
<!--          router-->
<!--        >-->
<!--          <sidebar-item :menu="menu"></sidebar-item>-->
<!--        </el-menu>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div style="float: left;background-color: #cccccc;width: 400px;height: 400px">-->
<!--      <router-view class="avue-view"/>-->
<!--    </div>-->
<!--  </div>-->
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
  import index from "../page/index/index";
  // import sidebarItem from "../page/sidebar/sidebarItem";
export default {
  name: 'Home',
  components: {index},
  // components: {sidebarItem},
  data () {
    return {
      msg: '主页',
      isCollapse: true,
      menu:[
        {
          menuName:"设备管理",
          id:1,
          isParent:true,
          child:[
            {
              menuName:"手机设备",
              id:2,
              isParent:true,
              child:[
                {
                  menuName:"苹果手机",
                  id:9,
                  isParent:false,
                  path:"/first",
                },
                {
                  menuName:"小米手机",
                  id:10,
                  isParent:false,
                  path:"/second",
                }
              ]
            },
            {
              menuName:"电脑设备",
              id:3,
              isParent:true,
              child:[
                {
                  menuName:"联想笔记本",
                  id:5,
                  isParent:false,
                  path:"/first",
                },
                {
                  menuName:"苹果笔记本",
                  id:6,
                  isParent:false,
                  path:"/second",
                }
              ]
            }
          ]
        },
        {
          menuName:"床位管理",
          id:4,
          isParent:true,
          child:[
            {
              menuName:"大床",
              id:11,
              isParent:false,
              path:"/home/first",
            },
            {
              menuName:"小床",
              id:12,
              isParent:false,
              path:"/home/first",
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

