let express = require('express')
  , router = express.Router()

// CAN user perform action
router.get('/user/:userid/:action', function (req, res, next) {
  console.log('[CANAPI]: ', req.params, req.query)
  res.send(false) // not implemented yet
})

module.exports = router