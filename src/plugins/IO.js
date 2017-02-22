import io from 'socket.io-client'

export default {
  install: (Vue, options) => {
    Vue.prototype.$socket = io(
      process.env.SOCKET_HOST + ':' + process.env.SOCKET_PORT
    )
    // Vue.prototype.$socket = io('http://localhost:3069')
  }
}
