<template>
  <div class="view-body">
<!--    <h1>first</h1>-->
    <div class="view-container">
      <div class="view-main">
        <div class="query-container">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu-item,.el-submenu__title{
    /*text-align: left;*/
  }
  .view-body{
    margin: 10px;
    background: white;
    border-radius: 4px;
    overflow: hidden;
  }
  .view-container{
    padding: 24px;
  }
  .view-main{
    border-bottom: 1px solid #f0f2f5;
  }
</style>

<script>
export default {
  name: 'first',
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
      ],
      formInline: {
        user: '',
        region: ''
      },
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      onSubmit() {
          console.log('submit!');
      }
  }
}
</script>

