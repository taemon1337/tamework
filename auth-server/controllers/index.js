let express = require('express')
  , router = express.Router()

router.use('*', require('./jwt/jwt'))
router.use('/health', require('./health'))
router.use('/account', require('./account'))
router.use('/jwt', require('./jwt'))
router.use('/google', require('./google'))

module.exports = router
