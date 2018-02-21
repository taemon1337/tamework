let express = require('express')
  , router = express.Router()

router.get('/profile', function (req, res, next) {
  if (req.user && req.user) {
    console.log('[ACCOUNT] Getting user profile: ', req.user.displayName)
    res.send(req.user)
  } else {
    res.send(null)
    // res.status(500).send("No user profile information available.")
  }
})

module.exports = router

