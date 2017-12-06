import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/Login'
import Pool from '@/pages/Pool'
import SearchRestaurant from '@/pages/SearchRestaurant'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/pool',
      name: 'pool',
      component: Pool
    },
    {
      path: '/search',
      name: 'search',
      component: SearchRestaurant
    }
  ]
})
