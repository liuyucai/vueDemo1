<template>
  <div style="height: 100%;width: 100%;background-color: aliceblue">
<!--    <el-button @click="setCollapse()" style="width: 40px">收起</el-button>-->
    <div class="top-left">
      <i v-bind:class="{'el-icon-s-fold':foldActive,'el-icon-s-unfold':unfoldActive}" @click="setCollapse()"></i>
    </div>
    <div class="top-right">
      <img src="">
      <div>

      </div>
    </div>
  </div>
</template>
<style>
  .top-left{
    float: left;
    height: 100%;
    width: 60px
  }
  .top-right{
    float: right;
    height: 100%;
    width: 200px;
  }
  .top-left i{
    text-align: center;
    line-height: 60px;
    font-size: 40px;
    cursor: pointer;
  }
</style>
<script>
  export default {
    name: 'top',
    data() {
      return {
        foldActive: true,
        unfoldActive:false,
      }
    },
    mounted() {
    },
    methods: {
      setCollapse() {
        if(this.foldActive){
          this.foldActive = false,
          this.unfoldActive = true
        }else{
          this.foldActive = true,
          this.unfoldActive = false
        }
        this.$emit("parentMethod");
      }
    },
  }
</script>
