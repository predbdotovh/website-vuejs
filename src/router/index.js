import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import Stats from '@/components/Stats'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
    }
  ]
})
