let setPath = function (obj, path, val) {
  let parts = path.split('/')
  let ref = obj
  parts.reduce((a, b) => a[b] = a[b] || {}, obj)
  parts.forEach((key, i) => {
    if (i === parts.length - 1) {
      ref[key] = val
    } else {
      ref = ref[key]
    }
  })
}

let pathToSlashObject = function (path, val) {
  let obj = {}
  let ref = obj
  let parts = path.split('/')
  let key = parts.shift()
  
  while (key) {
    if (parts.length) {
      ref[key] = {}
      ref = obj[key]
    } else {
      ref[key] = val
    }
    key = parts.shift()
  }
  return obj
}

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
    let m = Object.assign({}, this.map)
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
  setPath: function (path, target) {
    console.log('BEFORE: ', this.map)
    setPath(this.map, path, target)
    console.log('AFTER: ', this.map)
  },
  addRoutesFromEnv: function (env) {
    for (let key in process.env) {
      if (key.startsWith('SERVICE_')) {
        let val = process.env[key]
        let parts = val.split('::')
        if (parts.length === 2) {
          this.setPath(parts[0], parts[1])
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