// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Buefy from 'buefy'

Vue.use(Buefy, { defaultIconPack: 'fa', defaultContainerElement: '#app' })
Vue.config.productionTip = false
window.store = store // TODO: remove for prod

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
