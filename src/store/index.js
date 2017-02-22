import Vue from 'vue'
import Vuex from 'vuex'

import settings from 'store/modules/settings'
import users from 'store/modules/users'
import profile from 'store/modules/profile'
import createLogger from 'plugins/Logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    users,
    profile,
    settings
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
