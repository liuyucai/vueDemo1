<template>
<!--    <index></index>-->
  <h>first</h>
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
export default {
  name: 'first',
  // components: {index},
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

