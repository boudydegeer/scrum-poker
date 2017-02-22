export default {
  name: "ScrumCard",
  data(){
    return {
      locked: false,
      currentShown: '',
      rotation: (Math.floor(Math.random() * 301) - 50) / 50
    }
  },

  props: {
    lockIt: null,
    speed: {
      type: Number,
      default: 0.00
    },
    rotate: {
      type: Boolean,
      default: false
    },
    value: {
      default: 0
    },
    label: {
      type: String,
      default: ''
    }
  },
  watch:{
    rotate(value){
      if (value != null) {
        setTimeout(()=>{
          this.flipCard()
        }, this.speed * 100)
      }
    }
  },
  computed: {
    rotationStyle(){
      return `transform: rotate(${this.rotation}deg)`
    },
    actualFrontFaceClass() {
      return 'Face__front--' + this.label
    },
    classes() {
      const $classes = {
        frontFace: {
          'Face--flip-in': this.isShowingFront,
          'Face--flip-out': this.isShowingBack
        },
        backFace: {
          'Face--flip-in': this.isShowingBack,
          'Face--flip-out': this.isShowingFront
        },
        umbra: {
          'Face--change-umbra': this.isLocked,
        },
        penumbra: {
          'Face--change-penumbra': this.isLocked,
        }
      }

      $classes.frontFace[this.actualFrontFaceClass] = true

      return $classes
    },
    isShowingFront(){
      return this.currentShown === 'front'
    },
    isShowingBack(){
      return this.currentShown === 'back'
    },
    isLocked(){
      return this.lockIt ? this.lockIt : this.locked
    }
  },

  mounted(){
    if(this.rotate)
    {
      setTimeout(() => {
        this.flipCard()
      }, this.speed * 100)
    }
  },

  methods: {
    lock(){
      this.locked = true
    },
    unlock() {
      setTimeout(() => {
        this.locked = false
      }, 1200)
    },

    flipCard(e){
      if(!this.isLocked)
      {
        this.lock()
        this.currentShown = this.currentShown == 'back' ? 'front' : 'back'
        this.unlock()
      }
    },

    select(){
      this.$emit('click', this)
    },
    onSwipeUp(){
      this.$emit('swipeup', this)
    },
    onSwipeRight(){
      this.$emit('swiperight', this)
    },
    onSwipeDown(){
      this.$emit('swipedown', this)
    },
    onSwipeLeft(){
      this.$emit('swipeleft', this)
    }
  }
}