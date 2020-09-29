// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
//引入echarts
// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts';  //必须在main.js引入
//下面这句在地图页面引入
// import 'echarts/map/js/china.js';
import china from 'echarts/map/json/china.json'


//引入创建的VueX
// import store from './store'

Vue.config.productionTip = false

//显示地图下面这句必须引入
Vue.prototype.$echarts = echarts
//以下不引入也行
// echarts.registerMap('china', china)

Vue.use(ElementUI);
Vue.use(VueAxios,axios);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,  //store:store 和router一样，将我们创建的Vuex实例挂载到这个vue实例中
  components: { App },
  template: '<App/>',

})
