import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import global from './modules/globals'
import account from './modules/accounts'
import applets from './modules/applets'
import groups from './modules/groups'
import users from './modules/users'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    global,
    account,
    applets,
    users,
    groups
  },
  strict: debug
})
