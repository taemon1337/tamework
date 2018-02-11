let express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , roach = require('/common/orm/roach')
  , parser = require('/common/util/parser')
  , SESSION_SECRET = process.env.SESSION_SECRET || ''
  , GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
  , GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
  , GOOGLE_CLIENT_SCOPE = process.env.GOOGLE_CLIENT_SCOPE ? process.env.GOOGLE_CLIENT_SCOPE.split(' ') : ['profile email']
  , APP_REDIRECT_URL = process.env.APP_REDIRECT_URL || '/'

passport.use(new GoogleStrategy({ clientID: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET, callbackURL: '/api/auth/google/callback' }, function (accessToken, refreshToken, profile, done) {
  var attrs = {
    displayName: profile.displayName,
    email: parser.google.email(profile),
    gender: profile.gender,
    photo: parser.google.photo(profile)
//    oauthAccessToken: accessToken, // dont need to store these tokens since just authenticating
//    oauthRefreshToken: refreshToken
  };
  roach.account.findOrCreate({ where: attrs }).then(function (user) {
    done(null, user)
  }).catch(function (err) {
    done(err);
  })
}));

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  roach.account.findOne({ email: email }).then(function(user) {
    done(null, user);
  }).catch(function () {
    done(null, null);
  })
});

router.get('/google', passport.authenticate('google', { scope: GOOGLE_CLIENT_SCOPE }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
  res.redirect(APP_REDIRECT_URL + '#/set-token/' + req.user.sessionSecret)
})

module.exports = router
