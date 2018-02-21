import { AccountTypes } from '@/store/mutation-types'
import Api from '@/api'

const state = {
  currentUser: null,
  sessionToken: null
}

// getters
const getters = {
  [AccountTypes.currentUser]: state => state.currentUser,
  [AccountTypes.sessionToken]: state => state.sessionToken,
  [AccountTypes.isSignedIn]: state => !!state.currentUser
}

// actions
const actions = {
  [AccountTypes.signIn] ({ commit }, token) {
    if (token) {
      window.sessionStorage.setItem(AccountTypes.sessionToken, token)
    } else {
      token = window.sessionStorage.getItem(AccountTypes.sessionToken)
    }
    Api.account.profile(token)
      .then(function (profile) {
        console.log('PROFILE: ', profile)
        if (profile) {
          commit(AccountTypes.currentUser, profile)
        }
      })
      .catch(function (err) {
        console.log('[ERROR] Problem fetching user profile: ', err)
      })
  },
  [AccountTypes.signInWith] ({ commit }, provider) {
    Api.account.signInWith(provider)
  },
  [AccountTypes.signOut] ({ commit }) {
    window.sessionStorage.removeItem(AccountTypes.sessionToken)
    commit(AccountTypes.currentUser, null)
  }
}

// mutations must be synchronous
const mutations = {
  [AccountTypes.currentUser] (state, user) {
    state.currentUser = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
