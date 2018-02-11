let express = require('express')
  , router = express.Router()

router.use('*', function (req, res, next) { console.log('[ACCOUNT] ' + req.originalUrl); next() })
router.use('/health', require('./health'))
router.use('/account', require('./account'))
router.use('/auth', require('./auth'))

module.exports = router
