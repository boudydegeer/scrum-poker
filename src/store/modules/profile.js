import profiles from 'api/profiles'
import {GET_PROFILE, STORE_PROFILE} from 'store/mutation-types'

// initial state
const state = {
  me: {
    name: null,
    team: null
  },
  needsProfile: true
}

// getters
const getters = {
  me: state => state.me,
  needsProfile: state => state.needsProfile
}

// actions
const actions = {
  getProfile ({commit}) {
    profiles.get(profile => {
      commit(GET_PROFILE, {profile})
    })
  },
  storeProfile ({commit}, profile) {
    profiles.post(profile, profile => {
      commit(STORE_PROFILE, {profile})
    })
  }
}

// mutations
const mutations = {
  [GET_PROFILE] (state, {profile}) {
    state.needsProfile = true
    state.me = profile
    if (profile && profile.name && profile.team) {
      state.needsProfile = false
    }
  },
  [STORE_PROFILE] (state, {profile}) {
    state.me = profile
    state.needsProfile = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
