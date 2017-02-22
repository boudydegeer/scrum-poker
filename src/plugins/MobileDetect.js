import MBDetect from 'mobile-detect'

export default {
  install: (Vue, options) => {
    let mobileDetect = new MBDetect(window.navigator.userAgent)
    Vue.prototype.$md = mobileDetect
    Vue.prototype.$isPhone = mobileDetect.phone()
    Vue.prototype.$isDesk = !mobileDetect.phone()
  }
}
