import http from './http'

var parseData = function (resp) {
  return resp.data
}

var appletApi = {
  all: function (opts) {
    return http.get('/registry/v1/applets', opts).then(parseData)
  }
}

export default appletApi
