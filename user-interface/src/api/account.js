import http from './http'

var parseData = function (resp) {
  return resp.data
}

var accountApi = {
  profile: function (token) {
    return http.get('/account/profile', { params: { token: token } }).then(parseData)
  },
  save: function (record, opts) {
    return http(Object.assign({}, opts, { method: 'PUT', url: '/account', data: record })).then(parseData)
  }
}

export default accountApi
