<template>
  <div style="height: 100%">
    <!--    <el-button @click="setCollapse()" style="width: 40px">收起</el-button>-->
    <div style="background-color:#545c64;height: 100%">
      <div style="height: 60px;" class="logo-box">
          VueDemo1
      </div>
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <sidebar-item :menu="menu"></sidebar-item>
      </el-menu>
    </div>
  </div>
</template>
<style>
  .logo-box{
    text-align: center;
    line-height: 60px;
    color: #fff;
  }
</style>

<script>
  import sidebarItem from "./sidebarItem";
  export default {
    name: 'sidebar',
    components: {sidebarItem},
    data() {
      return {
        msg: '主页',
        isCollapse: false,
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
                path:"/first",
              },
              {
                menuName:"小床",
                id:12,
                isParent:false,
                path:"/second",
              }
            ]
          }
        ]
      }
    },
    mounted() {
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
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
