<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
<!--      app页面-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
#app{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
body{
  margin: 0;
  padding: 0;
}
</style>
