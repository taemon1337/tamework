import http from './http'

var parseData = function (resp) {
  return resp.data
}

var groupApi = {
  all: function (opts) {
    return http.get('/rbac/v1/groups', opts).then(parseData)
  }
}

export default groupApi
