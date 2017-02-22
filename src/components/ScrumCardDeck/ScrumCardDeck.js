import Card from 'components/ScrumCard/ScrumCard.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
  /**
   * Component name
   */
  name: "ScrumCardDeck",

  /**
   * Data Model of the component
   * @returns {{preselected: null, selected: null, swipe: string}}
   */
  data () {
    return {
      preselected: null,
      selected: null,
      swipe: 'left'
    }
  },

  /**
   * Public properties that the component accepts
   */
  props: {
    cards: {
      type: Array,
      default: () => []
    }
  },

  /**
   * Computed properties
   */
  computed: {
    referenceStoriesForPreselected () {
      let stories = []

      if (this.preselected != null && this.preselected.value != null) {
        return this.referenceStories.filter((referenceStory) => {
          return this.preselected.value == referenceStory.value
        })[0].stories

      }
      return stories
    },
    ...mapGetters({
      me: 'me',
      referenceStories: 'referenceStories',
      needsProfile: 'needsProfile',
    })
  },

  /**
   * Mounted hook for the component
   */
  mounted (){
    this.$store.dispatch('getCards')
    this.$store.dispatch('getReferenceStories', this.me.team)

    if (!this.needsProfile) {
      this.$socket.emit('presence:user', this.me)
    }

  },

  /**
   * Properties to be watched
   */
  watch: {
    selected(val, oldVal) {
      if (val !== oldVal) {
        let user = this.me
        let estimation = val
        this.$socket.emit('estimation:choosen', {
          estimation: estimation,
          user: user
        })
      }
    },

    needsProfile(val, oldVal)
    {
      if (val === false) {
        this.$socket.emit('presence:user', this.me)
        this.$store.dispatch('getReferenceStories', this.me.team)
      }
    }
  },

  methods: {
    /**
     * Unselects the selected card
     * @param type
     */
    unselect(type)
    {
      if (type) {
        this.swipe = type
        setTimeout(() => {
          this.selected = null
        }, 100)
      }
    },

    saveProfile() {
      this.storeProfile(this.profileForm)
    },

    /**
     * Takes the card and put it as selected.
     * @param card
     */
    select(card)
    {
      setTimeout(() => {
        this.selected = {
          value: card.value,
          label: card.label
        }
      }, 300)
    },

    /**
     * Preselect a card to hire it up.
     * @param card
     */
    preselectCard(card){

      if (this.selected != null && this.selected.value != null
      && card.value == this.selected.value) {
        if (this.preselected &&
          this.preselected.label === card.label
        ) {
          this.preselected = null
        } else
        {
          this.preselected = card
        }
        return
      }

      if (card == 'none') {
        this.preselected = null
        return
      }

      if (this.preselected &&
        this.preselected.label === card.label
      ) {
        this.unselect('down')
        this.select(card)
        this.preselected = null
      }
      else {
        this.preselected = card
      }
    },

    /**
     *
     * @param currentPage
     */
    onSlideChangeStart (currentPage) {
      console.log('onSlideChangeStart', currentPage);
    },

    onPanStart(e) {
      console.log(e)
    },

    /**
     *
     * @param currentPage
     */
    onSlideChangeEnd (currentPage) {
      console.log('onSlideChangeEnd', currentPage);
    },

    /**
     * Actions on the Store
     */
    ...mapActions([
      'storeProfile'
    ])
  },
  /**
   * Components inside this component
   */
  components: {
    Card

  }
}