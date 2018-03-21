import { UserTypes } from '@/store/mutation-types'
import api from '@/api'

const state = {
  all: []
}

// getters
const getters = {
  [UserTypes.all]: state => state.all
}

// actions
const actions = {
  [UserTypes.all] ({ commit }, opts) {
    api.users.all(opts).then(records => {
      commit(UserTypes.all, records)
    })
  }
}

// mutations must be synchronous
const mutations = {
  [UserTypes.all] (state, records) {
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
