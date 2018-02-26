import http from '@/api/http'

var parseData = function (resp) {
  return resp.data
}

var registryApi = {
  all: function (opts) {
    return http.get('/registry/v1/applets').then(parseData)
  }
}

export default registryApi
