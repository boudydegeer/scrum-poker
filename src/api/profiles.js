/**
 * Mocking client-server processing
 */
let profile = {
  name: null,
  team: null
}

const storage = window.localStorage

export default {
  get (cb) {
    if (storage) {
      profile = JSON.parse(storage.getItem('profile'))
    }
    setTimeout(() => cb(profile), 100)
  },
  post (profile, cb) {
    if (storage) {
      storage.setItem('profile', JSON.stringify(profile))
    }
    setTimeout(() => cb(profile), 100)
  }
}
