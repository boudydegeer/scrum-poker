import Deck from 'components/ScrumCardDeck/ScrumCardDeck.vue'
import Board from 'components/ScrumPokerBoard/ScrumPokerBoard.vue'

import {mapGetters, mapActions} from 'vuex'

export default {

  /**
   * Component Name
   */
  name: 'App',

  /**
   * Component data
   */
  data () {
    return {
      error: null,
      profileForm: {
        name: '',
        team: ''
      },
    }
  },

  /**
   * Mounted
   */
  mounted(){

  },

  /**
   * Computed properties
   */
  computed: {
    ...mapGetters({
      me: 'me',
      teams: 'teams',
      needsProfile: 'needsProfile',
      cards: 'cards'
    })
  },

  /**
   * Properties to watch
   */
  watch: {
    me(val) {
      if(val && val.name && val.team) {
        this.profileForm = {
          name: val.name,
          team: val.team
        }
      } else {
        this.openDialog('Profile')
      }

    }
  },

  /**
   * Component Methods
   */
  methods: {
    rotateAll () {
      this.rotate = true
    },
    saveProfile() {
      if(this.$isDesk){
        this.profileForm.name = 'Team'
      }

      if(
        this.profileForm.name != ''
        && this.profileForm.team != ''
      )
      {
        this.error = null
        this.storeProfile(this.profileForm)
        this.getReferenceStories(this.profileForm.team)

        setTimeout(() => {
          this.closeDialog('Profile')
        }, 250)
      } else {
        this.error = "This field is required"
      }

    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      if (ref == 'Profile' && this.needsProfile) {
        this.error = "This field is required"
        return
      }
      this.$refs[ref].close();
    },
    ...mapActions([
      'storeProfile',
      'getReferenceStories'
    ])

  },

  /**
   * Components to use inside this component
   */
  components: {Board, Deck}
}
