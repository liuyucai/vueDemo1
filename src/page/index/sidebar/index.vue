<template>
  <div style="height: 100%">
    <!--    <el-button @click="setCollapse()" style="width: 40px">收起</el-button>-->
    <div style="background-color:#545c64;height: 100%">
      <div style="height: 60px;" class="logo-box">
        <a href="#">
          <img src="@/images/app_img.jpg">
          <h1 v-bind:class="displayStatus">vueDemo</h1>
        </a>
      </div>
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="menuSelect"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="activeIndex"
        router
      >
        <sidebar-item :menu="menu" @selectItemParentMethod="selectItem"></sidebar-item>
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
  .logo-box a{
    display: block;
  }
  .logo-box a img{
    display: inline-block;
    width: 40px;
    height: 40px;
    vertical-align: middle;
  }
  .logo-box a h1.toDisplay{
    display: inline-block;
    margin: 0 0 0 12px;
    color: #fff;
    font-weight: 600;
    font-size: 20px;
    vertical-align: middle;
    animation: fade-in;
    animation-duration: .3s;
  }
  .noDisplay{
    display: none;
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
        activeIndex:"0",
        // toDisplay:toDisplay,
        displayStatus: {
          toDisplay: true,
          noDisplay: false
        },
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
                    path:"/home/first",
                  },
                  {
                    menuName:"小米手机",
                    id:10,
                    isParent:false,
                    path:"/home/second",
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
      menuSelect(index,indexpath){
          console.log("......"+index);
          console.log("......"+indexpath);
        this.$emit("parentMethod");
      },
      setCollapse() {
        if(this.isCollapse){
          this.displayStatus.noDisplay=false;
          this.displayStatus.toDisplay=true;
          this.isCollapse = false;
        }else{

          this.displayStatus.noDisplay=true;
          this.displayStatus.toDisplay=false;
          this.isCollapse = true;
        }
      },
      selectItem(item){
        console.log("点击菜单");
        console.log(item);
        this.$emit("openMenu",item);
      }
    },
    watch:{
      $route(){
        this.activeIndex = this.$route.path;
      }
    }
  }
</script>
