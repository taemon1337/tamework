import http from './http'

var parseData = function (resp) {
  return resp.data
}

var accountApi = {
  profile: function (token) {
    let hdrs = {}
    if (token) { hdrs['Authorization'] = 'Bearer ' + token }
    return http.get('/auth/v1/account/profile', { headers: hdrs }).then(parseData)
  },
  save: function (record, opts) {
    return http(Object.assign({}, opts, { method: 'PUT', url: '/auth/v1/account', data: record })).then(parseData)
  },
  signInWith: function (provider) {
    window.location = '/api/auth/v1/' + provider
  }
}

export default accountApi
