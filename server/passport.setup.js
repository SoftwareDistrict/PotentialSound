require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require('./db');
const { CLIENT_ID, CLIENT_SECRET, PORT } = process.env;

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: `http://localhost:${PORT}/google/callback`
  },
  (accessToken, refreshToken, profile, done) => {
    Users.findOne({ where: { googleId: profile.id }, raw: true })
    .then((user) => {
      if (user) {
        return done(null, user);
      }
      const newUser = {
        googleId: profile.id,
        email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
      };
      Users.create(newUser)
        .then(createdUser => {
          newUser.id = createdUser.id;
          done(null, newUser);
        })
        .catch(err => done(err, null));
    })
    .catch(err => done(err, null));
  }));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  Users.findOne({ where: { id } })
  .then(user => done(null, user))
  .catch(err => done(err, null));
});
