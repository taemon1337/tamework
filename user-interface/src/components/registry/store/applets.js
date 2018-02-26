import { AppletTypes } from '@/store/mutation-types'
import Api from '@/registry/api'

const state = {
  all: []
}

// getters
const getters = {
  [AppletTypes.all]: state => state.all
}

// actions
const actions = {
  [AppletTypes.all] ({ commit }, opts) {
    Api.applet.all(opts)
      .then(function (docs) {
        commit(AppletTypes.all, docs)
      })
      .catch(function (err) {
        console.warn('[ERROR] Problem fetching applets: ', err)
      })
  }
}

// mutations must be synchronous
const mutations = {
  [AppletTypes.all] (state, docs) {
    state.all = docs
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
