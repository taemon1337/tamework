import axios from 'axios'
import { AccountTypes } from '@/store/mutation-types'

let axiosOpts = {
  baseURL: process.env.API || (window.location.origin + '/api'),
  timeout: 5000
}

let token = window.sessionStorage.getItem(AccountTypes.sessionToken)

if (token) {
  axiosOpts.headers = {
    'Authorization': 'Bearer ' + token
  }
}

export default axios.create(axiosOpts)
