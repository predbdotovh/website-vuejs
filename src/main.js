import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import Resource from 'vue-resource'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueProgressBar)
Vue.use(Resource)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
