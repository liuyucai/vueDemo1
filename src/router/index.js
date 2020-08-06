import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import Home from '@/components/Home'
import First from '@/view/first'
import Second from '@/view/second'

Vue.use(Router)

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
          path: '/first',
          name: 'first',
          component: () => import('@/view/first')
        },{
          path: '/second',
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
