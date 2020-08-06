<template>
    <div>
<!--      <div style="float: left;width: 200px">-->
<!--        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
<!--          <el-radio-button :label="false">展开</el-radio-button>-->
<!--          <el-radio-button :label="true">收起</el-radio-button>-->
<!--        </el-radio-group>-->
<!--        <div style="width: 200px;background-color:#545c64">-->
<!--          <el-menu-->
<!--            class="el-menu-vertical-demo"-->
<!--            @open="handleOpen"-->
<!--            @close="handleClose"-->
<!--            :collapse="isCollapse"-->
<!--            background-color="#545c64"-->
<!--            text-color="#fff"-->
<!--            active-text-color="#ffd04b"-->
<!--            collapse-transition="true"-->
<!--            router-->
<!--          >-->
<!--            <sidebar-item :menu="menu"></sidebar-item>-->
<!--          </el-menu>-->
<!--        </div>-->
<!--      </div>-->
      <div style="float: left;background-color: #cccccc;width: 400px;height: 400px">
        <router-view class="avue-view"/>
      </div>
    </div>
</template>

<script>

  export default {
    name: 'index',
    data() {
      return {

      }
    },
    created() {

    },
    destroyed() {

    },
    mounted() {

    }
  }
</script>
