import axios from 'axios'
import { API_URL } from '../utils/Consts.js'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export const api = axios.create({
  baseURL: API_URL
})

export const getData = async (url, params = {}) => {
  return await api
    .get(url, params)
    .then((res) => res.data)
    .catch((error) => `Falha na conexão: ${error}`)
}

export const postData = async (url, data = {}, params = {}) => {
  return await api
    .post(url, data, params)
    .then((res) => res.data)
    .catch((error) => `Falha na conexão: ${error}`)
}

export const postFormData = async (url, data = {}, params = {}) => {
  return await api
    .post(url, data, {
      params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => res.data)
    .catch((error) => `Falha na conexão: ${error}`)
}

export const patchData = async (url, data = {}, params = {}) => {
  return await api
    .patch(url, data, params)
    .then((res) => res.data)
    .catch((error) => `Falha na conexão: ${error}`)
}

export const patchFormData = async (url, data = {}, params = {}) => {
  return await api
    .patch(url, data, {
      params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => res.data)
    .catch((error) => `Falha na conexão: ${error}`)
}

export const putData = async (url, data = {}, params = {}) => {
  return await api
    .put(url, data, params)
    .then((res) => res.data)
    .catch((error) => `Falha na conexão: ${error}`)
}

export const deleteData = async (url, params = {}) => {
  return await api
    .delete(url, params)
    .then((res) => res.data)
    .catch((error) => `Falha na conexão: ${error}`)
}
