let express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , jwt = require('jsonwebtoken')
  , roach = require('/common/orm/roach')
  , parser = require('/common/util/parser')
  , JwtStrategy = require('passport-jwt').Strategy
  , ExtractJwt = require('passport-jwt').ExtractJwt
  , JWT_SECRET_OR_KEY = process.env.JWT_SECRET_OR_KEY || 'secret-or-key-default'
  , JWT_ISSUER = process.env.JWT_ISSUER || 'localhost'
  , JWT_AUDIENCE = process.env.JWT_AUDIENCE || 'localhost'
  , LOGIN_PAGE = process.env.LOGIN_PAGE || '/ui/login'


let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_OR_KEY,
  issuer: JWT_ISSUER,
  audience: JWT_AUDIENCE
}

passport.use(new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('Jwt Payload Received: ', jwt_payload)
  roach.account.findById(jwt_payload.id).then(function (account) {
    next(null, account)
  })
  .catch(function (err) {
    console.warn("[ERROR]: Error looking up user through JWT. ", err)
    next(null, false)
  })
}))

router.get('/profile', function (req, res, next) {
  if (req.user && req.user.payload) {
    res.send(req.user.payload)
  } else {
    res.status(500).send("No user profile information available.")
  }
})

router.get('/profile2', passport.authenticate('jwt', { session: false }),
  function (req, res) {
    console.log('[PROFILE] ', req.user)
    res.send(req.user)
  }
)

// router.get('*', function (req, res, next) {
//   console.log('[REDIRECT] -> ' + LOGIN_PAGE)
//   res.redirect(LOGIN_PAGE)  
// })

router.post('/sign-in', function (req, res, next) {
  console.log('[SIGN-IN] ' + req.body)
  if (req.body && req.body.id) {
    // TODO sign in code here
    let payload = req.body // TODO: actually implement verify user here
    let token = jwt.sign(payload, jwtOptions.secretOrKey)
    res.json({ message: 'ok', token: token })
  } else {
    res.status(401).send('No request body.')
  }
})

router.post('/sign-up', function (req, res, next) {
  if (req.body && req.body.username) {
    // TODO sign up code here
  } else {
    res.status(401).send('Invalid Request.')
  }
})

router.post('/sign-out', function (req, res, next) {
  // TODO sign-out code here
})

module.exports = router

