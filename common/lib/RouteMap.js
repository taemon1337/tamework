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
let RouteMap = function (def) {
  this.defaultRoute = def
  this.map = {}
}

RouteMap.prototype = {
  lookup: function (path) {
    if (path) {
      let parts = path.split('/')
      let p = parts.shift()
      if (this.map[p] instanceof RouteMap) {
        return this.map[p].lookup(parts.join('/')) || this.defaultRoute
      } else {
        return this.map[p]
      }
    } else {
      return this.defaultRoute
    }
  },
  set: function (path, val) {
    console.log('ROUTE SET: ', path, val)
    if (path) {
      let parts = path.split('/')
      let p = parts.shift()
      if (parts.length > 0) {
        this.map[p] = this.map[p] || new RouteMap()
        this.map[p].set(parts.join('/'), val)
      } else {
        this.map[p] = val
      }
    } else {
      throw new Error('Path is', path)
    }
  },
  addRoutesFromEnv: function (env) {
    for (let key in process.env) {
      if (key.startsWith('SERVICE_')) {
        let val = process.env[key]
        let parts = val.split('::')
        if (parts.length === 2) {
          this.set(parts[0], parts[1])
          // this.add(parts[0], parts[1]) // /api/v1::http://v1host:8000
        } else {
          console.warn('Invalid SERVICE_NAME environment variable: should be SERVICE_NAME=/path/to/proxy::http://host:port, ', key)
        }
      }
    }

    console.log('ROUTE MAP: ', JSON.stringify(this.map, null, 2))
  }
}

module.exports = RouteMap