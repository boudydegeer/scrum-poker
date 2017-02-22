import axios from 'axios'
import config from '../../config/index'

let url = process.env.NODE_ENV === 'production' ? config.build.env.API_HOST : config.dev.env.API_HOST
let port = process.env.NODE_ENV === 'production' ? config.build.env.API_PORT : config.dev.env.API_PORT

export default {
  getTeams () {
    return axios.get(`http://${url}:${port}/teams`)
  }
}
