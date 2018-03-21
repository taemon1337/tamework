import http from './http'

var parseData = function (resp) {
  return resp.data
}

var userApi = {
  all: function (opts) {
    return http.get('/rbac/v1/users', opts).then(parseData)
  }
}

export default userApi
