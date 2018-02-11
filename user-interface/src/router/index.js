import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import SignInPage from '@/pages/SignInPage'

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
    }
  ]
})
