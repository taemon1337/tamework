import { GroupTypes } from '@/store/mutation-types'
import api from '@/api'

const state = {
  all: []
}

// getters
const getters = {
  [GroupTypes.all]: state => state.all
}

// actions
const actions = {
  [GroupTypes.all] ({ commit }, opts) {
    api.applet.all(opts).then(records => {
      commit(GroupTypes.all, records)
    })
  }
}

// mutations must be synchronous
const mutations = {
  [GroupTypes.all] (state, records) {
    let keys = state.all.map(r => r.name)
    let add = []
    records.forEach(record => {
      if (keys.indexOf(record.name) === -1) {
        add.push(record)
      }
    })
    state.all = state.all.concat(add)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
