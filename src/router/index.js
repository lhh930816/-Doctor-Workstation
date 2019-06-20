import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import CF from '@/components/cf'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      redirect: 'cfs'
    },
    {
      path: '/cfs',
      component: resolve => require(['@/views/cfs.vue'], resolve)
    },
    {
      path: '/tab',
      component: resolve => require(['@/views/tab.vue'], resolve)
    },
    {
      path: '/index',
      component: resolve => require(['@/views/index.vue'], resolve)
    },
    {
      path: '/search',
      component: resolve => require(['@/views/search.vue'], resolve)
    }
  ]
})
