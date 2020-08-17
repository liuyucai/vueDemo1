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
          path: '/home/first',
          name: 'first',
          component: () => import('@/view/first')
        },{
          path: '/home/second',
          name: 'second',
          component: () => import('@/view/second')
        }
      ]
    }
    // ,{
    //   path: '/first',
    //   name: 'first',
    //   component: First
    // },{
    //   path: '/second',
    //   name: 'second',
    //   component: Second
    // }
  ]
})
