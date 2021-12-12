import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import Home from '@/components/Home'

Vue.use(Router)


//解决一个路由不能访问两次的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/test',
      name: 'test',
      component: Test
    },{
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/',
          name: 'index',
          component: () => import('@/view/index')
        }, {
          path: '/home/userManagement',
          name: 'userManagement',
          component: () => import('@/view/userManagement')
        },{
          path: '/home/roleManagement',
          name: 'roleManagement',
          component: () => import('@/view/roleManagement')
        },{
          path: '/home/orgManagement',
          name: 'orgManagement',
          component: () => import('@/view/orgManagement')
        },{
          path: '/home/menuManagement',
          name: 'menuManagement',
          component: () => import('@/view/menuManagement')
        },{
          path: '/home/product',
          name: 'produce',
          component: () => import('@/view/product')
        },{
          path: '/home/device',
          name: 'device',
          component: () => import('@/view/device')
        },{
          path: '/home/model',
          name: 'model',
          component: () => import('@/view/model')
        },{
          path: '/home/programme',
          name: 'model',
          component: () => import('@/view/programme')
        }
      ]
    }
  ]
})
