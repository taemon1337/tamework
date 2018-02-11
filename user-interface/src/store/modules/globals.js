import { GlobalTypes } from '@/store/mutation-types'

const state = {
  showDrawer: false
}

// getters
const getters = {
  [GlobalTypes.showDrawer]: state => state.showDrawer
}

// actions
const actions = {
  [GlobalTypes.showDrawer] ({ commit }, val) {
    commit(GlobalTypes.showDrawer, val)
  }
}

// mutations must be synchronous
const mutations = {
  [GlobalTypes.showDrawer] (state, val) {
    state.showDrawer = !!val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
