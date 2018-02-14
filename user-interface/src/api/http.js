import axios from 'axios'
import { AccountTypes } from '@/store/mutation-types'

var api = axios.create({
  baseURL: process.env.API || (window.location.origin + '/api'),
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer ' + window.sessionStorage.getItem(AccountTypes.sessionToken)
  }
})

export default api
