import axios from 'axios'
import { GlobalTypes } from '@/store/mutation-types'

var api = axios.create({
  baseURL: process.env.API || (window.location.origin + '/api'),
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer ' + (window.sessionStorage.getItem(GlobalTypes.sessionToken) || '1234')
  }
})

export default api
