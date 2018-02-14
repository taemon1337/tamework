import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import SignInPage from '@/pages/SignInPage'
import store from '@/store'
import { AccountTypes } from '@/store/mutation-types'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: SignInPage
    },
    {
      path: '/set-token/:token',
      beforeEnter: function (to, from, next) {
        store.dispatch(AccountTypes.signIn, to.params.token)
        next('/')
      }
    }
  ]
})
