<template>
  <el-button @click="setCollapse()" style="width: 40px">收起</el-button>
</template>

<script>
    import sidebar from '@/page/index/sidebar/index';

  export default {
    name: 'top',
    data() {
      return {

      }
    },
    method: {
        setCollapse() {
            this.$refs.sidebar.setCollapse();
        },
    },
  }
</script>
