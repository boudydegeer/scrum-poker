import cards from 'api/cards'
import referenceStories from 'api/referenceStories'
import teams from 'api/teams'
import {GET_TEAMS, GET_CARDS_SETTINGS, GET_REFERENCE_STORIES} from 'store/mutation-types'

// initial state
const state = {
  teams: [],
  cards: [],
  referenceStories: []
}

// getters
const getters = {
  teams: state => state.teams,
  cards: state => state.cards,
  referenceStories: state => state.referenceStories
}

// actions
const actions = {
  getCards ({commit}) {
    cards.getCardsSettings().then(({data}) => {
      commit(GET_CARDS_SETTINGS, {cards: data.data})
    })
  },
  getTeams ({commit}) {
    teams.getTeams().then(({data}) => {
      commit(GET_TEAMS, {teams: data.data})
    })
  },
  getReferenceStories ({commit}, team) {
    if (team) {
      referenceStories.getReferenceStories(team).then(({data}) => {
        commit(GET_REFERENCE_STORIES, {stories: data.data})
      })
    }
  }
}

// mutations
const mutations = {
  [GET_CARDS_SETTINGS] (state, {cards}) {
    state.cards = cards
  },
  [GET_REFERENCE_STORIES] (state, {stories}) {
    state.referenceStories = stories
  },
  [GET_TEAMS] (state, {teams}) {
    state.teams = teams
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
