import { RegistryTypes } from '@/store/mutation-types'

const state = {
  showDrawer: false
}

// getters
const getters = {
  [RegistryTypes.showDrawer]: state => state.showDrawer
}

// actions
const actions = {
  [RegistryTypes.showDrawer] ({ commit }, val) {
    commit(RegistryTypes.showDrawer, val)
  }
}

// mutations must be synchronous
const mutations = {
  [RegistryTypes.showDrawer] (state, val) {
    state.showDrawer = !!val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
