<template>
  <div class="test">
    <h1>{{ msg }}</h1>
    <h2>刘宇才</h2>
    <div style="width: 200px">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
<!--        <div>-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item index="1-1">选项3</el-menu-item>
            <el-menu-item index="1-2">选项1</el-menu-item>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
<!--        </div>-->
      </el-menu>
    </div>


<!--    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
<!--      <el-radio-button :label="false">展开</el-radio-button>-->
<!--      <el-radio-button :label="true">收起</el-radio-button>-->
<!--    </el-radio-group>-->
<!--    <div style="width: 200px;background-color:#545c64">-->
<!--      <el-menu-->
<!--         class="el-menu-vertical-demo"-->
<!--         @open="handleOpen"-->
<!--         @close="handleClose"-->
<!--         :collapse="isCollapse"-->
<!--         background-color="#545c64"-->
<!--         text-color="#fff"-->
<!--         active-text-color="#ffd04b"-->
<!--         collapse-transition="true"-->
<!--      >-->
<!--        <sidebar-item :menu="menu"></sidebar-item>-->
<!--      </el-menu>-->
  </div>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  /*.el-menu-item,.el-submenu__title{*/
  /*  text-align: left;*/
  /*}*/
</style>

<script>
  // import sidebarItem from "../page/index/sidebar/sidebarItem";
export default {
  name: 'Test',
  // components: {sidebarItem},
  data () {
    return {
      msg: '测试Test',
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
              // isParent:false,
              isParent:true,
              child:[
                {
                  menuName:"苹果手机",
                  id:9,
                  isParent:false,
                },
                {
                  menuName:"小米手机",
                  id:10,
                  isParent:false,
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
                },
                {
                  menuName:"苹果笔记本",
                  id:6,
                  isParent:false,
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
            },
            {
              menuName:"小床",
              id:12,
              isParent:false,
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

