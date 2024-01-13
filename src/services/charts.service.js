import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from '../utils/Consts.js'
// import getData from '../repository/ConnectAPI'

class ChartsService {
  getMetricasPublicContent() {
    return axios.post(API_URL + '/v01/metricas')
  }

  getUserBoard() {
    return axios.get(API_URL + '/test/user', { headers: authHeader() })
  }

  getModeratorBoard() {
    return axios.get(API_URL + '/test/mod', { headers: authHeader() })
  }

  getAdminBoard() {
    return axios.get(API_URL + '/test/admin', { headers: authHeader() })
  }
}

export default new ChartsService()
