import Vue from 'vue'
import Router from 'vue-router'
import Search from './views/Search.vue'
import Live from '@/views/Live.vue'
// import Stats from '@/views/Stats.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
    },
    {
      path: '/live',
      name: 'live',
      component: Live
    },
    {
      path: '/stats',
      name: 'stats',
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Stats.vue')
    }
  ]
})
