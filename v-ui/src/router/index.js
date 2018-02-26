import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import { AccountTypes } from '@/store/mutation-types'
import store from '@/store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: HomePage
    },
    {
      name: 'set-token',
      path: '/set-token/:token',
      beforeEnter: function (to, from, next) {
        store.dispatch(AccountTypes.signIn, to.params.token)
        next('/')
      }
    }
  ]
})
