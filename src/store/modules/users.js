import users from 'api/users'
import {GET_USERS} from 'store/mutation-types'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  all: state => state.all
}

// actions
const actions = {
  getUsers ({commit}) {
    users.getUsers(users => {
      commit(GET_USERS, {users})
    })
  }
}

// mutations
const mutations = {
  [GET_USERS] (state, {users}) {
    state.all = users
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
