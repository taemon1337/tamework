/*
 routemap.map = {
   api: {
     registry: {
       v1: 'https://registry:8080',
       v2: 'https://registry_v2:8080',
       v3: {
         new: 'http://newregistry:8000',
         old: 'http://oldregistry:8000'
       }
     },
     auth: {
       v1: 'http://authserver:8080'
     }
   }
 }
*/
let RouteMap = function (defaultTarget) {
  this.defaultTarget = defaultTarget
  this.map = {}
}

RouteMap.prototype = {
  lookup: function (path) {
    let target = this.defaultTarget
    if (path) {
      let found = false
      let m = this.map
      let parts = path.split('/')
      for (let i = 0; i < parts.length; i++) {
        let key = parts[i].toLowerCase()
        if (found) {
          return target
          // target = target + '/' + key
        } else {
          if (typeof m[key] === 'object') {
            m = m[key]
          } else if (m[key]) {
            target = m[key]
            found = true
          } else {
            target = m
            found = true
          }
        }
      }
    }
    return target
  },
  add: function (path, target) {
    console.log('ADDING ROUTE TO MAP:', path, target)
    let m = this.map
    let parts = path.split('/')
    parts.forEach((key, i) => {
      key = key.toLowerCase()
      if (i === parts.length - 1) {
        m[key] = target // map[api][registry][v1] = target
      } else {
        m[key] = {}
        m = m[key]
      }
    })
  },
  addRoutesFromEnv: function (env) {
    let services = {}
    
    for (let key in process.env) {
      if (key.startsWith('SERVICE_')) {
        let val = process.env[key]
        let parts = key.split('_').map(p => p.toLowerCase())
        if (parts.length === 3) {
          services[parts[1]] = services[parts[1]] || {}
          services[parts[1]][parts[2]] = val
        } else {
          console.warn('Invalid SERVICE environment variable: ', key, 'skipping.')
        }
      }
    }
    
    for (let servicename in services) {
      let s = services[servicename]
      if (s.scheme && s.host && s.port && (s.path || s.pathmap)) {
        if (s.pathmap) { // SERVICE_NAME_PATHMAP=/api/incoming/path:/api/outgoing/path
          let path = s.pathmap.split(':')
          this.add(path[0], s.scheme + '://' + s.host + ':' + s.port)
        } else {
          this.add(s.path, s.scheme + '://' + s.host + ':' + s.port)
        }
      }
    }
    
    console.log('ROUTE MAP: ', JSON.stringify(this.map))
  }
}

module.exports = RouteMap