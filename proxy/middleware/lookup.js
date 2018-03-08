let services = {} // name => { path: '', host: '', port: '', scheme: '' }
let RouteMap = require('/common/lib/RouteMap')

let lookup = function (defaultTarget) {
  let routemap = new RouteMap(defaultTarget)
  routemap.addRoutesFromEnv(process.env)

  return function (req) {
    if (req.target) {
      console.log('[LOOKUP] ' + req.originalUrl + ' -> ' + req.target)
      return req.target
    } else {
      let target = routemap.lookup(req.originalUrl)
      console.log('[LOOKUP] ' + req.originalUrl + ' -> ' + target)
      return target
    }
  }
}

module.exports = lookup