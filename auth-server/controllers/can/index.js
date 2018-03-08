let express = require('express')
  , router = express.Router()
  , CAN_TOKEN = process.env.CAN_TOKEN || null

let authorizedRequest = function (req) {
  if (req.headers.authorization) {
    if (req.headers.authorization.match(/^Bearer \w+$/)) {
      let t = req.headers.authorization.split(' ')[1]
      return t !== '' && t === CAN_TOKEN
    } else {
      return false
    }
  } else {
    return false
  }
}

// CAN user perform action
router.get('/user/:userid/:action', function (req, res, next) {
  console.log('[CANAPI]: ', req.params, req.query)
  if (authorizedRequest(req)) {
    res.send({ can: true }) // actually check if user can access resource here
  } else {
    res.send({ can: false })
  }
})

module.exports = router