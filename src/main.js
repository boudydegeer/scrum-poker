import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueTouch from 'vue-touch'
import MobileDetect from './plugins/MobileDetect'
import Store from 'store'
import VueIO from './plugins/IO'

Vue.use(VueMaterial)
Vue.use(MobileDetect)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueIO)

// Anywhere
Vue.material.inkRipple = false

VueTouch.config.swipe = {
  threshold: 200
}
VueTouch.config.tap = {
  threshold: 1
}

Vue.filter('uppercase', (value) => value.toUpperCase())

Vue.material.registerTheme({
  default: {
    primary: 'blue',
    accent: 'red',
    warn: 'red',
    background: 'grey'
  },
  app: {
    primary: 'blue',
    accent: 'red',
    warn: 'red',
    background: 'white'
  }
})

/* eslint-disable no-new */
window.app = new Vue({
  name: 'Wrapper',
  el: '#app',
  data: {
    appHeight: {
      'height': '100%',
      'max-height': '100%'
    }
  },
  store: Store,
  methods: {
    calculateAppHeight () {
      let height = this.$md.userAgents() === 'Safari' ? window.innerHeight - 65 : window.innerHeight
      if (this.$isPhone) {
        return {
          'max-height': `${height}px`,
          'height': `${height}px`
        }
      }
      return {
        'height': '100%',
        'max-height': '100%'
      }
    },
    setAppHeight () {
      let body = document.getElementsByTagName('body')
      body[0].style.height = this.appHeight.height
      body[0].style.overflow = 'hidden'
    }

  },
  mounted () {
    this.$store.dispatch('getProfile')
    this.$store.dispatch('getTeams')
    this.setAppHeight()
    window.addEventListener('resize', () => {
      if (window.innerWidth < window.innerHeight) {
        this.setAppHeight()
      }
    })

    if (this.$isPhone) {
      let body = document.getElementsByTagName('body')
      body[0].style.height = this.appHeight.height
      body[0].style.overflow = 'hidden'
    }
  },
  components: {
    App: require('./App/App.vue')
  }
})
