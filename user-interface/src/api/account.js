import http from './http'

var parseData = function (resp) {
  return resp.data
}

var accountApi = {
  profile: function (token) {
    return http.get('/auth/v1/account/profile', { headers: { 'Authorization': 'Bearer ' + token } }).then(parseData)
  },
  save: function (record, opts) {
    return http(Object.assign({}, opts, { method: 'PUT', url: '/auth/v1/account', data: record })).then(parseData)
  }
}

export default accountApi
