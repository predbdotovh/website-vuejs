import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import Live from '@/components/Live'
import Stats from '@/components/Stats'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
    }, {
      path: '/live',
      name: 'live',
      component: Live
    }, {
      path: '/stats',
      name: 'stats',
      component: Stats
    }
  ]
})
