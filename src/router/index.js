import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/Login'
import Pool from '@/pages/Pool'
import SearchRestaurant from '@/pages/SearchRestaurant'
import ExploreRestaurant from '@/pages/ExploreRestaurant'
import Collection from '@/pages/Collection'

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
      path: '/explore',
      name: 'explore',
      component: ExploreRestaurant
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
    },
    { path: '/collection/:id',
      name: 'collection',
      component: Collection
    }
  ]
})
