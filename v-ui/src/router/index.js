import Vue from 'vue'
import Router from 'vue-router'
import AppPage from '@/pages/AppPage'
import SignInPage from '@/pages/SignInPage'
import { AccountTypes } from '@/store/mutation-types'
import store from '@/store'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'AppPage',
      component: AppPage
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: SignInPage
    },
    {
      path: '/app/:name',
      name: 'app',
      component: AppPage
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

router.beforeEach(function (to, from, next) {
  let user = store.getters[AccountTypes.currentUser]
  console.log('[GUARD] ', to, user)
  if (to.name === 'signin' || to.name === 'set-token') {
    if (user) {
      next('/')
    } else {
      next()
    }
  } else {
    if (user) {
      next()
    } else {
      console.log('You must login.')
      next('/sign-in')
    }
  }
})

export default router
