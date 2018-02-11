var parser = {
  google: {
    photo: function (profile) {
      if (profile.photos && profile.photos.length && profile.photos[0] && profile.photos[0].value) {
        return profile.photos[0].value
      } else if (profile._json && profile._json.image && profile._json.image.url) {
        return profile._json.image.url;
      } else {
        return 'http://lorempixel.com/index.php?generator=1&x=50&y=50&cat=people';
      }
    },
    email: function (profile) {
      if (profile.emails && profile.emails.length && profile.emails[0] && profile.emails[0].value) {
        return profile.emails[0].value;
      } else {
        var m = profile._raw.match(/(\w+@gmail.com)/g)
        if (m) {
          return m[0]; 
        } else {
          return '';
        }
      }
    }
  }
}

module.exports = parser;
