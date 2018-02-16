let express = require('express')
  , router = express.Router()

router.use('*', require('./jwt/jwt'))
router.use('/health', require('./health'))
router.use('/account', require('./account'))
router.use('/auth', require('./auth'))
router.use('/jwt', require('./jwt'))

module.exports = router
