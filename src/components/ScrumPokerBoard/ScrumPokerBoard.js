import Card from 'components/ScrumCard/ScrumCard.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "ScrumPokerBoard",

  /**
   *
   * @returns {{data: null, players: Array}}
   */
  data () {
    return {
      data: null,
      showPoints: false,
      noEstimationPossible: false,
      players: []
    }
  },
  watch: {
    allCardsAreTurned(val) {
      if (val && this.points != null) {
        setTimeout(() => {
          this.showPoints = true
        }, 1500)
      } else {
        this.showPoints = false
      }

      if(val && this.points == null) {
        setTimeout(() => {
          this.noEstimationPossible = true
        }, 1500)
      } else {
        this.noEstimationPossible = false
      }


    }
  },
  /**
   * Computed properties
   */
  computed: {
    allCardsAreTurned () {
      return this.players.length && this.players.every((player) => {
          return (player && player.rotate) ? player.rotate : false
        })
    },

    points () {
      let totalPoints = 0

      if (this.players.some(player => player.value == null)) {
        return null
      }

      this.players.forEach((player) => {
        if (player.value) {
          totalPoints += player.value
        }
      })

      return totalPoints
    },

    averagePoints() {
      return Math.round(this.points / this.players.length)
    },

    hasEstimations () {
      return this.players.length > 0
    },
    ...mapGetters({
      me: 'me',
      needsProfile: 'needsProfile',
      cards: 'cards',
      referenceStories: 'referenceStories'
    }),
  },

  /**
   *
   */
  mounted() {
    this.$socket.on('estimation:added', (data) => {
      if (this.players.some(player => player.name == data.user.name)) {
        this.players = this.players.filter((player) => player.name != data.user.name)
      }
    })

    this.$socket.on('estimation:added', (data) => {
      try {
        if (data.estimation !== null && this.me.team === data.user.team) {

          let $data = {
            name: data.user.name,
            value: data.estimation.value,
            label: data.estimation.label,
            rotate: false
          }

          if (this.players.some(player => player.name == data.user.name)) {
            this.players = this.players.map((player) => {
              if (player.name == data.user.name) {
                return {
                  name: player.name,
                  value: player.value,
                  label: player.label,
                  rotate: false
                }
              }
              else {
                return player
              }
            })

            setTimeout(() => {
              this.players = this.players.map((player) => {
                return (player.name == data.user.name) ? $data : player
              })
            }, 1500)

          }
          else {
            this.players = [...this.players, $data]
          }
        }
      } catch (error) {
        console.error(error)
      }
    })

    this.$socket.on('user:added', (user) => {
      this.players[user.name] = {}
    })

    setTimeout(() => {
      if (this.needsProfile && this.$isPhone) {
        this.openDialog('Profile')
      }
    }, 2500)
  },

  /**
   * Component Methods
   */
  methods: {
    clearBoard () {
      this.players = []
    },
    rotateAll () {
      this.players = this.players.map((player) => {
        return {
          value: player.value,
          name: player.name,
          label: player.label,
          rotate: true
        }
      })
    },

    rotateCard (card) {
      if (this.players.some(player => player && card && player.name == card.name)) {
        this.players = this.players.map((player) => {
          if (player.name == card.name) {
            return {
              value: player.value,
              name: player.name,
              label: player.label,
              rotate: true
            }
          } else {
            return player
          }
        })
      }
    }
  },


  /**
   * Components to use inside this component
   */
  components: {Card}
}