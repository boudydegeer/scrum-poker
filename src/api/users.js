/**
 * Mocking client-server processing
 */
const _defaultUser = {
  name: ''
}

export default {
  getMe (cb) {
    setTimeout(() => cb(_defaultUser), 100)
  }
}
