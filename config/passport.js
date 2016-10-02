const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

/**
 * Authenticate with JSON Web Token.
 */
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.APP_SECRET
}, (jwt_payload, done) => {
  done(null, jwt_payload); 
}));


/**
 * Sign in with GitHub.
 */
passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
  const user = { 
    id: profile.id,
    name: profile.displayName,
    accessToken     
  };

  done(null, user);
  return;
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
